<template>
  <div class="relative-position container" style="border: 1px solid cyan; height: 100%">
    <div style="min-height: 75%; min-width: 25%" class="absolute-center q-pa-sm">
      <q-form @submit="login" class="container-login">
        <q-input class="input" v-model="loginForm.email" filled label="Email" />
        <q-separator />
        <q-input v-model="loginForm.password" filled :type="isPwd ? 'password' : 'text'" label="Contraseña"
          class="input">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'mdi-eye' : 'mdi-eye-off'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-checkbox class="input" label="Recordarme" v-model="recordar" color="primary" />
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

const recordar = ref(false);
const isPwd = ref(true)

let loginForm = ref({
  email: "",
  password: "",
});

onBeforeMount(() => {
  if(localStorage.getItem('rememberMe')) {
    loginForm.value.email = localStorage.getItem('rememberMe')
    recordar.value = true
  }
})

const login = async () => {
  try {
    let res = await userStore.login(loginForm.value);

    if (res == 404) {
      return alert("Usuario no encontrado");
    } else if (res == 401) {
      return alert("Contraseña incorrecta");
    }

    if (recordar.value == true) {
      localStorage.setItem('rememberMe', loginForm.value.email)
    } else {
      localStorage.removeItem('rememberMe')
    }

    alert("Login correcto");
    router.push({ path: '/user/profile' })
  } catch (err) {
    console.log(err, "err");

  }
};
</script>

<style scoped>

.container-login{
  border: 1px solid white;
  padding: 1em;
  border-radius: 8px;
  box-shadow: rgb(223, 125, 46) 0px 5px 10px 4px;
  background-color: #fff4ea;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.input {
  margin: 5px 0px;
}
</style>
