<template>
    <ShowMedia :media="media.pet" :model-value="media.popup" @update:model-value="(v) => updatePopup(v)" />
    <div class="cards-container q-pa-lg">

        <q-card class="pet-card q-mx-sm q-my-md" v-for="pet of pets">
            <q-card-section horizontal>
                <q-card-section>
                    <p v-for="(k, v) of filterFields(pet)"><span class="text-h6">{{ v[0].toUpperCase() + v.slice(1) }}</span>: <span
                            class="text-subtitle1">{{ k }}</span></p>
                    <p><span class="text-h6">Dueño</span>: <span class="text-subtitle1">{{ pet.master.nick }}</span></p>
                </q-card-section>

                <div class="col items-center row q-pa-sm">
                    <q-img :src="pet.foto_perfil" width="100%" fit="cover" ratio=1
                        style="border: 1px solid orangered; border-radius: 10%" />
                </div>

            </q-card-section>
            <q-card-actions class="row justify-evenly">
                <q-btn label="Posts" color="green"></q-btn>
                <q-btn label="Comentarios" color="purple"></q-btn>
                <q-btn label="Media" color="orange" @click="popup(pet)"></q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>


<script setup>
import { usePet } from '~/composables/petComposable'

let media = ref({ pet: [], popup: false })
let pets = ref([])

pets.value = await usePet().getPets()

function updatePopup(newValue) {
    media.value.popup = newValue;
}

function filterFields(item) {
    let filtered = (({ _id, foto_perfil, multimedia, posts, comentarios, master, ...item }) => item)(item)
    return filtered
}

function popup(pet) {
    media.value.popup = true;
    media.value.pet = pet.multimedia
}

</script>

<style scoped lang="scss">
.pet-card {
    min-width: 250px;
}

.cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 19%);
    /* Define el tamaño de las columnas */
    gap: 1%;
}

// .img-container {
//     max-width: 100%;
//     max-height: 200%;
// }</style>
