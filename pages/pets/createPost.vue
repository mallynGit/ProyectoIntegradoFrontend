<template>

    la id es {{ id }}

    <form @submit.prevent.default="p">
        <q-input label="Titulo" v-model="form.titulo"></q-input>
        <q-input type="textarea" label="Cuerpo del post" v-model="form.contenido"></q-input>
        <q-file label="Multimedia (puedes elegir hasta varios archivos)" multiple append v-model="form.multimedia"></q-file>
        <q-input v-model="form.autor" label="autor" readonly></q-input>
        <q-btn type="submit" label="crear post"></q-btn>
    </form>

</template>


<script setup>
import { usePet } from "~/composables/petComposable";
import { useUser } from "~/composables/userComposable"
import { useRoute } from "vue-router";

const form = ref({
    titulo: '',
    contenido: '',
    multimedia: [],
    autor: useUser().getUser()._id
})
const route = useRoute();
const id = route.query.id


async function p() {
    const formD = new FormData();
    formD.append('titulo', form.value.titulo)
    formD.append('autor', form.value.autor)
    for(let f of form.value.multimedia) {
        formD.append('multi', f)
    }
    // formD.append('multi', form.value.multimedia)
    formD.append('contenido', form.value.contenido)
    formD.append('pet', id)

    console.log(form, 'chulo!')
    await usePet().createPost(formD)
}



</script>




<style scoped lang="scss"></style>
