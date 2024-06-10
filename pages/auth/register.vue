<template>
  <div
    class="errors text-center q-mt-sm q-pa-sm q-mx-auto"
    v-show="errors.length > 0"
  >
    <span v-for="error in errors" :key="error">{{ error }} <br /></span>
  </div>
  <div class="relative-position row container">
    <div style="width: 33vw" class="vertical-middle q-mx-auto q-mt-md q-pa-sm">
      <q-form @submit="register" class="container-register">
        <div v-for="(field, name) in registerForm" :key="name">
          <q-input
            :label="name"
            required
            filled
            v-model="registerForm[name]"
            @change="validate"
            v-if="typeof field != 'object'"
            class="q-my-sm"
          >
            <template v-slot:label>
              <div class="text-capitalize">{{ name }}</div>
            </template>
          </q-input>
          <q-input
            v-else
            :label="name"
            required
            filled
            v-model="registerForm[name].input"
            @change="validate"
            class="q-my-sm"
            :type="field.type"
          >
            <template v-slot:label>
              <div class="text-capitalize">{{ name }}</div>
            </template>
            <template v-slot:append>
              <q-icon
                :name="field.type == 'password' ? 'mdi-eye' : 'mdi-eye-off'"
                class="cursor-pointer"
                @click="
                  field.type = field.type == 'password' ? 'text' : 'password'
                "
              />
            </template>
          </q-input>
        </div>
        <q-file
          v-model="profilePic"
          label="Foto de perfil"
          class="q-my-sm"
        ></q-file>
        <q-separator />
        <div class="button-container q-pa-md">
          <q-btn class="input" label="Volver" @click="router.back()" />
          <q-btn
            class="input"
            label="Agregar mascota"
            @click="agregarMascota"
          />
          <q-btn class="input" label="Registrar" type="submit" />
          <q-btn class="input" label="report" @click="console.log(mascotas)" />
        </div>
      </q-form>
    </div>

    <div
      v-if="mascotas.length > 0"
      class="registermascotas q-mx-auto q-mt-md q-pa-sm"
    >
      <div v-for="(m, i) in mascotas" :key="i" class="q-pa-md">
        <template v-for="(field, name) in m">
          <q-input
            v-if="name != 'media' && name != 'sexo'"
            :label="name.slice(0, 1).toUpperCase() + name.slice(1)"
            :key="name"
            v-model="m[name]"
            required
            filled
            class="q-py-xs"
          />
          <q-select
            v-if="name == 'sexo'"
            label="Sexo"
            v-model="m.sexo"
            :options="['Macho', 'Hembra']"
            filled
            class="q-py-xs"
            required
          />
          <q-file
            v-if="name == 'media'"
            label="Foto de perfil"
            v-model="m.media"
            class="q-py-xs"
          ></q-file>
        </template>
        <q-btn label="borrar" @click="mascotas.splice(i, 1)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "#imports";

const router = useRouter();

let errorArray = [];
let errors = ref([]); // Make errors reactive
let mascotas = ref([]);

let registerForm = ref({
  nick: "",
  email: "",
  nombre: "",
  apellidos: "",
  password: { input: "", type: "password" },
  "repeat password": { input: "", type: "password" },
});

let profilePic = ref(null);

const mascotaPlantilla = {
  nombre: "",
  raza: "",
  categoria: "",
  edad: "",
  sexo: "Macho",
  peso: "",
  media: null,
};

watch(profilePic, () => {
  if (profilePic.value) {
    console.log(profilePic.value, "profilePic");
  }
});

const agregarMascota = () => {
  mascotas.value.push({ ...mascotaPlantilla });
};

const validate = () => {
  errors.value = [];
  let form = registerForm.value;
  if (form.password.length < 8) {
    errors.value.push("La contraseña debe tener al menos 8 caracteres");
  } else if (
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d\s])[A-Za-z\d\W]{8,}$/.test(
      form.password.input
    ) == false
  ) {
    errors.value.push(
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial"
    );
  } else if (form.password.input !== form["repeat password"].input) {
    errors.value.push("Las contraseñas deben coincidir");
  }
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email) == false
  ) {
    errors.value.push("Introduce un email correcto");
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
      alert("Arregla los errores que existan en el formulario.");
      return;
    }
    console.log(mascotas.value, "mascotas");
    delete registerForm.value["repeat password"];
    registerForm.value["password"] = registerForm.value.password.input;
    await useUser().register(
      registerForm.value,
      profilePic.value,
      mascotas.value
    );
    alert("Usuario creado correctamente, por favor logueese.");
    router.push({ path: "/auth/login" });
  } catch (err) {
    console.log(err, "err");
    if (err.response.status == 403) {
      alert(
        "Un usuario con ese mismo email o nick ya existe, pruebe con otros"
      );
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  min-height: 40vh;
  width: 80vw;
  margin: auto;
}

.container-register {
  border: 1px solid white;
  padding: 1em;
  border-radius: 8px;
  box-shadow: rgb(223, 125, 46) 0px 5px 10px 4px;
  margin-top: 3em;
  background-color: whitesmoke;
}

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
  overflow-y: auto;
  width: 33vw;
  // max-height: 50vh;
  border-radius: 8px;
  box-shadow: rgb(223, 125, 46) 0px 5px 10px 4px;
  // min-height: 100px;
  height: 62vh;
  margin-top: 5em;
  background-color: whitesmoke;
}
</style>
