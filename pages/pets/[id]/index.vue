<template>
    <div class="container">

        <q-btn class="back-button" @click="useRouter().back()" icon="mdi-arrow-left"> </q-btn>

        
        <div v-if="!loading" style="height: 100%" class="q-pa-sm">
            <!-- perfil -->
            
            <pet-profile :pet="pet" @report="(v) => petReport(v)" @showMedia="popup(pet)" />

            <div class="comentarios q-pa-md q-mt-lg">

                <div v-if="useUser().isLogged()">
                    <q-input label="Comentario a escribir" ref="comentario" flat
                        @keydown.enter.prevent="postComment(comentarioInput)" v-model="comentarioInput"></q-input>
                </div>

                <div v-else>
                    <p style="font-style:italic; font-size: large;">Loguéese para poder comentar</p>
                </div>
                <q-pagination v-model="currentPage" :max="totalPages"
                    class="q-pa-md items-center justify-center paginacion" direction-links boundary-links />

                <div class="q-pa-sm q-mx-auto" v-for="c of paginatedComments" :key="c._id">

                    <comentario-pet :c="c" :pet="pet" @reply="(content) => reply(content)"
                        :loggedIn="useUser().isLogged()" @report="(v) => commentReport(v)" mode="comment" />

                    <div class="replies q-mt-md">
                        <comentario-pet v-for="r of c.respuestas" :key="r.id" :c="r" :pet="pet" mode="reply" />
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

function commentReport(form) {
    report.value.id = form.reportedId;
    report.value.tipo = 'Comentario';
    report.value.show = true;
    console.log(report.value, 'report desde comment!')
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

// function formatDate(timestamp) {
//     const date = new Date(timestamp);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${day}-${month}-${year} ${hours}:${minutes}`;
// }

</script>

<style scoped lang="scss">

.container {
    background-color: #e9c9ab7a;
}

.back-button {
    margin-top: 2em;
    margin-left: 1.5em;
    border-radius: 35%;
    background-color: aliceblue;
}

.comentarios {
    // height: auto
    max-width: 80vw;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(245,245,245, 0.68);
    border-radius: 4px;
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
    background-color: rgb(54, 54, 54);
    color: whitesmoke;
}

.comment-body {
    display: flex;
    flex: 1;
    padding: 10px;
    background-color: rgba(211, 151, 21, 0.384);
    border: 3px solid whitesmoke;

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

.paginacion {
    margin-bottom: 2em;
}

.container-comment {
    background-color: black;
}
</style>
