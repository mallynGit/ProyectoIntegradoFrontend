<template>
    <div class="container q-pb-sm">
      <div class="q-pa-md container-filtro">
        <div class="q-pa-md filtro row justify-evenly">
          <q-input
            style="max-width: 15%"
            dense
            label="Nombre"
            v-model="filtro.nombre"
          />
          <q-input
            style="max-width: 15%"
            dense
            label="Raza"
            v-model="filtro.raza"
          />
          <q-input
            style="max-width: 15%"
            dense
            label="Categoria"
            v-model="filtro.categoria"
          />
          <q-input
            style="max-width: 15%"
            dense
            label="Sexo"
            v-model="filtro.sexo"
          />
          <q-input
            style="max-width: 15%"
            dense
            label="Edad"
            v-model="filtro.edad"
          />
          <q-input
            style="max-width: 15%"
            dense
            label="Peso"
            v-model="filtro.peso"
          />
        </div>
      </div>
      <div class="content-wrapper">
        <div class="background">
          <q-pagination
            class="paginacion"
            v-model="paginaActual"
            :max="totalPaginas"
            direction-links
            boundary-links
          />
          <div class="pets row pet-container">
            <pet-card v-for="pet in petsPag" :key="pet._id" :pet="pet" />
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { usePet } from "~/composables/petComposable";
import { ref, computed, watch, onBeforeMount } from "vue";

let pets = ref([]);
let filteredPets = ref([]);
const filtro = ref({
  nombre: "",
  raza: "",
  categoria: "",
  sexo: "",
  edad: "",
  peso: "",
});

const paginaActual = ref(1);
const petsPag = computed(() => {
  const start = (paginaActual.value - 1) * 9;
  const end = start + 9;
  return filteredPets.value.slice(start, end);
});
const totalPaginas = computed(() => Math.ceil(filteredPets.value.length / 9));

watch(filtro.value, () => {
  checkFiltro();
}, { deep: true });

onBeforeMount(async () => {
  pets.value = await usePet().getPets();
  filteredPets.value = pets.value;
});

function checkFiltro() {
  filteredPets.value = pets.value.filter(pet => {
    return (
      (filtro.value.nombre === "" || pet.nombre.toLowerCase().includes(filtro.value.nombre.toLowerCase())) &&
      (filtro.value.raza === "" || pet.raza.toLowerCase().includes(filtro.value.raza.toLowerCase())) &&
      (filtro.value.categoria === "" || pet.categoria.toLowerCase().includes(filtro.value.categoria.toLowerCase())) &&
      (filtro.value.sexo === "" || pet.sexo.toLowerCase().includes(filtro.value.sexo.toLowerCase())) &&
      (filtro.value.edad === "" || pet.edad.toString().toLowerCase().includes(filtro.value.edad.toLowerCase())) &&
      (filtro.value.peso === "" || pet.peso.toString().toLowerCase().includes(filtro.value.peso.toLowerCase()))
    );
  });
  paginaActual.value = 1; // Reiniciar a la primera página después de filtrar
}
</script>

<style scoped lang="scss">
.container {
  min-height: 93vh;
  padding-bottom: 3em;
}

.container-filtro {
  width: 80%;
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
