<template>
  <div class="container">
    <q-btn @click="useRouter().back()">Volver</q-btn>

    <form @submit.prevent.default="p">
      <q-input label="Titulo" v-model="form.titulo"></q-input>
      <q-input
        type="textarea"
        label="Cuerpo del post"
        v-model="form.contenido"
      ></q-input>
      <q-file
        label="Multimedia (puedes elegir hasta varios archivos)"
        multiple
        append
        v-model="form.multimedia"
        @update:model-value="checkImages"
      ></q-file>
      <div>
        <span
          v-for="(pic, index) in picture"
          :key="index"
          style="position: relative"
        >
          <q-btn @click="removeImg(index)" class="remove">X</q-btn>
          <q-img :src="pic" alt="wow" width="200px"></q-img>
        </span>
      </div>
      <q-btn type="submit" label="crear post"></q-btn>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePet } from "~/composables/petComposable";
import { useUser } from "~/composables/userComposable";
import { useRoute } from "vue-router";

const picture = ref([]);

const form = ref({
  titulo: "",
  contenido: "",
  multimedia: [],
  autor: useUser().getUser()._id,
});
const route = useRoute();
const id = route.query.id;

function removeImg(index) {
  form.value.multimedia.splice(index, 1);
  picture.value.splice(index, 1);
}

function checkImages(e) {
  picture.value = [];
  for (let file of e) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      picture.value.push(ev.target.result);
    };
    reader.readAsDataURL(file);
  }
}

async function p() {
  const formD = new FormData();
  formD.append("titulo", form.value.titulo);
  formD.append("autor", form.value.autor);
  for (let f of form.value.multimedia) {
    formD.append("multi", f);
  }
  formD.append("contenido", form.value.contenido);
  formD.append("pet", id);

  console.log(form, "chulo!");
  const createdPost = await usePet().createPost(formD);
  useRouter().push({ path: `/pets/${id}/posts/${createdPost._id}` });
  console.log(createdPost, " a ver el pos creado");
}
</script>

<style scoped lang="scss">
.remove {
  position: absolute;
  background-color: antiquewhite;
  right: 0;
  z-index: 1;
}

.container {
  width: 80%;
  margin: 2em auto 0 auto;
  justify-content: center;
  border: 3px solid rgb(211, 128, 3);
  padding: 1em;
  border-radius: 8px;
  background-color: rgb(253, 243, 231);
  min-height: 40vh;
}
</style>
