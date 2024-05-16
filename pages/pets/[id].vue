<template>
    <ShowMedia :media="media.pet" :model-value="media.popup" @update:model-value="(v) => updatePopup(v)" />
    <div v-if="!loading" style="height: 100%" class="q-pa-sm">
        <div class="q-ma-md">
            <span v-for="(k, v) of filterFields(pet)">{{ v }}: {{ k }}<br /></span>
            <q-img :src="apiUrl + '/uploads/' + pet.foto_perfil?._id" width="300px"></q-img>
            <q-btn label="Media" color="orange" @click="popup(pet)"></q-btn>
        </div>

        <q-separator />
        <div class="comentarios q-pa-md q-mb-md">

            <div v-if="useUser().isLogged()">
                <q-input label="comentario a escribir XD" ref="comentario" flat
                    @keydown.enter.prevent="postComment(comentarioInput)" v-model="comentarioInput"></q-input>
            </div>

            <div v-else>
                <p style="font-style:italic; font-size: large;">Logueese para poder comentar</p>
            </div>
            <q-pagination v-model="currentPage" :max="totalPages" class="q-pa-md items-center justify-center"
                direction-links boundary-links />

            <div class="comment q-pa-sm q-mx-auto" v-for="c of paginatedComments" :key="c.id">
                <div class="comment-header">
                    <span>{{ formatDate(c.timestamp) }}</span>
                </div>
                <div class="comment-body">
                    <div class="author-info q-ma-auto">
                        <q-img :src="apiUrl + '/uploads/' + c.autor._id" width="75px" ratio="1"
                            style="border: 1px solid black"></q-img>
                        <span>{{ c.autor.nick }}</span>
                        <q-chip v-if="c.autor._id == pet.master._id" color="orange">Dueño</q-chip>
                    </div>
                    <div class="content">

                        <p>{{ c.contenido }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePet } from '~/composables/petComposable'
import { useUser } from '#imports';
import { useRoute } from 'vue-router';

const currentPage = ref(1);
const pageSize = 4; // Por ejemplo, mostrar 5 comentarios por página

const totalPages = computed(() => Math.ceil(pet.value.comentarios.length / pageSize));

const paginatedComments = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = currentPage.value * pageSize;
    return pet.value.comentarios.slice(startIndex, endIndex);
});


const id = useRoute().params.id;
const apiUrl = useRuntimeConfig().public.urlApi;

let media = ref({ pet: [], popup: false });
const pet = ref({});
const comentarioInput = ref(null);
const comentario = ref(null);
const loading = ref(true);

onBeforeMount(() => {
    usePet().getPetById(id).then((res) => {
        pet.value = res;
        console.log(res);
        sortComments();
        loading.value = false;
    });
});

function sortComments() {
    pet.value.comentarios = pet.value.comentarios.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB - dateA;
    });
}

async function postComment(content) {
    console.log(paginatedComments);
    let obj = {
        contenido: content,
        autor: useUser().getUser()._id,
        perfil: pet.value._id
    };
    console.log(obj, 'bb');
    await usePet().postComment(obj);
    const updatedPet = await usePet().getPetById(id);
    pet.value = updatedPet;
    sortComments();
    paginatedComments.value
    comentarioInput.value = "";
    comentario.value.blur();
}

function popup(pet) {
    media.value.popup = true;
    media.value.pet = pet.multimedia;
}

function updatePopup(newValue) {
    media.value.popup = newValue;
}

function filterFields(item) {
    let filtered = (({ _id, foto_perfil, multimedia, comentarios, ...item }) => item)(item);
    return filtered;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
</script>

<style scoped lang="scss">
.comentarios {
    // height: auto
}

.comment {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    min-width: 325px;
    max-width: 85%;
    min-height: 175px;
    background-color: rgba(8, 31, 114, 0.13);
}

.comment-header {
    margin-left: 12.5px;
    margin-bottom: 5px;
    font-size: 12px;
}

.comment-body {
    display: flex;
    flex: 1;
}

.author-info {
    width: 125px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    border-right: 1px solid black;
}

.content {
    flex: 1;
    padding: 10px;
}
</style>
