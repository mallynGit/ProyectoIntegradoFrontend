<template>
    <div class="header">
        <q-layout view="lHh lpr lfr" container style="height: 8vh; width:100%;">
            <q-header elevated>
                <q-toolbar class="glossy tb">
                    <q-toolbar-title style="border: 1px solid black;">
                        <div><q-btn class="glossy title" size="18px" rounded label="Bondpet" to="/" />
                            <marquee behavior="scrolling" direction="left" scrollamount="20" width="88%"
                                style="top:50px;"><span>{{ rutaActual }}</span></marquee>
                        </div>
                    </q-toolbar-title>
                    <q-btn flat round dense icon="mdi-gamepad" label="test" to="/test/hola" />
                    <q-btn flat round dense icon="mdi-account-plus" label="register" to="/auth/register" />
                    <q-btn flat round dense icon="mdi-account-arrow-left" label="login" to="/auth/login" />
                    <q-btn flat round dense icon="mdi-account-off" label="logout" @click="store.logout()"
                        to="/auth/login" />
                    <q-chip> Estado: {{ store.isLogged() ? 'ON' : 'OFF' }}</q-chip>
                </q-toolbar>
            </q-header>
        </q-layout>
    </div>
</template>

<script setup>
import { useUser } from '#imports';
const store = useUser()
const router = useRouter();
const env = useRuntimeConfig().public
let rutaActual = ref();

router.beforeEach((to, from) => {
    let ruta = to.path.split('/')
    rutaActual.value = ruta[ruta.length - 1]
})

onMounted(() => {
    let r = router.currentRoute.value.path.split('/')
    rutaActual.value = r[r.length - 1]
    console.log(env, 'env?')
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