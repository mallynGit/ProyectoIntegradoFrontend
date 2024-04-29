import { useUserStore } from "~/stores/userStore.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const store = useUserStore();

        if (store.getToken() == null) {
            if (localStorage.getItem('token')) {

                store.token = localStorage.getItem('token');
            }
        }


        if (to.meta.role == 'admin') {
            let p = await store.checkToken()
            if (p.role.toLowerCase() == 'admin') {
                console.log(':)')
            } else {
                alert('No tienes permiso para entrar')
                return navigateTo('/')
            }
        }

    }

});