import { useNuxtApp } from '#app';
import { useUserStore } from "#imports";

export const useAxiosInstance = () => {
    const { $axios } = useNuxtApp();
    const store = useUserStore()
    if (store.getToken() != null) {
        //el metodo de antes duplicaba
        $axios.defaults.headers.common['Authorization'] = `Bearer ${store.getToken()}`
    }

    return $axios;
}