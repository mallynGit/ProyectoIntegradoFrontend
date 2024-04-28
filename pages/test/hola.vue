<template>
  <div>
    <q-select
      class="q-pa-md"
      v-model="sel"
      :options="options"
      label="select"
      style="width: 300px"
    ></q-select>
    <div
      class="q-pa-md"
      style="border: 1px solid turquoise; display: inline-block; height: 90%"
    >
      gdf
    </div>

    <q-card v-for="user of users">
      <div>
        <q-card-section v-for="(k, v) of user"
          >{{ v }}: {{ k }},
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>

<script setup>
const { $axios } = useNuxtApp();
let users = ref([]);

$axios.get("/user/find").then((res) => {
  users.value = res.data;
});

//vale

let sel = ref("hola");
let options = ["hola", "mundo"];
</script>
