<template>
    <q-dialog>
        <q-card class="item dialog">

            <q-card-section v-if="tipo == 'Mascota'">
                <div>
                    <pet-profile :pet="report" report="true" />
                </div>
            </q-card-section>

            <q-card-section v-else>
                <h4>{{ tipo }}</h4>
                <p v-for="(k, v) of report" :key="v">{{ v }}: {{ k }} <br /></p>
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
.dialog {
    background-color: #e9c9ab;
    outline: 3px solid whitesmoke;
}

.item {
    max-width: 80%;
    min-width: 80%;
    width: 80%;
    height: 100%;
    max-height: 90%;
}

h4 {
    text-align: center;
    text-decoration: underline;
}

p {
    font-size: 1.5em;
    text-align: center;
}
</style>