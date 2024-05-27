<template>

    <q-btn icon="mdi-arrow-left" @click="useRouter().back()" ></q-btn>


    <div v-if="posts.length == 0">No hay posts</div>

    <q-card v-for="post of posts" class="post q-mx-auto q-my-md q-py-md q-px-xl" @click="useRouter().push(`posts/${post._id}`)">
        <q-card-section class="text-h6 q-pb-xs">
            {{ post.titulo }}
        </q-card-section>
        <q-card-section class="content q-mb-sm q-pb-none">
            {{ post.contenido }}
        </q-card-section>
    </q-card>


</template>

<script setup>
import { usePet } from '~/composables/petComposable'

const id = useRoute().params.id
const posts = await usePet().getPetPosts(id)

</script>

<style scoped lang="scss">
.post {
    // max-width: 250px;
    width: 50%;
    min-height: 150px;
    max-height: 300px;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:after {
        content: '';
        position: absolute;
        bottom: 30px;
        left: 0;
        width: 100%;
        height: 20px;
        background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
        pointer-events: none;
    }

}

.content {
    height: 100%;
    position: relative;
    max-height: 145px;
    overflow: hidden;
    padding-bottom: none !important;
}
</style>
