import axios from "axios";
import { useUserStore } from "#imports";


export default defineNuxtPlugin(async () => {

    const { urlApi } = useRuntimeConfig().public;
    const axiosInstance = axios.create({
        baseURL: urlApi,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            console.log('response ?')
            // Aquí puedes hacer las comprobaciones que necesites
            if (response.status != 200) {
                // Mostrar alerta si el estado no es "ok"
                alert('Error en la respuesta del servidor');
                return Promise.reject(new Error('Error en la respuesta del servidor'));
            } else if (response.data.token == 'expired') {
                useUserStore().logout();
                alert('La sesión ha caducado. Por favor, inicie sesión de nuevo.');
                useRouter().push('/auth/login');
            }

            return response;
        },
        (error) => {
            console.log('error ?')
            // Manejo de errores de respuesta
            if (error.response && error.response.status === 401 && error.response.data.error == 'expired') {
                // Redirigir al login si el error es 401 (no autorizado)
                useUserStore().logout();
                alert('La sesión ha caducado. Por favor, inicie sesión de nuevo.');
                useRouter().push('/auth/login');
            } else {
                // Mostrar alerta para otros errores
                alert('Ocurrió un error: ' + (error.response?.data?.message || error.message));
            }
            return Promise.reject(error);
        }
    );

    return {
        provide: {
            axios: axiosInstance
        }
    };
});