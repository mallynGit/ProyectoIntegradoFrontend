<template>
    <q-dialog>
        <q-card class="item">
            <q-card-section>
                <span v-for="(k, v) of report" :key="v">{{ v }}: {{ k }} <br /></span>
                <h3>{{ tipo }}</h3>
            </q-card-section>
        </q-card>
    </q-dialog>

</template>

<script setup>


const props = defineProps({
    report: Object,
    tipo: String,
})

</script>

<style scoped lang="scss">
.item {
    max-width: 80%;
    width: 80%;
    height: 100%;
    max-height: 90%;
}
</style>