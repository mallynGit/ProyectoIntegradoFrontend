<template>

    <q-btn @click="useRouter().back()" icon="mdi-arrow-left"> </q-btn>
    <report-form :id="postId" tipo="Post" :model-value="showReport" @update:model-value="(v) => showReport = v" />
    <div>
        <span class="cursor-pointer" @click="showReport = true"><q-icon name="mdi-flag" /> Reportar</span>


        <h4> {{ post.titulo }}</h4>
        <div class="images">
            <q-img v-for="i of post.multimedia" :src="apiUrl + '/uploads/' + i" width="200px"></q-img>
        </div>
        <p> {{ post.contenido }}</p>

    </div>

</template>

<script setup>
import { usePet } from '~/composables/petComposable'
const apiUrl = useRuntimeConfig().public.urlApi
const route = useRoute()
const post = ref({})

onBeforeMount(async () => {
    post.value = await usePet().getPost(route.params.postId)
})
const showReport = ref(false)

const { id, postId } = route.params

</script>

<style scoped lang="scss"></style>