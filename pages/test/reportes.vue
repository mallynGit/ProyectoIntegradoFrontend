<template>
    <report-item :report="selectedReport.report" v-model="showReportItem" :tipo="selectedReport.tipo"></report-item>
    <ReportForm :model-value="tryGo" @update:model-value="(v) => tryGo = v" id="9ff70f88-d4c9-47d7-b059-7ab005f1035c"
        tipo="Comentario" />

    <q-table :title="`reportes: ${reportes.length}`" :rows="reportes" :rows-per-page-options="[10, 20, 0]">

        <template v-slot:header="props">
            <q-tr>
                <q-th v-for="col in filteredCols" :key="col.name" :props="props" style="text-align: center;">{{
                    col.label }}</q-th>
            </q-tr>
        </template>

        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td>{{ props.row.reportante.nick }}</q-td>
                <q-td>{{ props.row.contenido }}</q-td>
                <q-td>{{ props.row.reportedId }}</q-td>
                <q-td>{{ props.row.tipo }}</q-td>
                <q-td>{{ new Date(props.row.timestamp).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }) }}</q-td>
                <q-td><q-btn label="Ver" @click="showItem(props.row, props.row.tipo)" /></q-td>
                <q-td><q-checkbox v-model="props.row.resuelto" @click="updateResuelto(props.row._id)" color="purple" /></q-td>
            </q-tr>
        </template>
    </q-table>

    <q-btn label="test" @click="tryGo = true"></q-btn>
</template>

<script setup>
import { ref } from 'vue';

const reportes = ref((await useReportStore().getReports()).data);
const selectedReport = ref({ report: null, tipo: null });
const tryGo = ref(false);
const showReportItem = ref(false);

async function updateResuelto(index) {
    console.log(index)

}

const cols = [
    { name: 'reportante', label: 'Reportante' },
    { name: 'contenido', label: 'Motivo' },
    { name: 'reportedId', label: 'ID Reportado' },
    { name: 'tipo', label: 'Tipo' },
    { name: 'timestamp', label: 'Fecha y Hora' },
    { name: 'item', label: 'Item' },
    { name: 'resuelto', label: 'Resuelto' }
];

const filteredCols = cols.filter(col => col.name !== '_id');

async function showItem(item, tipo) {
    selectedReport.value.tipo = tipo;
    if (tipo != 'Mascota') {
        selectedReport.value.report = item.item;

    } else {
        let mascota = await usePet().getPetById(item.reportedId);
        delete mascota.comentarios
        selectedReport.value.report = mascota
    }
    showReportItem.value = true;
}
</script>

<style lang="scss" scoped></style>