<template>
  <div>
    <q-select class="q-pa-md" v-model="sel" :options="options" label="select" style="width: 300px"></q-select>
    <div class="q-pa-md" style="border: 1px solid turquoise; display: inline-block; height: 90%">
      gdf
    </div>
    <div style="border: 3px double black">
      <template v-for="(item, index) of items">
        <q-separator v-if="index > 0"></q-separator>

        <q-expansion-item :label="item.email">
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
  </div>
</template>

<script setup>
definePageMeta({
  role: 'admin'
})
import { useUser } from '~/composables/userComposable.js'
let l = useUser()

let items = ref([]);

items.value = await l.findUsers()

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
  console.log(item)

}

let sel = ref("hola");
let options = ["hola", "mundo"];
</script>
