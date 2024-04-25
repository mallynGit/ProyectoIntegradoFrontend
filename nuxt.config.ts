export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui"],
  runtimeConfig: {
    public: {
      urlApi: process.env.URL_API
    }
  },
  quasar: {
    iconSet: "mdi-v7",
    config: {
      dark: false,
      notify: {
        position: "top", 
        timeout: 3000, 
      },
    },
    plugins: ["Notify"],
   
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          //suelta errores pero funciona igualmente, es muy raro la importacion global
          additionalData: '@import "~/assets/main.scss";'
        }
      }
    }
  },
  // css:[
  //   './assets/main.scss'
  // ],

});