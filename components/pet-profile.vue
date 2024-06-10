<template>
  <div class="q-ma-sm">
    <ShowMedia
      :media="media.pet"
      :key="reRender"
      :model-value="media.popup"
      @update:model-value="(v) => updatePopup(v)"
    />
    <ReportForm
      :id="reportRef.id"
      :model-value="reportRef.show"
      @update:model-value="(v) => (reportRef.show = v)"
      :tipo="report.tipo"
    />
    <div class="info column q-my-sm justify-center items-center">
      <div class="row q-mt-xl">
        <div
          class="q-py-md q-pr-xl col justify-center items-center column container-image"
        >
          <div>
            <div
              class="edit"
              v-if="
                useUser().isLogged() &&
                (useUser().isAdmin() ||
                  petRef.master._id == useUser().getUser()?._id) &&
                !report
              "
            >
              <q-btn flat round v-if="!editar" @click="editar = !editar">
                <q-icon name="mdi-pencil"></q-icon>
              </q-btn>
              <div v-else>
                <q-btn flat round @click="saveChanges()">
                  <q-icon name="mdi-check"></q-icon>
                </q-btn>
                <q-btn flat round @click="restoreDefaultValues()">
                  <q-icon name="mdi-close"></q-icon>
                </q-btn>
              </div>
            </div>

            <q-img
              :src="profilePic"
              width="250px"
              ratio="1"
              :class="`profile-img ${editar ? 'img-edit' : ''}`"
              @click="editar ? triggerFileInput() : ''"
            >
            </q-img>
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="handleFileUpload"
            />
          </div>
          <p><strong>Master:</strong> {{ petRef.master.nick }}</p>
        </div>
        <div class="q-pa-md col justify-center column items-start">
          <div class="info-text">
            <div>
              <span class="text-weight-bold">Nombre: </span>
              <span v-if="!editar">{{ petRef.nombre }}</span>
              <q-input dense v-else v-model="snapshot.nombre" />
            </div>
            <div>
              <span class="text-weight-bold">Edad: </span>
              <span v-if="!editar">{{ petRef.edad }}</span>
              <q-input dense v-else v-model="snapshot.edad" />
            </div>
            <div>
              <span class="text-weight-bold">Categoria: </span>
              <span v-if="!editar">{{ petRef.categoria }}</span>
              <q-input dense v-else v-model="snapshot.categoria" />
            </div>
            <div>
              <span class="text-weight-bold">Raza: </span>
              <span v-if="!editar">{{ petRef.raza }}</span>
              <q-input dense v-else v-model="snapshot.raza" />
            </div>
            <div>
              <span class="text-weight-bold">Peso: </span>
              <span v-if="!editar">{{ petRef.peso ? petRef.peso : 0 }}KG</span>
              <q-input dense type="number" v-else v-model="snapshot.peso">
                <template v-slot:append> KG </template>
              </q-input>
            </div>
            <div>
              <span class="text-weight-bold">Sexo: </span>
              <span v-if="!editar">{{ petRef.sexo }}</span>
              <div v-else>
                <q-option-group
                  :options="sexOptions"
                  dense
                  v-model="snapshot.sexo"
                  value="H"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-buttons col-12 justify-evenly" v-if="!report">
        <q-file
          style="display: none"
          ref="uploadPicture"
          v-model="inputPic"
          v-if="petRef.master._id == useUser().getUser()?._id"
        ></q-file>
        <q-btn
          class="button"
          label="subir foto"
          color="grey"
          @click="uploadPic()"
          v-if="petRef.master._id == useUser().getUser()?._id"

        >
        </q-btn>
        <q-btn
          class="button"
          label="Media"
          color="orange"
          @click="popup(petRef)"
        ></q-btn>
        <q-btn
        class="button"
        label="Posts"
        color="blue"
        @click="useRouter().push(`/pets/${petRef._id}/posts`)"
        ></q-btn>
        <q-btn
          class="button"
          v-if="petRef.master._id == useUser().getUser()?._id"
          @click="navigateToCreatePost(petRef._id)"
          label="Crear post"
          color="green"
        ></q-btn>
        <q-btn class="button" label="report" color="red" @click="petReport()" v-if="useUser().isLogged()" />
        <q-btn class="button" label="Dar de baja" color="red" @click="deletePet()" v-if="petRef.master._id == useUser().getUser()?._id || useUser().getUser()?.role.toLowerCase() == 'admin'"></q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
const apiUrl = useRuntimeConfig().public.urlApi;
const reRender = ref(0);
const props = defineProps({
  pet: Object,
  report: Boolean,
  editar: Boolean,
});

let media = ref({ pet: [], popup: false });
let reportRef = ref({ id: "", show: false, tipo: "" });

