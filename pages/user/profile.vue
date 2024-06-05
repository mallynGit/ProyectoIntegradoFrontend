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

    <q-btn @click="send"> JODER YA</q-btn>
    <q-btn @click="clo">vamos</q-btn>
</template>



<script setup>
import io from "socket.io-client"

const socket = io("http://localhost:3001", { protocol: 'help' })
function send() {
    socket.send({ id: '2', contenido: 'JODER YA' })
}

function clo(){
    socket.close()
    socket.removeAllListeners()
    socket.connect()
}

socket.on('connect', () => {

    socket.emit('join', 'user')
    console.log('vA!!!!!!')
})

const apiUrl = useRuntimeConfig().public.urlApi
const user = useUser().getUser();



definePageMeta({
    role: "user"
})


</script>



<style scoped></style>