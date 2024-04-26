<template>
    <div class="relative-position" style="border: 1px solid cyan; height:100%;">


        <div style="border: 2px solid blueviolet; min-height: 75%; min-width: 25%;" class="absolute-center q-pa-sm">
            <q-form>
                <q-input class="input" v-model="loginForm.login" filled label="Nombre o email" />
                <q-separator />
                <q-input class="input" v-model="loginForm.password" filled label="Contrase;a" />
                <q-checkbox class="input" label="Recordarme" v-model="recordar" />
                <q-separator />
                <div class="button-container q-pa-md">
                    <q-btn class="input" label="Login" />
                    <q-btn class="input"  label="Register" to="/auth/register" />
                </div>
            </q-form>
        </div>

    </div>
</template>

<script setup>
let recordar = ref(false)

let loginForm = ref({
    login: "",
    password: "",
})
</script>

<style scoped>
.button-container{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
.input {
    margin: 5px 0px;
}
</style>