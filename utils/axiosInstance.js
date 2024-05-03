import { useNuxtApp } from '#app';


export const useAxiosInstance = () => {
    const { $axios } = useNuxtApp();

    if (process.client) {
        console.log('CLIENTE SI DESDE INSTANICA!!', 'Bearer ' + localStorage.getItem('token'))
        $axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    return $axios;
}