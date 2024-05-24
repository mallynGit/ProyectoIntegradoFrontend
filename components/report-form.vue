<template>

    <q-dialog :model-value="modelValue" @update:model-value="(v) => $emit('update:modelValue', v)">

        <q-card>
            <q-card-section>
                <div class="text-h6">Reportar</div>
            </q-card-section>
            <q-card-section>
                <q-input label="Motivo" v-model="motivo">
                    <template v-slot:prepend>
                        <q-icon name="mdi-alert" />
                    </template>
                </q-input>
                <q-btn label="cancel" v-close-popup color="red" />
                <q-btn label="submit" @click="submitReport()" color="secondary" v-close-popup />
            </q-card-section>
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

<style lang="scss" scoped></style>