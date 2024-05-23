<template>



    <div class="text-h5 absolute-center">
        <span v-for="(prop, index) of user">
            {{ index }}: {{ prop }}
            <br />
        </span>
        <q-img ratio="1" class="q-ma-lg" width="250px" :src="`${apiUrl}/uploads/${user._id}`" />
    </div>

    <q-btn to="/user/editProfile">Editar perfil</q-btn>

    <q-btn to="/pets/add-pet">Anadir mascota</q-btn>

</template>



<script setup>
const apiUrl = useRuntimeConfig().public.urlApi
const user = useUser().getUser();

definePageMeta({
    role: "user"
})


</script>



<style scoped></style>