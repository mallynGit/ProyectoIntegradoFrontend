<template>
    <div style="border: 3px double black">
        <span class="text-h5 q-py-sm row justify-center">Listado: {{ mode }}</span>
        <q-separator />
        <template v-for="(item, index) of items">
            <q-separator v-if="index > 0"></q-separator>
            <q-expansion-item :label="mode == 'users' ? item.email : mode == 'pets' ? item.raza : ''">
                <q-separator />
                <q-card>
                    <q-card-section v-for="(k, v) of filterFields(item)">
                        <q-input :label="v" :model-value="k" @change="(e) => updateInputValue(item, v, e)" />
                    </q-card-section>
                    <q-card-actions>
                        <q-btn color="green" @click="updateItem(item)">Aplicar</q-btn>
                        <q-btn color="grey">Restablecer</q-btn>
                        <q-btn color="red" @click="deleteItem(item._id)">Eliminar</q-btn>
                    </q-card-actions>

                </q-card>
            </q-expansion-item>
        </template>
    </div>
</template>

<script setup>
import { useUser } from '~/composables/userComposable.js'
import { usePet } from '~/composables/petComposable.js'

let props = defineProps({
    items: Array,
    mode: String,
})

let l = useUser()


function updateInputValue(item, propName, value) {
    item[propName] = value
    console.log(item, propName, value)
}

function filterFields(item) {
    if (item._id) {
        let filtered = (({ _id, ...item }) => item)(item)
        return filtered
    }
}

async function deleteItem(id) {
    let deleted = await l.deleteUser(id)
    items.value = await l.findUsers()

    return alert(JSON.stringify(deleted))
}

async function updateItem(item) {
    let store
    switch (props.mode) {
        case 'users':
            store = useUser()
            break;
        case 'pets':
            store = usePet()
            break;
        default:
            break;
    }
    store.update(item)
    console.log(store)

}

</script>
