<template>

    <ReportForm :model-value="tryGo" @update:model-value="(v) => tryGo = v" 
        id="9ff70f88-d4c9-47d7-b059-7ab005f1035c"
        tipo="Comentario"
        />

    <div v-for="r of reportes">
        {{r}}
    </div>

    <q-btn label="test" @click="tryGo = true"></q-btn>

</template>

<script setup>

const reportes = (await useReportStore().getReports()).data

const tryGo = ref(false)

</script>


<style lang="scss" scoped></style>