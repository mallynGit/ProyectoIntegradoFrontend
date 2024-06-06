<template>
    <div class="container">
        <div v-if="loading">
            <q-spinner color="primary" size="3em" />
            spinner wooo
        </div>
        <div v-if="!loading">
            <div>
                <h4><strong>Editar perfil</strong></h4>
            </div>

            <div>            
                <div class="datos-perfil" v-for="(prop, index) of filterFields" v-if="!editing">
                    <p>{{ index }}: {{ prop }}</p>
                    <br />
                </div>
                <div>
                    <q-btn class="button" @click="editing = true" v-if="!editing">Editar</q-btn>
                </div>

                <div v-if="editing">
                    <q-input v-for="(prop, index) of userClone" :label="index" v-model="userClone[index]" />
                    <q-btn class="button" label="aplicar" @click="updateProfile()" />
                    <q-btn class="button" label="cancelar" @click="editing = false" />
                </div>
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


<style lang="scss" scoped>
.container{
    background-color: rgba(231, 145, 83, 0.205);
    width: fit-content;
    margin: 5em auto 0 auto;
    padding: 2em;
    border: 2px solid rgb(211, 128, 3);
    box-shadow: 3px 1px 10px 3px rgba(255, 180, 17, 0.616);
}

h4{
    text-decoration: underline;
    opacity: 0.8;
    text-align: center;
}

.datos-perfil{
    p{
        font-size: 1.5em;
        padding: 0;
        margin: 0;
    }
}

.button{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 1em auto;
    background-color: chocolate;
    color: whitesmoke;
}
</style>