<template>
  <div>
    <q-select class="q-pa-md" v-model="sel" :options="options" label="select" style="width: 300px"></q-select>
    <div class="q-pa-md" style="border: 1px solid turquoise; display: inline-block; height: 90%">
      gdf
    </div>
    <div style="border: 3px double black">
      <template v-for="(user, index) of users">
        <q-separator v-if="index > 0"></q-separator>

        <q-expansion-item :label="user.email">
          <q-separator />
          <q-card>
            <q-card-section v-for="(k, v) of filterFields(user)">
              <div>{{ v }}: {{ k }} </div>
            </q-card-section>
            <q-card-actions>
              <q-btn color="green">Aplicar</q-btn>
              <q-btn color="grey">Restablecer</q-btn>
              <q-btn color="red" @click="deleteUser(user._id)">Eliminar</q-btn>
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
const { $axios } = useNuxtApp();
import { useUser } from '~/composables/userComposable.js'
let l = useUser()

let users = ref([]);

users.value = await l.findUsers()

function filterFields(item) {
  if (item._id) {
    let filtered = (({ _id, ...item }) => item)(item)
    return filtered
  }
}

async function deleteUser(id) {
  let deleted = await l.deleteUser(id)
  users.value = await l.findUsers()

  return alert(JSON.stringify(deleted))
}

let sel = ref("hola");
let options = ["hola", "mundo"];
</script>
