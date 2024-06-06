<template>
    <div class="container q-pb-sm">
        <div class="q-pa-md container-filtro">
            <div class="q-pa-md filtro">
                <q-select :options="options" v-model="selectedFilter" />
                <q-input label="Filtro" v-model="filtro" />
            </div>
        </div>
        <q-pagination class="paginacion" v-model="paginaActual" :max="totalPaginas" direction-links boundary-links />
        <div class="pets row pet-container">
            <pet-card v-for="pet in petsPag" :key="pet._id" :pet="pet" />
        </div>
    </div>
</template>

<script setup>
import { usePet } from '~/composables/petComposable'
let pets = ref([])

const filtro = ref(null)
let options = ref(['nombre', 'raza', 'edad', 'categoria'])
const selectedFilter = ref(options.value[0])

const paginaActual = ref(1)
const petsPag = computed(() => {
    const start = (paginaActual.value - 1) * 9
    const end = start + 9
    return pets.value.slice(start, end)
})
const totalPaginas = computed(() => Math.ceil(pets.value.length / 9))

watch(filtro, () => {
    checkFiltro()
})

onBeforeMount(async () => {
    pets.value = await usePet().getPets()
})

function checkFiltro() {
    pets.value = usePet().petStore.pets.filter((pet) => pet[selectedFilter.value].includes(filtro.value))
    console.log(filtro.value, selectedFilter.value, ' filtro!')
    console.log('?!', petsPag.value)
}

</script>

<style scoped lang="scss">
.container {
    min-height: 93vh;
    padding-bottom: 3em;
}

.container-filtro {
    width: 40%;
    margin: auto;
}

.filtro{
    background-color: rgb(253, 243, 231);
    border-radius: 15px;
}

.paginacion {
    width: fit-content;
    margin: auto;
    margin-top: 3em;
}


.pet-card:hover {
    outline: 5px solid rgb(0, 0, 0);
}

.pets {
    width: 85%;
    margin: auto;
}

.pet-container {
    justify-content: space-around;
    margin-top: 3em;

    // background-color: black;
}

.pet-card {
    height: 50vh;
    overflow-y: scroll;
    border: 1px solid whitesmoke;
    background-color: #ca7a2fa4;
    cursor: pointer;
}

.pet-card::-webkit-scrollbar {
    width: 8px;
}

.pet-card::-webkit-scrollbar-thumb {
    background-color: #ca7a2f;
    border-radius: 10px;
}

// .pet-card::-webkit-scrollbar-track {
//     background: #f1f1f1;
// }

@media screen and (max-width: 1420px) {}

p {
    user-select: none;
}

.card-container {}

.card-text-content {
    max-width: 125px;
    min-width: 125px;
    overflow: hidden;
    word-wrap: break-word;
}

.img {
    border: 2px solid whitesmoke;
    border-radius: 8px;
    width: 180px;
    height: auto;
    fit: cover;
    background-color: #ca7a2f;
}
</style>