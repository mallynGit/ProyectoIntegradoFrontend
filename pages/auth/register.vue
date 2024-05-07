<template>
    <div class="relative-position" style="border: 1px solid cyan; height:100%;">
        <div class="errors text-center q-mt-md q-mx-auto q-pa-sm" v-show="errors.length > 0">
            <span v-for="error in errors" :key="error">{{ error }} <br /></span>
        </div>
        <div style="border: 2px solid blueviolet; min-height: 75%; width: 33vw"
            class="vertical-middle  q-mx-auto q-mt-md q-pa-sm">
            <q-form @submit="register">
                <q-input v-for="(field, name) in registerForm" :label="name" :key="name" required filled
                    v-model="registerForm[name]" @change="validate" class="q-my-sm" />
                <q-separator />
                <div class="button-container q-pa-md">
                    <q-btn class="input" label="Volver" @click="router.back()" />
                    <q-btn class="input" label="Registrar" type="submit" />
                </div>
            </q-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const { $axios } = useNuxtApp();
const router = useRouter();

let errorArray = []
let errors = ref([]); // Make errors reactive

let registerForm = ref({
    nick: "",
    email: "",
    nombre: "",
    apellidos: "",
    password: "",
    repeatPassword: "",
});

const validate = () => {
    errors.value = []
    let form = registerForm.value;
    if (form.password.length < 8) {
        errors.value.push('La contraseña debe tener al menos 8 caracteres');
    } else if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s])[A-Za-z\d\W]{8,}$/.test(form.password) == false) {
        errors.value.push('La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial');
    } else if (form.password !== form.repeatPassword) {
        errors.value.push('Las contraseñas deben coincidir');
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email) == false) {
        errors.value.push('Introduce un email correcto');
    }
    if (errors.value.length > 0) {
        return false;
    } else {
        return true;
    }
};

const register = async () => {
    try {
        if (validate() == false) {
            alert('Arregla los errores que existan en el formulario.')
            return
        }
        let res = await $axios.post("/auth/register", registerForm.value);
        alert('Usuario creado correctamente, por favor logueese.');
        router.push({ path: '/auth/login' });
    } catch (err) {
        console.log(err, 'err');
        if (err.response.status == 403) {
            alert('Un usuario con ese mismo email o nick ya existe, pruebe con otros');
        }
    }
};
</script>

<style scoped lang="scss">
.button-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.errors {
    background: $primary;
    width: 25%;
}

.input {
    margin: 5px 0px;
}
</style>
