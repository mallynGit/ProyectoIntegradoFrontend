<template>
  <div class="loader" v-show="!pageLoaded">
    <q-spinner-puff color="primary" size="30%" />
    <span>
      <h4>Loading...</h4>
    </span>
  </div>
  <div class="container" v-show="pageLoaded">
    <app-header @loaded="(loaded) => (pageLoaded = loaded)" />
    <div class="content">
      <!-- Aquí colocas tu contenido -->

      <NuxtPage />
      <footer-chat v-if="useUserStore().user" />
    </div>
  </div>
</template>

<script setup>
let pageLoaded = ref(false);

useUser()
  .returnStore()
  .$subscribe((mutation, state) => {
    if (state.token) {
      console.log("logueado");
    } else {
      console.log("not logueado");
      state.user = null;
    }
  });
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* Establece la altura del contenedor al 100% de la ventana gráfica */
  width: 100vw;
  /* Establece el ancho del contenedor al 100% de la ventana gráfica */
  overflow: hidden;
  /* Evita cualquier desbordamiento fuera del contenedor */
}

.content {
  background-color: #e9c9ab7a;
  flex: 1;
  /* Hace que el contenido ocupe todo el espacio disponible en el contenedor */
  overflow: auto;
  /* Agrega barras de desplazamiento si el contenido es más grande que el contenedor */
  /* border: 2px solid darkred; */
}

.page {
  width: 100%;
}
</style>
