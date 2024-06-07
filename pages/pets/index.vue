<template>
    <div class="container q-pb-sm">
        <div class="q-pa-md container-filtro">
            <div class="q-pa-md filtro">
                <q-select :options="options" v-model="selectedFilter" />
                <q-input label="Filtro" v-model="filtro" />
            </div>
        </div>
        <div class="content-wrapper">
            <div class="background">
                <q-pagination class="paginacion" v-model="paginaActual" :max="totalPaginas" direction-links
                    boundary-links />
                <div class="pets row pet-container">
                    <pet-card v-for="pet in petsPag" :key="pet._id" :pet="pet" />
                </div>
            </div>
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

.content-wrapper {
    display: flex;
    justify-content: center;
}

.background {
    background-color: rgb(253, 243, 231);
    padding: 1em;
    max-width: 85%;
    width: 100%;
    border-radius: 10px;
    border: 1px solid lightslategrey;
}

.filtro {
    background-color: rgb(253, 243, 231);
    border-radius: 15px;
    border: 1px solid lightslategrey;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.pet-container {
    justify-content: space-around;
    margin-top: 3em;
}
</style>
