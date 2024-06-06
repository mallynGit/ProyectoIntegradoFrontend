<template>

    <div class="text-h5 container">
        <q-img ratio="1" class="q-ma-lg image" :src="`${apiUrl}/uploads/${user._id}`" />
        <div>
            <p v-for="(prop, index) of user">
                {{ index }}: {{ prop }}
                <br />
            </p>
        </div>
    </div>

    <div class="container-buttons">
        <q-btn class="button" to="/user/editProfile">Editar perfil</q-btn>
        <q-btn class="button" to="/pets/add-pet">Anadir mascota</q-btn>
    </div>

</template>



<script setup>
const apiUrl = useRuntimeConfig().public.urlApi
const user = useUser().getUser();

definePageMeta({
    role: "user"
})


</script>


<style scoped lang="scss">
.container {
    width: 80%;
    margin: 5em auto 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border: 3px solid rgb(211, 128, 3);
    padding: 1em;
    border-radius: 8px;
}

.image {
    background-image: url('@/assets/images/default-image.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 5px solid rgb(211, 128, 3);
    border-radius: 50%;
    width: 250px ;
    height: 250px;
    display: block;
    margin: auto 1em;
}

.container-buttons{
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    margin: auto;
    width: fit-content;
    margin-top: 3em;
    margin-bottom: 3em;
    .button{
        background-color: chocolate;
        color: whitesmoke;
    }
    .button:hover{
        opacity: 0.7;
    }
}
</style>