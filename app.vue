<template>
  <div class="container">
    <app-header />
    <div class="content">
      <!-- Aquí colocas tu contenido -->
      
        <NuxtPage />
      


    </div>
  </div>
</template>

<style scoped>
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
  flex: 1;
  /* Hace que el contenido ocupe todo el espacio disponible en el contenedor */
  overflow: auto;
  /* Agrega barras de desplazamiento si el contenido es más grande que el contenedor */
  border: 2px solid darkred;

}

.page {
  width: 100%;
}
</style>
