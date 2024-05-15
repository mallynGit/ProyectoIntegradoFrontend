<template>
    <div class="header">
        <q-layout view="lHh lpr lfr" container style="height: 8vh; width:100%;">
            <q-header elevated>
                <q-toolbar class="glossy tb">
                    <q-toolbar-title style="display: flex; vertical-align: middle;">
                        <q-btn class="glossy title" size="18px" rounded label="Bondpet" to="/" />
                        <marquee direction="left" scrollamount="20" width="88%" style="user-select: none;"><span
                                style="font-size:31px;">{{ rutaActual ? rutaActual : '???' }}</span>
                        </marquee>
                    </q-toolbar-title>
                    <q-btn flat round dense icon="mdi-dog-side" label="Pets" to="/pets" />
                    <q-btn flat round dense icon="mdi-gamepad" label="test" to="/test/hola" />
                    <q-btn flat round dense icon="mdi-account-plus" label="register" to="/auth/register" />
                    <q-btn flat round dense icon="mdi-account-arrow-left" label="login" to="/auth/login" />
                    <q-btn flat round dense icon="mdi-account-off" label="logout" @click="logout()" />
                    <q-chip clickable @click="router.push('/user/profile')"> Estado: {{ logueado ? 'ON' : 'OFF'
                        }}</q-chip>
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
})


</script>

<style lang="scss" scoped>
//suelta errores pero aun asi pilla el scss por la configuracion en nuxt.config.ts
.tb {
    background-color: $secondary;
}

.title {
    background-color: $primary;
    user-select: none;
}
</style>