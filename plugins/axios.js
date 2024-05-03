import axios from "axios";
import { useUserStore } from "#imports";


export default defineNuxtPlugin(async () => {
    const store = useUserStore()
    let token;
    

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