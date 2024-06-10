<template>
    <q-dialog>
    <div class="container-list">
        <span class="q-py-sm row justify-center title-listado">Listado: {{ mode }}</span>
        <q-separator />
        <template>
                <q-card class="container-input">
                    <q-card-section>
                        <span>hola</span>
                        <span v-for="(v, k) of item" :key="k">{{ k }}: {{ v }}</span>
                    </q-card-section>
                    <!-- <q-card-section v-for="(k, v) of filterFields(item)">
                        <q-input class="input" :label="v" :model-value="k" @change="(e) => updateInputValue(item, v, e)" />
                    </q-card-section> -->
                    <q-card-actions class="buttons">
                        <q-btn color="green" @click="updateItem(item)">Aplicar</q-btn>
                        <q-btn color="grey">Restablecer</q-btn>
                        <q-btn color="red" @click="deleteItem(item._id)">Eliminar</q-btn>
                    </q-card-actions>

                </q-card>
        </template>
    </div>
    </q-dialog>
</template>

<script setup>
import { useUser } from '~/composables/userComposable.js'
import { usePet } from '~/composables/petComposable.js'

let props = defineProps({
    item: Object,
    mode: String,
})

let l = useUser()

</script>

<style scoped lang="scss">
.container-list{
    border: 3px solid chocolate;
    padding: 1em;
    
}

.title-listado{
    font-size: 1.5em;
    text-decoration: underline;
    opacity: 0.7;
    font-weight: bold;
}

.container-input{
    background-color: #e9d6c47a;
}

.buttons{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    padding-bottom: 2em;
    gap: 1em;
}
</style>