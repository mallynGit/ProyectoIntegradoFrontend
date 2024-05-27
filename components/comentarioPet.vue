<template>
    <div class="comment">
        <div class="comment-header">
            <span>{{ formatDate(c?.timestamp) }}</span>
        </div>
        <div class="comment-body">
            <div class="author-info">
                <q-img :src="apiUrl + '/uploads/' + c?.autor._id" width="75px" ratio="1"
                    style="border: 1px solid black"></q-img>
                <span>{{ c?.autor.nick }}</span>
                <q-chip v-if="c?.autor._id == pet?.master._id" color="orange">Dueño</q-chip>
            </div>
            <div class="content">
                <div class="content-text">
                    <p>{{ c?.contenido }}</p>
                </div>
                <div class="comment-id-line">
                    <div class="comment-id">
                        <span>ID: {{ c?._id }}</span>
                        <div class="actions">
                            <!-- reply -->
                            <span class="comment-action" @click="replying = !replying" v-if="loggedIn">
                                <q-icon size="16px" name="mdi-reply" />
                                reply
                            </span>
                            <!-- report -->
                            <span class="comment-action" @click="report()" >
                                <q-icon name="mdi-flag" size="16px" />
                                report
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="reply" v-if="replying">
        <q-input label="Escribe un comentario" v-model="replyValue" @keydown.enter.prevent="reply()"> </q-input>
    </div>
</template>

<script setup>
const apiUrl = useRuntimeConfig().public.urlApi

const props = defineProps({
    c: Object,
    pet: Object,
    loggedIn: Boolean
})

const emits = defineEmits(['reply', 'deleteComment', 'report'])

let replying = ref(false)
let replyValue = ref('')

function report() {
    let form = {
        tipo: 'Comentario',
        reportedId: props.c._id
    }
    emits('report', form)
}

function reply() {
    emits('reply', { contenido: replyValue.value, id: props.c._id })
    replying.value = false
    replyValue.value = ''
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

<style lang="scss" scoped>
.comment {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    min-width: 325px;
    max-width: 100%;
    max-height: 225px;
    height: 225px;
    background-color: rgba(8, 31, 114, 0.13);
    margin: 0px auto;
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

.content-text {
    flex-grow: 1;
}

.comment-id-line {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    padding-top: 5px;
}

.comment-id {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
}

.actions {
    margin-left: auto;
    display: flex;
    gap: 10px;
}

.comment-action {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>
