<template>

    <div>
        <q-select class="q-pa-md" v-model="sel" :options="options" label="select" style="width:300px;"></q-select>
        <div class="q-pa-md" style="border: 1px solid turquoise; display: inline-block;  height: 90%">gdf</div>
    </div>




</template>

<script setup>

let sel = ref("hola")
let options = ["hola", "mundo"]

</script>
