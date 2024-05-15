<template>
    <ShowMedia :media="media.pet" :model-value="media.popup" @update:model-value="(v) => updatePopup(v)" />
    <div>
        <span v-for="(k, v) of filterFields(pet)">{{ v }}: {{ k }}<br /></span>
        <q-img :src="pet.foto_perfil" width="300px"></q-img>
        <q-btn label="Media" color="orange" @click="popup(pet)"></q-btn>
    </div>

    <div class="comentarios q-ma-md">
        texto
        <q-input label="comentario a escribir XD" ref="comentario" flat @keydown.enter.prevent="go($event)"
            v-model="comentarioInput"></q-input>
        <div>
            <p v-for="c of pet.comentarios">{{ c.contenido }}</p>
        </div>
    </div>

</template>


<script setup>
import { usePet } from '~/composables/petComposable'
const id = useRoute().params.id

let media = ref({ pet: [], popup: false })
const pet = ref({})
const comentarioInput = ref(null)
const comentario = ref(null)

function go(event) {

    console.log(event ? event : 'no hay this :(')
    comentarioInput.value = ""
    comentario.value.blur()

}

function popup(pet) {
    media.value.popup = true;
    media.value.pet = pet.multimedia
}

function updatePopup(newValue) {
    media.value.popup = newValue;
}


usePet().getPetById(id).then((res) => {
    pet.value = res
    console.log(res)
})

function filterFields(item) {
    let filtered = (({ _id, foto_perfil, multimedia, ...item }) => item)(item)
    return filtered
}

</script>


<style scoped lang="scss"></style>