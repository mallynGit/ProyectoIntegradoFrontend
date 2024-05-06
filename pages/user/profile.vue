<template>

    <div class="text-h2 absolute-center" v-show="user.nombre && user.apellidos">Bienvenido, {{ user.nombre }} {{ user.apellidos }}!</div>

    <div class="text-h5 absolute-center" v-show="user.email">Email: {{ user.email }}</div>

</template>



<script setup>

const user = useUser().getUser();

definePageMeta({
    role: "user"
})


</script>



<style scoped></style>