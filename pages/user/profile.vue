<template>
  <q-dialog v-model="showPets">
    <q-card class="pets">
      <q-card-section class="justify-center row">
        <pet-card v-for="pet of pets" :key="pet._id" :pet="pet" />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="changePassword">
    <q-card>
      <q-card-section>
        <div class="q-pa-sm">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
            <q-input
              filled
              type="password"
              v-model="changePwd.password"
              label="Contraseña actual"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Debes introducir una contraseña',
              ]"
            />
            <q-input
              filled
              type="password"
              v-model="changePwd.newPwd"
              label="Contraseña nueva"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Debes introducir una contraseña',
                (val) =>
                  (val && val == changePwd.repeatNewPwd) ||
                  'Las contraseñas no coinciden',
              ]"
            />
            <q-input
              filled
              type="password"
              v-model="changePwd.repeatNewPwd"
              label="Repetir contraseña nueva"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Debes introducir una contraseña',
                (val) =>
                  (val && val == changePwd.newPwd) ||
                  'Las contraseñas no coinciden',
              ]"
            />
            <div class="row justify-center">
              <q-btn label="Cambiar contraseña" type="submit" class="button" />
              <q-btn
                label="Cancelar"
                type="reset"
                flat
                class="q-ml-sm button-cancel"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <div class="text-h5 container">
    <q-img
      ratio="1"
      class="q-ma-lg image cursor-pointer"
      :src="profilePic"
      :class="`profile-img ${editar ? 'img-edit' : ''}`"
      @click="editar ? triggerFileInput() : ''"
    />
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileUpload"
    />

    <div class="q-mt-md">
      <div v-for="(field, index) in filteredFields" class="info q-my-sm">
        <span class="text-weight-bold">{{ index }}: </span>
        <span v-if="!editar">{{ field }}</span>
        <q-input dense v-else v-model="snapshot[index]" />
      </div>
      <!-- <q-btn
        class="button"
        @click="changePassword = true"
        v-if="editar"
        label="Cambiar contraseña"
      ></q-btn> -->
      <div class="container-buttons q-pt-xl">
        <q-btn class="button" to="/pets/add-pet">Añadir mascota</q-btn>
        <q-btn class="button" @click="showPets = true">Ver mascotas</q-btn>
        <div>
          <q-btn class="button" @click="editar = true" v-if="!editar"
            >Editar perfil</q-btn
          >
          <div v-else>
            <q-btn flat round @click="restoreDefaultValues()">
              <q-icon name="mdi-close"></q-icon>
            </q-btn>
            <q-btn flat round @click="saveChanges()">
              <q-icon name="mdi-check"></q-icon>
            </q-btn>
          </div>
        </div>
        <q-btn class="button" @click="darDeBaja()">Dar de baja</q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
const apiUrl = useRuntimeConfig().public.urlApi;
const user = useUser().getUser();
const showPets = ref(false);
const changePassword = ref(false);
const editar = ref(false);
const uploadedProfilePic = ref(null);
const fileInput = ref(null);
const profilePic = ref(`${apiUrl}/uploads/${user._id}`);

const changePwd = ref({
  password: "",
  newPwd: "",
  repeatNewPwd: "",
});

function handleFileUpload(event) {
  const file = event.target.files[0];
  uploadedProfilePic.value = file;
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePic.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function triggerFileInput() {
  fileInput.value.click();
}

const pets = ref(await usePet().getUserPets(user._id));

definePageMeta({
  role: "user",
});

let item;
if (user) {
  item = (({ pets, posts, role, _id, bloqueado, ...item }) => item)(user);
}

const filteredFields = ref(item);
const snapshot = ref(undefined);
const uploadPicture = ref(null);

watch(editar, (x) => {
  if (!x) {
    snapshot.value = undefined;
  } else {
    snapshot.value = JSON.parse(JSON.stringify(filteredFields.value));
  }
});

function restoreDefaultValues() {
  snapshot.value = undefined;
  editar.value = false;
}

function uploadPic() {
  uploadPicture.value.$el.addEventListener("change", (event) => {
    const file = event.target.files[0];
    console.log(event.target, "VALE!!!!!!");
  });
  uploadPicture.value.$el.click();
}

function saveChanges() {
  const formData = new FormData();
  formData.append("nombre", snapshot.value.nombre);
  formData.append("apellidos", snapshot.value.apellidos);
  formData.append("email", snapshot.value.email);
  formData.append("nick", snapshot.value.nick);
  formData.append("userId", user._id);
  formData.append("updateUser", true);
  if (uploadedProfilePic.value) {
    formData.append(
      "media",
      uploadedProfilePic.value,
      `update_${user._id}.${uploadedProfilePic.value.type.split("/")[1]}`
    );
  }
  console.log(snapshot.value, filteredFields.value, formData, user._id);
  useAxiosInstance().put("/user/update/" + user._id, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  filteredFields.value = snapshot.value;
  editar.value = false;
}

async function darDeBaja() {
  await useAxiosInstance()
    .delete("/user/delete/" + user._id)
    .then(() => {
      useUser().logout();
      useRouter().push("/auth/login");
    });
}
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

.pets {
  width: 60%;
  max-width: 100%;
}

.info {
  font-family: "Varela Round", sans-serif;
}

.container {
  width: 80%;
  margin: 2em auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 3px solid rgb(211, 128, 3);
  padding: 1em;
  border-radius: 8px;
  background-color: rgb(253, 243, 231);
  min-height: 40vh;
}

.image {
  background-image: url("@/assets/images/default-image.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 5px solid rgb(211, 128, 3);
  border-radius: 50%;
  width: 250px;
  height: 250px;
  display: block;
  margin: auto 1em;
}

.container-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin: auto;
  width: fit-content;
}

.button {
  background-color: chocolate;
  color: whitesmoke;
}

.button-cancel {
  color: chocolate;
  background-color: whitesmoke;
}

.button:hover {
  opacity: 0.7;
}
</style>
