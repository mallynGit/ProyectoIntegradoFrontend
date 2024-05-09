import { useUser } from "#imports";
import { useAxiosInstance } from "~/utils/axiosInstance.js";


export default defineNuxtRouteMiddleware(async (to, from) => {

    // if (import.meta.server) return
    if (process.client) {
        try {
            let token = false;
            const store = useUser().returnStore();
            let check;

            // Si no hay token en el store, intentamos obtenerlo del localStorage
            if (!store.token) {
                const localStorageToken = localStorage.getItem('token');

                if (localStorageToken != null) {
                    store.token = localStorageToken;
                    check = await store.checkToken()
                    if (!check.token) {
                        // Si el token ha caducado, cerramos la sesión y redirigimos al usuario al inicio de sesión
                        alert('La sesión ha caducado. Por favor, inicie sesión de nuevo.');
                        store.logout();
                        console.log('llega aqui.......')
                        return navigateTo('/auth/login');
                    }
                    console.log(check, 'checando')
                    if (store.user == null) {
                        store.user = check.user
                    }
                    token = localStorageToken
                } else {

                }
            } else {
                token = store.token
                check = await store.checkToken();
                console.log(check)

                if (!check.token) {
                    // Si el token ha caducado, cerramos la sesión y redirigimos al usuario al inicio de sesión
                    alert('La sesión ha caducado. Por favor, inicie sesión de nuevo.');
                    store.logout();
                    return navigateTo('/auth/login');
                }
                if (store.user == null) {
                    store.user = check.user
                }
            }
            console.log(check, ' checkenado')


            // Verificamos los permisos según el rol de la ruta
            if (to.meta.role) {
                if (!token) {
                    alert('No tienes permiso para acceder a esta ruta.')
                    return navigateTo('/')
                }
                // Si aún no hemos verificado el token, lo hacemos aquí
                check = await store.checkToken(store.token);



                if (check.token) {
                    const userRole = check.role.toLowerCase();
                    if (to.meta.role === 'admin' && userRole === 'admin') {
                        console.log(':) admin');
                    } else if (to.meta.role === 'user' && (userRole === 'user' || userRole === 'admin')) {
                        console.log(':)');
                    } else {
                        alert('No tienes permiso para acceder a esta ruta.');
                        return navigateTo('/');
                    }
                } else {
                    alert('No tienes permiso para acceder a esta ruta.');
                    return navigateTo('/');
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
});
