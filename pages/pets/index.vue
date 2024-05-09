<template>
    <ShowMedia :media="media.pet" v-model="media.popup" />
    <div class="cards-container q-pa-lg">

        <q-card class="pet-card q-mx-sm q-my-md" v-for="pet of pets">
            <q-card-section>
                <p v-for="(k, v) of filterFields(pet)"><span class="text-h5">{{ v }}</span>: <span
                        class="text-subtitle1">{{ k }}</span></p>
            </q-card-section>
            <q-card-section class="">
                <div class="img-container row justify-center items-center">
                    <q-img :src="pet.foto_perfil" width="50%" ratio=1 />

                </div>
                <p @click="console.log(pet.master._id)">Dueño: {{ pet.master.nick }}</p>
            </q-card-section>
            <q-card-section class="row justify-evenly">
                <q-btn label="Posts" color="green"></q-btn>
                <q-btn label="Comentarios" color="purple"></q-btn>
                <q-btn label="Media" color="orange" @click="media.popup = true; media.pet = pet.multimedia"></q-btn>
            </q-card-section>
        </q-card>
    </div>
</template>


<script setup>
import { usePet } from '~/composables/petComposable'

let media = ref({ pet: '', popup: false })
let pets = ref([])

pets.value = await usePet().getPets()

function filterFields(item) {
    let filtered = (({ _id, foto_perfil, multimedia, posts, comentarios, master, ...item }) => item)(item)
    return filtered
}

</script>

<style scoped lang="scss">
.pet-card {
    width: 20%;
}

.cards-container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    /* corrected class name */
}

.img-container {
    max-width: 100%;
    max-height: 200%;
}
</style>
