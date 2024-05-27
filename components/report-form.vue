<template>

    <q-dialog :model-value="modelValue" @update:model-value="(v) => $emit('update:modelValue', v)">

        <q-card class="report">
            <q-card-section>
                <div class="text-h6">Reportar</div>
            </q-card-section>
            <q-card-section>
                <q-input label="Motivo" v-model="motivo" type="textarea" autogrow input-style="min-height: 100px; max-height: 150px;"
                    filled>
                    <template v-slot:prepend>
                        <q-icon name="mdi-alert" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-actions class="row justify-evenly">
                <q-btn label="cancel" v-close-popup color="red" />
                <q-btn label="submit" @click="submitReport()" color="secondary" v-close-popup />
            </q-card-actions>
        </q-card>

    </q-dialog>

</template>

<script setup>

const props = defineProps({
    id: String,
    tipo: String,
    modelValue: Boolean
})

const motivo = ref('')

function submitReport() {
    let form = {
        reportedId: props.id,
        tipo: props.tipo,
        contenido: motivo.value
    }
    console.log(form, ' desde omponente !')
    useReportStore().createReport(form)

}

</script>

<style lang="scss" scoped>
@media (min-width: 600px) {
    .report {
        width: 40%;
        height: 36%;
    }
}

@media (max-width: 600px) {
    .report {
        width: 80%;
        height: 36%;
    }
}


//div.q-field__control-container textarea.q-field__native.q-placeholder
.motivo {
    min-height: 100px !important;
    height: 100px !important;
}
</style>