<template>
  <div class="container">
    <q-select class="q-pa-md select" v-model="sel" :options="options" label="select" style="width: 300px"
      @update:model-value="swapItems"></q-select>

    <test-listado class="lista" :items="items" :mode="sel"></test-listado>
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

<style scoped lang="scss">
.container{
  width: 80%;
  margin: 5em auto 0 auto;
  padding-bottom: 3em;
}

.lista{
  background-color: #e99d55;
  font-size: 1.2em;
  font-weight: bold;
}

.select{
  font-size: 1.5em;
  border-bottom: chocolate 3px solid;
  margin-bottom: 3em;
  padding: 0 1em;

}

</style>