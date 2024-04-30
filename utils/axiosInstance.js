import { useNuxtApp } from '#app';
import { useUserStore } from "#imports";

export const useAxiosInstance = (token) => {
    const { $axios } = useNuxtApp();
    const store = useUserStore()
    if (store.token == null) {
        if (localStorage.getItem('token')) {
            token = localStorage.getItem('token')
        }
    } else {
        token = store.token
    }

    if (token) {
        //el metodo de antes duplicaba
        $axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    return $axios;
}