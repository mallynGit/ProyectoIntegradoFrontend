<template>
    <q-btn @click="useRouter().back()" icon="mdi-arrow-left"> </q-btn>

    <ShowMedia :media="media.pet" :model-value="media.popup" @update:model-value="(v) => updatePopup(v)" />
    <ReportForm :id="report.id" :model-value="report.show" @update:model-value="(v) => report.show = v"
        :tipo="report.tipo" />
    <div v-if="!loading" style="height: 100%" class="q-pa-sm">
        <div class="q-ma-md">
            <span v-for="(k, v) of filterFields(pet)" :key="v">{{ v }}: {{ k }}<br /></span>
            <q-img :src="apiUrl + '/uploads/' + pet.foto_perfil" width="300px"></q-img>
            <q-btn label="Media" color="orange" @click="popup(pet)"></q-btn>
            <q-btn label="Posts" color="blue" @click="useRouter().push(`/pets/${pet._id}/posts`)"></q-btn>
            <q-btn label="report" color="red" @click="petReport()" />
            <q-btn v-if="pet.master._id == useUser().getUser()?._id" @click="navigateToCreatePost(pet._id)"
                label="Crear post" color="green"></q-btn>
            <q-btn v-if="pet.master._id == useUser().getUser()?._id" :to="pet._id + '/editProfile'"
                label="editar perfil" color="green"></q-btn>
        </div>

        <q-separator />
        <div class="comentarios q-pa-md q-mb-md">

            <div v-if="useUser().isLogged()">
                <q-input label="Comentario a escribir" ref="comentario" flat
                    @keydown.enter.prevent="postComment(comentarioInput)" v-model="comentarioInput"></q-input>
            </div>

            <div v-else>
                <p style="font-style:italic; font-size: large;">Loguéese para poder comentar</p>
            </div>
            <q-pagination v-model="currentPage" :max="totalPages" class="q-pa-md items-center justify-center"
                direction-links boundary-links />

            <div class="q-pa-sm q-mx-auto" v-for="c of paginatedComments" :key="c._id">

                <comentario-pet :c="c" :pet="pet" @reply="(content) => reply(content)"
                    :loggedIn="useUser().isLogged()" />

                <div class="replies q-mt-md">
                    <div class="reply" v-for="r of c.respuestas" :key="r.id">
                        <div class="comment-header">
                            <span>{{ formatDate(r.timestamp) }}</span>
                        </div>
                        <div class="comment-body">
                            <div class="author-info q-ma-auto">
                                <q-img :src="apiUrl + '/uploads/' + r.autor._id" width="50px" ratio="1"
                                    style="border: 1px solid black"></q-img>
                                <span>{{ r.autor.nick }}</span>
                                <q-chip v-if="r.autor._id == pet.master._id" color="orange">Dueño</q-chip>
                            </div>
                            <div class="content">
                                <p>{{ r.contenido }}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { usePet } from '~/composables/petComposable'
import { useRuntimeConfig } from '#imports'
import comentarioPet from '~/components/comentarioPet.vue'
import { useUser } from '#imports';
import { useRoute } from 'vue-router';

const currentPage = ref(1);
const pageSize = 4; // Por ejemplo, mostrar 5 comentarios por página

const totalPages = computed(() => Math.ceil(pet.value.comentarios.length / pageSize));


//test

const id = useRoute().params.id;
const apiUrl = useRuntimeConfig().public.urlApi;

let media = ref({ pet: [], popup: false });
let report = ref({ id: '', show: false, tipo: '' })
const pet = ref({});
const comentarioInput = ref(null);
const comentario = ref(null);
const loading = ref(true);

const paginatedComments = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = currentPage.value * pageSize;
    return pet.value.comentarios.slice(startIndex, endIndex);
});

onBeforeMount(() => {
    usePet().getPetById(id).then((res) => {
        console.log(res)
        pet.value = res;
        sortComments();
        loading.value = false;
    });
});

function sortComments() {
    pet.value.comentarios.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return dateB - dateA;
    });
}

function reply(reply) {
    reply = { autor: useUser().getUser()._id, ...reply }
    usePet().reply(reply).then(() => {
        usePet().getPetById(id).then((res) => {
            console.log(res)
            pet.value = res;
            sortComments();
        });
    })
}

function petReport(){
    report.value.id = pet.value._id;
    report.value.tipo = 'Mascota';
    report.value.show = true;
}

function navigateToCreatePost(id) {
    useRouter().push({ path: '/pets/createPost', query: { id } })
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
    let filtered = (({ _id, foto_perfil, multimedia, comentarios, posts, ...item }) => item)(item);
    return filtered;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

</script>

<style scoped lang="scss">
.comentarios {
    // height: auto
    max-width: 80vw;
    margin: 0px auto;
}


.reply {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 10px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    min-width: 325px;
    max-width: 85%;
    min-height: 175px;
    background-color: rgba(8, 31, 114, 0.2);
    font-size: 0.9em;
    /* Tamaño de fuente más pequeño */
    margin-left: auto;
    /* Alinea a la derecha */
}

.comment-header {
    width: 100%;
    padding: 5px 12.5px;
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.05);
}

.comment-body {
    display: flex;
    flex: 1;
    padding: 10px;
}

.author-info {
    width: 125px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    border-right: 1px solid black;
    height: 100%;
}

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
    padding-bottom: 0px;
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
