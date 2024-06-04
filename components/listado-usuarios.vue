<template>

    <q-dialog>
        <q-card>

            <q-card-section>
                <q-input label="buscar por nombre" v-model="search"></q-input>
            </q-card-section>

            <q-list separator>
                <q-item v-for="u of filteredUsers" :key="u._id" clickable ripple :disable="isUserInChat(u._id)"
                    @click="startChat(u._id)" v-close-popup>
                    <q-item-section avatar>
                        <q-img ratio="1" :src="`http://localhost:3001/uploads/${u._id}`" />
                    </q-item-section>

                    <q-item-section>
                        {{ u.nick }}
                    </q-item-section>

                </q-item>
            </q-list>
        </q-card>
    </q-dialog>

</template>

<script setup>

const props = defineProps({
    open: Boolean,
})

const emits = defineEmits(['opened'])

const isUserInChat = (userId) => {
    return useUserStore().chats?.some(chat => chat.participantes.some(p => p._id == userId));
};

const search = ref('')

const usuarios = await useUser().findUsers()
const filteredUsers = computed(() => {
    let fil = usuarios.filter(i => i._id != useUser().getUser()._id)
    fil = fil.filter(i => i.nick.toLowerCase().includes(search.value.toLowerCase()))
    return fil
})

const startChat = async (userId) => {
    useUser().createChat(userId).then(async res => {
        console.log(await useUser().getChats(), 'WTF')
        console.log(res, 'creado chat!')
        console.log(useUserStore().chats, 'CAGO EN LA PUTA')
        emits('opened', res._id)
    })
    
}

watch(search, (x) => {
    console.log(search.value)
})

onMounted(() => {
    console.log(usuarios, ' vamos vien dolo')
})

</script>