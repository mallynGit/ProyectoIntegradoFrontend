<template>

    <div class="text-h2 absolute-center" v-show="user.nombre && user.apellidos">Bienvenido, {{ user.nombre }} {{ user.apellidos }}!</div>

    <div class="text-h5 absolute-center" v-show="user.email">Email: {{ user.email }}</div>

    <q-img ratio="1" class="q-ma-lg" width="250px" :src="`http://localhost:3001/uploads/${user.profilePicture}`" />

    <q-btn to="/pets/add-pet">Anadir mascota</q-btn>

</template>



<script setup>

const user = useUser().getUser();

definePageMeta({
    role: "user"
})


</script>



<style scoped></style>