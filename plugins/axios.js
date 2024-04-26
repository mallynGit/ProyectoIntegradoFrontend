import axios from "axios";

export default defineNuxtPlugin(async () => {

    const { urlApi } = useRuntimeConfig().public;
    const axiosInstance = axios.create({
        baseURL: urlApi,
        headers: {
            "Content-Type": "application/json",
        }
    });

    return {
        provide: {
            axios: axiosInstance
        }
    };
});