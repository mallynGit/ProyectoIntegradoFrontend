<template>
    <q-dialog :model-value="modelValue" @update:model-value="(v) => $emit('update:modelValue', v)">
        <q-card class="card">
            <div v-show="fullscreen.show == false" class="img-container">
                <q-img width="18%" class="q-my-sm" v-for="(m, index) of media" ratio=1 :key="index" :src="m"
                    @click="fullscreenImage(m)" />
            </div>

        </q-card>
    </q-dialog>

    <q-dialog v-model="fullscreen.show" persistent>
        <q-card class="fullImage">
            <div class="q-pa-sm">
                <q-btn class="return" icon="mdi-arrow-left" @click="closeFullscreen()"></q-btn>
                <q-img :src="fullscreen.img" height="80vh" fit="contain"></q-img>
            </div>
        </q-card>
    </q-dialog>

</template>


<script setup>
const props = defineProps({
    media: Array,
    popup: Boolean,
    modelValue: Boolean,
})
const fullscreen = ref({
    show: false,
    img: ''
})

function fullscreenImage(img) {
    fullscreen.value.show = true
    fullscreen.value.img = img
}

function closeFullscreen() {
    fullscreen.value.show = false
}

</script>


<style scoped lang="scss">
.card {
    width: 50vw;
    max-width: 100vh;
}

.img-container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.fullImage {
    max-width: 100vw;
    width: 50vw;
}

.return {
    position: absolute;
    top: 1.5%;
    right: 1.5%;
    z-index: 1;
    background-color: white;
}
</style>