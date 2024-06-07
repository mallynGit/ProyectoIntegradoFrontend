<template>
    <div class="header q-pb-sm">
        <q-layout view="lHh lpr lfr" container style="height: 50px; width:100%;">
            <q-header>
                <q-toolbar class="tb">
                    <q-toolbar-title style="display: flex; vertical-align: middle;">
                        <q-btn class="title" label="Bondpet" to="/" />
                        <marquee direction="left" scrollamount="20" width="88%" style="user-select: none;"><span
                                style="font-size:23px;">{{ rutaActual ? rutaActual :
                                    '"¡Bienvenido a Bondpet, la comunidad donde los amantes de las mascotas se conectan y comparten sus pasiones!"'}}</span>
                        </marquee>
                    </q-toolbar-title>
                    <div class="container-buttons">
                        <q-btn flat icon="mdi-dog-side" label="Pets" to="/pets" />
                        <q-btn flat icon="mdi-gamepad" label="test" to="/test/hola" />
                        <q-btn flat label="reportes" to="/test/reportes" />
                        <q-btn flat icon="mdi-account-plus" label="register" to="/auth/register" />
                        <q-btn flat icon="mdi-account-arrow-left" label="login" to="/auth/login" />
                        <q-btn flat icon="mdi-account-off" label="logout" @click="logout()" />
                        <q-chip class="estado" clickable @click="router.push('/user/profile')"> Estado: {{ logueado ?
                            'ON' : 'OFF'
                            }}</q-chip>
                    </div>
                </q-toolbar>
            </q-header>
        </q-layout>
    </div>
</template>

<script setup>
import { useUser } from '#imports';
import { useUserStore } from '#imports';

const emits = defineEmits(['loaded'])

const store = useUserStore()
const router = useRouter();
const env = useRuntimeConfig().public
const composable = useUser()
let reportStore;

store.$subscribe((mutation, state) => {
    if (state.token) {
        logueado.value = true
    } else {
        logueado.value = false
    }
})

let logueado = ref(false)
let rutaActual = ref();

router.beforeEach((to, from) => {
    rutaActual.value = to.path.split('/').pop()
})

async function logout() {
    composable.logout()
    router.push({ path: '/auth/login' })
}

onMounted(async () => {
    rutaActual.value = router.currentRoute.value.path.split('/').pop()
    logueado.value = composable.isLogged();
    emits('loaded', true)

    if (logueado.value == true) {
        reportStore = useReportStore()
        console.log('report store existe 🤧')
    }

})



</script>

<style lang="scss" scoped>
.header {
    padding-top: 0.3em;
    background-color: $secondary;
}

.container-buttons {
    display: flex;
}

//suelta errores pero aun asi pilla el scss por la configuracion en nuxt.config.ts
.tb {
    background-color: $secondary;
}

.title {
    background-color: $secondary;
    user-select: none;
    border-right: 5px solid white;
    font-size: large;
    height: 100%;
}

.estado {
    background-color: rgb(39, 38, 38);
    color: whitesmoke;
}
</style>