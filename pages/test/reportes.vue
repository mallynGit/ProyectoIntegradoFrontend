<template>
    <div class="container">
        <div class="space"></div>
        <q-dialog v-model="dialogMotivo">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Motivo</div>
                </q-card-section>
                <q-card-section>
                    <q-input label="Motivo" v-model="motivo" type="textarea" autogrow
                        input-style="min-height: 100px; max-height: 150px;" filled readonly />
                </q-card-section>
            </q-card>
        </q-dialog>

        <report-item :report="selectedReport.report" v-model="showReportItem" :tipo="selectedReport.tipo"></report-item>


        <q-table class="table"  :rows="reportes"
            :rows-per-page-options="[10, 20, 0]">

            <template v-slot:header="props">
                <q-tr class="table-header">
                    <q-th class="th" v-for="col in filteredCols" :key="col.name" :props="props">{{
                        col.label }}</q-th>
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr class="table-body" :props="props">
                    <q-td class="td">{{ props.row.reportante.nick }}</q-td>
                    <q-td class="td"><q-btn class="ver" label="Ver" @click="showMotivo(props.row.contenido)" /></q-td>
                    <q-td class="td">{{ props.row.tipo }}</q-td>
                    <q-td class="td">{{ new Date(props.row.timestamp).toLocaleString('es-ES', {
                        timeZone:
                            'Europe/Madrid'
                    }) }}</q-td>
                    <q-td class="td"><q-btn class="ver" label="Ver"
                            @click="showItem(props.row, props.row.tipo)" /></q-td>
                    <q-td class="td text-center"><q-checkbox v-model="props.row.resuelto"
                            @click="updateResuelto(props.row._id)" color="secondary" /></q-td>
                </q-tr>
            </template>
        </q-table>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const reportes = ref((await useReportStore().getReports()).data);
const selectedReport = ref({ report: null, tipo: null });
const tryGo = ref(false);
const showReportItem = ref(false);
const dialogMotivo = ref(false)
const motivo = ref('')

function showMotivo(mot){
    dialogMotivo.value = true
    motivo.value = mot
}

async function updateResuelto(index) {
    console.log(index)

}

const cols = [
    { name: 'reportante', label: 'Reportante' },
    { name: 'contenido', label: 'Motivo' },
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

<style lang="scss" scoped>
.container {
    height: 93vh;
}

.space {
    height: 50px;
}

.table {
    width: 80%;
    margin: auto;
}



.table-header {
    background-color: $secondary;
    color: whitesmoke;

    .th {
        font-size: 1.5em;
        padding-left: 2em;

        // text-align: center;    
    }
}

.table-body .td {
    padding-left: 2.3em;
    font-size: 1.1em;
}

.table-body .td .ver {
    background-color: $secondary;
    color: whitesmoke;
    border-radius: 5px;
    font-size: 1em;
}
</style>