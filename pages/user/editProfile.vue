<template>

    <div v-if="loading">
        <q-spinner color="primary" size="3em" />
        spinner wooo
    </div>

    <div v-if="!loading">

        <div>
            <span class="text-h6">editar perfil que guayy</span>
        </div>

        <div>
            <q-btn @click="editing = true" v-if="!editing">Editar</q-btn>

            <div v-for="(prop, index) of filterFields" v-if="!editing">
                <span>{{ index }}: {{ prop }}</span>
                <br />
            </div>

            <div v-if="editing">
                <q-input v-for="(prop, index) of userClone" :label="index" v-model="userClone[index]" />
                <q-btn label="aplicar" @click="updateProfile()" />
                <q-btn label="cancelar" @click="editing = false" />
            </div>

        </div>

    </div>



</template>


<script setup>
const user = ref(null);
const userClone = ref(null)
const editing = ref(false)
const loading = ref(true)

useUser().retrieveUser().then((res) => {
    userClone.value = JSON.parse(JSON.stringify(res))
    loading.value = false
});


function filterId(item) {
    return (({ _id, ...item }) => item)(item)
}

let filterFields = computed(() => {
    const item = useUser().getUser()
    return (({ pets, posts, role, _id, ...item }) => item)(item);
});

async function updateProfile() {
    // userClone.value = JSON.parse(JSON.stringify(useUser().getUser()))
    const form = {
        ...userClone.value
    }
    editing.value = false
    console.log(form)
    let res = await useUser().update(form)
    console.log(res, 'nice!!!@!!!1!')
    userClone.value = res

}

watch(editing, (x) => {
    if (editing.value == true) {
        console.log('___!_)_)_!)_')
        userClone.value = JSON.parse(JSON.stringify(filterFields.value))
    }
})


</script>


<style lang="scss" scoped></style>