const petRef = ref(props.pet);
const snapshot = ref(undefined);
const profilePic = ref(apiUrl + "/uploads/" + props.pet.foto_perfil);
const uploadedProfilePic = ref(null);
const editar = ref(false);
const fileInput = ref(null);
const uploadPicture = ref(null);
const inputPic = ref(null);

watch(editar, (x) => {
  if (!x) {
    snapshot.value = undefined;
  } else {
    snapshot.value = JSON.parse(JSON.stringify(petRef.value));
  }
});

const sexOptions = [
  {
    label: "Hembra",
    value: "Hembra",
  },
  {
    label: "Macho",
    value: "Macho",
  },
];

function popup(pet) {
  media.value.popup = true;
  media.value.pet = pet.multimedia;
}

function deletePet(){
  useAxiosInstance().delete("/pets/delete?id="+petRef.value._id).then(() => {
    useRouter().push({ path: "/pets" });
  })
}

function uploadPic() {
  uploadPicture.value.$el.addEventListener("change", (event) => {
    const file = event.target.files[0];
    console.log(event.target, "VALE!!!!!!");
  });
  uploadPicture.value.$el.click();
}

watch(inputPic, (x) => {
  if (x) {
    usePetStore()
      .uploadPicture(x, petRef.value._id)
      .then((res) => {
        if (res) {
          console.log(media.value.pet);
          media.value.pet = res.data.multimedia;
          useRouter().go();
          console.log(media.value.pet);
        }
      });
  }
  inputPic.value = null;
});

function updatePopup(newValue) {
  media.value.popup = newValue;
}

function saveChanges() {
  const formData = new FormData();
  formData.append("nombre", snapshot.value.nombre);
  formData.append("raza", snapshot.value.raza);
  formData.append("categoria", snapshot.value.categoria);
  formData.append("edad", snapshot.value.edad);
  formData.append("peso", snapshot.value.peso);
  formData.append("sexo", snapshot.value.sexo);
  formData.append("_id", snapshot.value._id);
  if (uploadedProfilePic.value) {
    formData.append(
      "media",
      uploadedProfilePic.value,
      `update_${petRef.value._id}.${
        uploadedProfilePic.value.type.split("/")[1]
      }`
    );
    console.log(
      `update_${petRef.value._id}.${
        uploadedProfilePic.value.type.split("/")[1]
      }`
    );
  }
  useAxiosInstance()
    .put("/pets/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      console.log("updated!", res);
    });

  console.log(snapshot.value, uploadedProfilePic.value, "saving");

  petRef.value = snapshot.value;
  editar.value = false;
}

function restoreDefaultValues() {
  snapshot.value = undefined;
  profilePic.value = apiUrl + "/uploads/" + props.pet.foto_perfil;
  editar.value = false;
}

function petReport() {
  reportRef.value.id = props.pet._id;
  reportRef.value.tipo = "Mascota";
  reportRef.value.show = true;
  console.log(reportRef.value, "report desde pet!");
}

function navigateToCreatePost(id) {
  useRouter().push({ path: "/pets/createPost", query: { id } });
}

function triggerFileInput() {
  fileInput.value.click();
}

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

const emits = defineEmits(["report", "showMedia"]);
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

.info {
  border: 3px solid chocolate;
  border-radius: 7.5%;
  background-color: rgba(244, 234, 225, 1);
  width: 50%;
  min-height: 450px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  font-family: "Varela Round", sans-serif;

  .info-text {
    margin-left: 1em;
    min-width: 200px;
    font-size: 2em;
  }
}

.edit {
  position: absolute;
  margin: 0px;
  top: 1em;
  right: 1.5em;
  z-index: 1;
}

/* Estilos para pantallas medianas (tablets) */
@media (max-width: 1176px) {
  .info {
    width: 90%;
    flex-direction: column;
    align-items: center;
  }

  .info .container-image {
    border: none;
  }

  .info .info-text {
    font-size: 1.5em;
  }
}

/* Estilos para pantallas pequeñas (móviles) */
@media (max-width: 480px) {
  .info {
    width: 100%;
    border: 3px dotted chocolate;
  }

  .info .container-image {
    border: none;
  }

  .info .info-text {
    font-size: 1.2em;
    min-width: 100%;
    text-align: center;
  }
}

.profile-img {
  border: 2px solid chocolate;
  border-radius: 50%;
}

.info-item {
  padding-left: 25%;
}

.container-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin: auto;
  width: fit-content;
  margin-top: 3em;
  margin-bottom: 3em;
}

.container-buttons button:hover {
  opacity: 0.8;
}

.container-image {
  border-right: 3px solid whitesmoke;
  width: fit-content;
  display: flex;

  div {
    width: fit-content;
  }

  p {
    text-align: right;
    font-size: 1.5em;
    padding-top: 0.5em;
  }
}

.img-edit:hover {
  cursor: pointer;

  ::after {
    content: "Cambiar imagen";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.3);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
