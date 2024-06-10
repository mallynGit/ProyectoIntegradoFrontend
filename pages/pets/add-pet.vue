<template>
    <div class="form q-mx-auto q-mt-xl q-pa-md">
        <form @submit="submit($event)">
            <q-input v-model="form.nombre" label="Nombre"></q-input>
            <q-input v-model="form.raza" label="Raza"></q-input>
            <q-input v-model="form.categoria" label="Categoria"></q-input>
            <q-input type="number" v-model="form.edad" label="Edad"></q-input>
            <q-select :options="['Macho', 'Hembra']" v-model="form.edad" label="Sexo"></q-select>

            <q-input type="number" v-model="form.peso" label="Peso"></q-input>

            <q-file label="Foto" v-model="form.media"></q-file>
            <q-separator />
            <q-btn type="submit" class="q-mt-md self">Subir</q-btn>
        </form>


    </div>
</template>

<script setup>
import { usePet } from '~/composables/petComposable';
import { useUser } from '#imports';

const form = ref({
    nombre: '',
    raza: '',
    categoria: '',
    edad: '',
    peso: '',
    sexo: '',
    media: null,
    userId: useUser().getUser()._id
})

const submit = (event) => {
    event.preventDefault()
    console.log(form.value)
    const formData = new FormData()
    formData.append('nombre', form.value.nombre)
    formData.append('raza', form.value.raza)
    formData.append('categoria', form.value.categoria)
    formData.append('edad', form.value.edad)
    formData.append('sexo', form.value.sexo)
    formData.append('peso', form.value.peso)
    formData.append('media', form.value.media)
    formData.append('userId', form.value.userId)

    usePet().createPet(formData)
}

</script>

<style scoped lang="scss">
.form {
    width: 40%;
    border: 1px dotted black;
    min-height: 50vh;
    background-color: rgb(253, 243, 231);
    border-radius: 8px;
    border: 3px solid rgb(211, 128, 3);


}
</style>