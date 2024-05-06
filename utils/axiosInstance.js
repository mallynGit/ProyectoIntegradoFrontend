import { useNuxtApp } from '#app';


export const useAxiosInstance = () => {
    const { $axios } = useNuxtApp();

    if (process.client) {
        $axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    return $axios;
}