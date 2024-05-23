<template>

    editar perfil pet

    {{ id }}

    <div v-if="!loading">
        <q-input v-for="p, ind of filtered" :key="ind" v-model="pet[ind]" :label="ind" />

        <q-btn label="aplicar" @click="updateProfile()" />
        <q-btn label="cancelar" @click="useRouter().back();" />
    </div>
    <div v-else>
        <q-spinner color="primary" size="3em" />
    </div>

</template>


<script setup>

const { id } = useRoute().params
const pet = ref(undefined)
const loading = ref(true)

const filtered = computed(() => {
    return (({ _id, multimedia, posts, comentarios, master, foto_perfil, ...pet }) => pet)(pet.value)
})

usePet().getPetById(id).then((res) => {
    pet.value = res
    delete pet.value.foto_perfil
    loading.value = false
})

function updateProfile() {
    console.log(pet.value)
    usePet().update(pet.value)
}

</script>


<style lang="scss" scoped></style>