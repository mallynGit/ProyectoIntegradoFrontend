export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui", "@pinia/nuxt"],
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
  plugins:["~/plugins/axios.js"],
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
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['marquee'].includes(tag),
    },
  }
  // css:[
  //   './assets/main.scss'
  // ],

});