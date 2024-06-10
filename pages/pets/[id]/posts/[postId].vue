<template>
  <report-form
    :id="postId"
    tipo="Post"
    :model-value="showReport"
    @update:model-value="(v) => (showReport = v)"
  />

  <ShowMedia
    :media="post.multimedia"
    :model-value="showMedia"
    @update:model-value="(v) => updateShowMedia(v)"
  />

  <div class="container">
    <q-btn
      flat
      rounded
      @click="useRouter().back()"
      icon="mdi-arrow-left"
      class="backbtn"
    >
    </q-btn>

    <q-btn
      flat
      color="red"
      class="cursor-pointer report"
      @click="showReport = true"
      ><q-icon name="mdi-flag" /> Reportar</q-btn
    >

    <h4 class="text-center q-pt-xl">{{ post.titulo }}</h4>
    <div class="q-pb-xl postcontent">
      <p>{{ post.contenido }}</p>
    </div>
    <div class="images q-py-md ">
      <q-btn @click="showMedia = true" >Ver multimedia</q-btn>
      <!-- <q-img
        v-for="i of post.multimedia"
        :src="apiUrl + '/uploads/' + i"
        width="200px"
      ></q-img> -->
    </div>
  </div>
</template>

<script setup>
import { usePet } from "~/composables/petComposable";
const apiUrl = useRuntimeConfig().public.urlApi;
const route = useRoute();
const post = ref({});
const showMedia = ref(false);

onBeforeMount(async () => {
  post.value = await usePet().getPost(route.params.postId);
});
const showReport = ref(false);

function updateShowMedia(newValue) {
  showMedia.value = newValue;
}
const { id, postId } = route.params;
</script>

<style scoped lang="scss">
.container {
  background-color: aliceblue;
  padding-left: 10%;
  padding-right: 10%;
  width: 70%;
  margin: auto;
  min-height: 475px;
  // height: 375px;
  position: relative;
}

.backbtn {
  position: absolute;
  top: 2.5%;
  left: 2.5%;
  z-index: 1;
}

.postcontent {
  min-height: 300px;
}

.report {
  position: absolute;
  top: 2.5%;
  right: 2.5%;
}
</style>
