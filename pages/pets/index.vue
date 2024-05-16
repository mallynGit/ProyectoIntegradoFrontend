<template>
    <ShowMedia :media="media.pet" :model-value="media.popup" @update:model-value="(v) => updatePopup(v)" />
    <div class="q-gutter row pet-container">
        <q-card v-for="pet of pets" :key="pet._id"
            class="pet-card q-mx-xs q-my-sm col-lg-auto col-md-auto col-sm-auto col-xs-12">
            <q-card-section horizontal>
                <q-card-section>
                    <div class="card-content">
                        <p v-for="(k, v) of filterFields(pet)" :key="v" class="text-h6">
                            {{ v[0].toUpperCase() + v.slice(1) }}: <span class="text-subtitle1"><br />{{ k }}</span>
                        </p>
                        <p><span class="text-h6">Dueño</span>: <span class="text-subtitle1"><br />{{ pet.master.nick
                                }}</span></p>
                    </div>
                </q-card-section>
                <div class="col items-center row justify-center q-pa-sm">
                    <q-img class="img" :src="apiUrl + '/uploads/' + pet.foto_perfil._id" width="100%" fit="cover"
                        ratio=1 @click="navigateToPet(pet._id)" />
                </div>
            </q-card-section>

        </q-card>
    </div>
</template>

<script setup>
import { usePet } from '~/composables/petComposable'
const apiUrl = useRuntimeConfig().public.urlApi
const router = useRouter()

let media = ref({ pet: [], popup: false })
let pets = ref([])

pets.value = await usePet().getPets()

function updatePopup(newValue) {
    media.value.popup = newValue;
}

function navigateToPet(id) {
    return router.push('/pets/' + id)
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
.pet-card:hover {
    // min-width: 30%;
    // max-width: 33%;
    box-shadow: 0px 0px 0px 1px orangered inset;
}

.pet-container {
    justify-content: space-evenly;
}

@media screen and (max-width: 1420px) {}

p {
    user-select: none;
}

.card-content {
    max-width: 125px;
    overflow: hidden;
    word-wrap: break-word;
}

.img {
    min-width: 100px;
    max-width: 80%;
    border: 1px solid orangered;
    border-radius: 10%
}
</style>