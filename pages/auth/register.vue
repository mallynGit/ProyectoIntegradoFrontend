<template>
    <div class="errors text-center q-mt-sm q-pa-sm q-mx-auto" v-show="errors.length > 0">
        <span v-for="error in errors" :key="error">{{ error }} <br /></span>
    </div>
    <div class="relative-position row" style="border: 1px solid cyan; height:90%;">
        <div style="border: 2px solid blueviolet; min-height: 75%; width: 33vw"
            class="vertical-middle  q-mx-auto q-mt-md q-pa-sm">
            <q-form @submit="register">
                <q-input v-for="(field, name) in registerForm" :label="name" :key="name" required filled
                    v-model="registerForm[name]" @change="validate" class="q-my-sm" />
                <q-file v-model="profilePic" label="Foto de perfil" class="q-my-sm"></q-file>
                <q-separator />
                <div class="button-container q-pa-md">
                    <q-btn class="input" label="Volver" @click="router.back()" />
                    <q-btn class="input" label="Agregar mascota" @click="agregarMascota" />
                    <q-btn class="input" label="Registrar" type="submit" />
                    <q-btn class="input" label="report" @click="console.log(mascotas)" />
                </div>
            </q-form>
        </div>

        <div v-if="mascotas.length > 0" class="registermascotas vertical-middle  q-mx-auto q-mt-md q-pa-sm"
            style="border: 2px solid blueviolet; width: 33vw; min-height: 75%;">
            <div v-for="(m, i) in mascotas" :key="i" class="q-pa-md">
                <template v-for="(field, name) in m">
                    <q-input v-if="name != 'media'" :label="name" :key="name" v-model="m[name]" required filled
                        class="q-py-xs" />
                    <q-file v-if="name == 'media'" label="Foto de perfil" v-model="m.media" class="q-py-xs"></q-file>
                </template>
                <q-btn label="borrar" @click="mascotas.splice(i, 1)" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from '#imports';

const router = useRouter();

let errorArray = []
let errors = ref([]); // Make errors reactive
let mascotas = ref([])

let registerForm = ref({
    nick: "",
    email: "",
    nombre: "",
    apellidos: "",
    password: "",
    repeatPassword: "",
});

let profilePic = ref(null)

const mascotaPlantilla = {
    nombre: '',
    raza: '',
    categoria: '',
    edad: '',
    media: null,
}

watch(profilePic, () => {
    if (profilePic.value) {
        console.log(profilePic.value, 'profilePic')
    }
})

const agregarMascota = () => {
    mascotas.value.push({ ...mascotaPlantilla })
}

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
        console.log(mascotas.value, 'mascotas')
        await useUser().register(registerForm.value, profilePic.value, mascotas.value)
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

.registermascotas {
    transition: 0.5s;
    height: 98%;
    overflow-y: auto;
}
</style>
