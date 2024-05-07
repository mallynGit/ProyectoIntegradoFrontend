<template>
  <div>
    <q-select class="q-pa-md" v-model="sel" :options="options" label="select" style="width: 300px"
      @update:model-value="swapItems"></q-select>

    <test-listado :items="items" :mode="sel"></test-listado>
  </div>
</template>

<script setup>
import { useUser } from '~/composables/userComposable'
import { usePet } from '~/composables/petComposable'
definePageMeta({
  role: 'admin'
})

let items = ref([])
items.value = await useUser().findUsers()

async function swapItems() {
  switch (sel.value) {
    case 'users':
      items.value = await useUser().findUsers()
      break;
    case 'pets':
      items.value = await usePet().getPets()
      break;

    default:
      break;
  }
  console.log(items.value)
}

let sel = ref("users");
let options = ["pets", "users"];
</script>
