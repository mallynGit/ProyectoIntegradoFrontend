<template>
  <div class="relative-position" style="border: 1px solid cyan; height: 100%">
    <div style="border: 2px solid blueviolet; min-height: 75%; min-width: 25%" class="absolute-center q-pa-sm">
      <q-form @submit="login">
        <q-input class="input" v-model="loginForm.email" filled label="Nombre o email" />
        <q-separator />
        <q-input class="input" v-model="loginForm.password" filled label="Contrase;a" />
        <q-checkbox class="input" label="Recordarme" v-model="recordar" />
        <q-separator />
        <div class="button-container q-pa-md">
          <q-btn class="input" label="Login" type="submit" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
import { useUser } from '~/composables/userComposable';

const userStore = useUser();

let recordar = ref(false);


let loginForm = ref({
  email: "",
  password: "",
});

const login = async () => {
  try {

    let res = await userStore.login(loginForm.value);
    console.log(res,' desde pagina login');

    if (res == 404) {
      return alert("Usuario no encontrado");
    } else if(res==401){
      return alert("Contraseña incorrecta");
    }
    // localStorage.setItem('token', res)
    alert("Login correcto");
    router.push({ path: '/user/profile' })
  } catch (err) {
    console.log(err, "err");

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
