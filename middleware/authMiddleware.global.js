import { useUser } from "#imports";
import { useAxiosInstance } from "~/utils/axiosInstance.js";


export default defineNuxtRouteMiddleware(async (to, from) => {

    if (import.meta.server) return
    if (process.client) {
        let token = false;
        const store = useUser().returnStore();

        let check;

        // Si no hay token en el store, intentamos obtenerlo del localStorage
        if (!store.token) {
            const localStorageToken = localStorage.getItem('token');

            if (localStorageToken != null) {
                console.log('Seteando token desde localStorage');
                store.token = localStorageToken;
                check = (await store.checkToken()).token
                token = localStorageToken
            } else {

            }
        } else {
            console.log('checkeando')
            token = store.token
            check = (await store.checkToken(store.token)).token;
            if (!check) {
                // Si el token ha caducado, cerramos la sesión y redirigimos al usuario al inicio de sesión
                store.logout();
                alert('La sesión ha caducado. Por favor, inicie sesión de nuevo.');
                return navigateTo('/auth/login');
            }
        }
        // Verificamos los permisos según el rol de la ruta
        if (to.meta.role) {
            console.log('tiene to.meta')
            if (!token) {
                alert('No tienes permiso para acceder a esta ruta.')
                return navigateTo('/')
            }
            // Si aún no hemos verificado el token, lo hacemos aquí
            check = await store.checkToken(store.token);



            if (check.token) {
                const userRole = check.role.toLowerCase();
                console.log(userRole)
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
    }
});
