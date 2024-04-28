<template>
  <div class="relative-position" style="border: 1px solid cyan; height: 100%">
    <div
      style="border: 2px solid blueviolet; min-height: 75%; min-width: 25%"
      class="absolute-center q-pa-sm"
    >
      <q-form @submit="login">
        <q-input
          class="input"
          v-model="loginForm.email"
          filled
          label="Nombre o email"
        />
        <q-separator />
        <q-input
          class="input"
          v-model="loginForm.password"
          filled
          label="Contrase;a"
        />
        <q-checkbox class="input" label="Recordarme" v-model="recordar" />
        <q-separator />
        <div class="button-container q-pa-md">
          <q-btn class="input" label="Login" type="submit" />
          <q-btn class="input" label="Register" to="/auth/register" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup>
const { $axios } = useNuxtApp();
const router = useRouter();
let recordar = ref(false);

let loginForm = ref({
  email: "",
  password: "",
});

const login = async () => {
  try {
    let login = loginForm.value.login;

    let res = await $axios.post("/auth/login", loginForm.value);
    console.log(res);

    alert("Login correcto");
  } catch (err) {
    console.log(err, "err");
    if (err.response.status == 404) {
      alert("Usuario no encontrado");
    } else if (err.response.status == 401) {
      alert("Hubo un error con el servidor");
    }
  }
};
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
