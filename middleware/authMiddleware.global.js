import { useUserStore } from "~/stores/userStore.js";
import { checkToken } from '~/utils/checkToken.js'
import { useAxiosInstance } from "~/utils/axiosInstance.js";


export default defineNuxtRouteMiddleware(async (to, from) => {

    if (import.meta.server) return
    if (process.client) {
        let axios = useAxiosInstance()
        console.log(to.path)
        const store = useUserStore();
        let check;

        // Si no hay token en el store, intentamos obtenerlo del localStorage
        if (!store.token) {
            const localStorageToken = localStorage.getItem('token');
            console.log(localStorageToken, 'precargando')
            if (localStorageToken) {
                console.log('Seteando token desde localStorage');
                store.token = localStorageToken;
                axios = useAxiosInstance(localStorageToken);
            }
        } else {
            axios = useAxiosInstance(store.token);
        }

        // Verificamos si hay un token y está caducado
        if (store.token) {
            check = await checkToken(store.token, axios);
            if (!check) {
                // Si el token ha caducado, cerramos la sesión y redirigimos al usuario al inicio de sesión
                store.logout();
                alert('La sesión ha caducado. Por favor, inicie sesión de nuevo.');
                return navigateTo('/auth/login');
            }
        }

        // Verificamos los permisos según el rol de la ruta
        if (to.meta.role) {

            // Si aún no hemos verificado el token, lo hacemos aquí
            check = await checkToken(store.token, axios);



            if (check) {
                const userRole = check.role.toLowerCase();
                console.log(userRole)
                if (to.meta.role === 'admin' && userRole === 'admin') {
                    console.log(':)');
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
