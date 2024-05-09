<template>

    <q-dialog v-model="open">
        <q-card>
            <div  v-for="m of media">
                Imagen:
                <img :src="m" />
            </div>
        </q-card>
    </q-dialog>

</template>


<script setup>
const props = defineProps({
    media: Array,
    popup: Boolean
})
const open = ref(props.popup)

</script>


<style scoped lang="scss"></style>