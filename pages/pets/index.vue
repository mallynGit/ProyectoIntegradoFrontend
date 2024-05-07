<template>

<div>probando index pets</div>
<template v-for="pet of pets">
<q-card  class="pet-card q-mx-sm">
    <q-card-section>
        <p v-for="(k, v) of pet">{{v}}: {{k}}</p>
        {{typeof pet.foto_perfil}}
        <img  />
    </q-card-section>
</q-card>
</template>

</template>


<script setup>
import {usePet} from '~/composables/petComposable'

let pets = ref([])

pets.value = await usePet().getPets()

</script>

<style scoped lang="scss">

.pet-card {
    width: 20%;
    display: inline-block;
}

</style>