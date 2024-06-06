<template>
    <q-dialog :model-value="modelValue" @update:model-value="(v) => $emit('update:modelValue', v)">
        <q-card class="card">
            <div v-show="fullscreen.show == false" class="img-container">
                <q-img width="18%" class="q-my-sm" v-for="(m, index) of media" ratio=1 :key="index"
                    :src="apiUrl + '/uploads/' + m" alt="hola" @click="fullscreenImage(index)" />
            </div>

        </q-card>
    </q-dialog>

    <q-dialog v-model="fullscreen.show" persistent>
        <q-card class="fullImage">
            <div class="q-pa-sm">
                <q-btn class="return" icon="mdi-arrow-left" @click="closeFullscreen()"></q-btn>
                <q-img :src="apiUrl + '/uploads/' + media[fullscreen.img]" height="80vh" fit="contain"></q-img>
                <q-btn round class="q-ml-md absolute-left carousel" icon="mdi-arrow-left"
                    @click="fullscreen.img = fullscreen.img - 1" ref="prevImg" v-if="fullscreen.img != 0" />
                <q-btn round class="q-mr-md absolute-right carousel" icon="mdi-arrow-right" ref="nextImg"
                    @click="fullscreen.img = fullscreen.img + 1" v-if="fullscreen.img != media.length - 1" />
            </div>
        </q-card>
    </q-dialog>

</template>


<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  media: Array,
  popup: Boolean,
  modelValue: Boolean,
});
const apiUrl = useRuntimeConfig().public.urlApi;

const fullscreen = ref({
  show: false,
  img: '',
});

watch(props.media, () => {
  console.log(props.media, ' bin');
});

function fullscreenImage(img) {
  fullscreen.value.show = true;
  fullscreen.value.img = img;
  addKeyListeners();
}

function closeFullscreen() {
  fullscreen.value.show = false;
  removeKeyListeners();
}

function handleKeyPress(event) {
  if (fullscreen.value.show) {
    if (event.key === 'ArrowLeft' && fullscreen.value.img > 0) {
      fullscreen.value.img -= 1;
    } else if (event.key === 'ArrowRight' && fullscreen.value.img < props.media.length - 1) {
      fullscreen.value.img += 1;
    } else if (event.key === 'Escape') {
      closeFullscreen();
    }
  }
}

function addKeyListeners() {
  window.addEventListener('keydown', handleKeyPress);
}

function removeKeyListeners() {
  window.removeEventListener('keydown', handleKeyPress);
}

onBeforeUnmount(() => {
  removeKeyListeners();
});

</script>



<style scoped lang="scss">
.carousel {
    max-height: 50px;
    width: 50px;
    top: 45%;
    z-index: 2;
    background-color: white;
}

.card {
    width: 100vw;
    max-width: 120vh;
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