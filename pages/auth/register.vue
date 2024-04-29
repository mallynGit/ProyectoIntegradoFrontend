<template>

    <div class="relative-position" style="border: 1px solid cyan; height:100%;">
        <div style="border: 2px solid blueviolet; min-height: 75%; min-width: 25%;" class="absolute-center q-pa-sm">
            <q-form @submit="register">
                <q-input required class="input" v-model="registerForm.nombre" filled label="Nombre o email" />
                <q-input required class="input" v-model="registerForm.password" filled label="Contrase;a" />
                <q-input required class="input" v-model="registerForm.apellidos" filled label="Apellidos" />
                <q-input required class="input" v-model="registerForm.email" filled label="Email" />
                <q-input required class="input" v-model="registerForm.nick" filled label="Nickname" />
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
const { $axios } = useNuxtApp();
const router = useRouter();


let registerForm = ref({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    nick: ""
})

const register = async () => {
    try {
        let res = await $axios.post("/auth/register", registerForm.value)

    
            alert('Usuario creado correctamente, por favor logueese.')
            router.push({path: '/auth/login'})
    } catch (err) {
        console.log(err, 'err');
        if(err.response.status ==403){
            alert('Un usuario con ese mismo email o nick ya existe, pruebe con otros')
        }
    }
}

</script>

<style scoped>
.button-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.input {
    margin: 5px 0px;
}
</style>