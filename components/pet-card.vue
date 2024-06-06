<template>
  <q-card
    :key="pet._id"
    @click="navigateToPet(pet._id)"
    class="pet-card q-mx-xs q-my-sm col-lg-auto col-md-auto col-sm-auto col-xs-12"
  >
    <q-card-section class="row inline vertical-middle">
      <div class="card-text-content col-6">
        <p class="text-h6">
          <span class="text-subtitle1"> Nombre: </span>
          <br />
          <span class="text-wrap">
            {{ pet.nombre }}
          </span>
        </p>

        <p class="text-h6">
          <span class="text-subtitle1"> Categoria: </span>
          <br />
          <span>
            {{ pet.categoria }}
          </span>
        </p>

        <p class="text-h6">
          <span class="text-subtitle1"> Raza: </span>
          <br />
          <span>
            {{ pet.raza }}
          </span>
        </p>
      </div>
      <div class="col-6 imgcontainer items-center justify-center q-pa-sm">
        <q-img
          class="img"
          :src="apiUrl + '/uploads/' + pet.foto_perfil"
          ratio="1"
        />
      </div>
      <div class="col-12 row justify-around info-2">
        <p class="text-h6">
          <span class="text-subtitle1"> Sexo: </span>
          <br />
          <span>
            {{ pet.sexo }}
          </span>
        </p>

        <p class="text-h6">
          <span class="text-subtitle1"> Edad: </span>
          <br />
          <span>
            {{ pet.edad }}
          </span>
        </p>

        <p class="text-h6">
          <span class="text-subtitle1"> Peso: </span>
          <br />
          <span>
            {{ pet.peso }}
          </span>
        </p>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const apiUrl = useRuntimeConfig().public.urlApi;
const router = useRouter();
const props = defineProps({
  pet: Object,
});

function navigateToPet(id) {
  return router.push("/pets/" + id);
}
</script>

<style lang="scss" scoped>
.imgcontainer {
  border: 2px solid whitesmoke;
  border-radius: 8px;
  width: 180px;
  max-height: 180px;
  background-color: #ca7a2f;
}

.pet-card:hover {
  outline: 5px solid rgb(0, 0, 0);
  cursor: pointer;
}

.info-2 {
  height: 80px;
}

.pet-card {
  height: 30vh;
  min-height: 360px;
  max-width: 500px;
  max-height: 40vh;
  overflow-y: scroll;
  border: 1px solid whitesmoke;
  background-color: #ca7a2fa4;
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

@media screen and (max-width: 1420px) {
}

.img {
  overflow: auto;
  user-select: none;
}

p {
  user-select: none;
}

.card-text-content {
  min-width: 125px;
  overflow: hidden;
  word-wrap: break-word;
  text-wrap: wrap;
}
</style>
