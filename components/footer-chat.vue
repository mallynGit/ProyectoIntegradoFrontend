<template>
  <div class="footer row justify-end items-end">
    <listado-usuarios v-if="openUserList" v-model="openUserList" @update:model-value="(e) => r(e)"
      @opened="(e) => r(e)" />
    <div class="q-pa-sm col-6 chat" v-if="openChat != null">
      <q-expansion-item class="conversation" :label="'Chat ' + openChat" default-opened>
        <template v-slot:header>
          <div class="chat-header">
            {{ openChat.participantes.filter(i => i._id != useUser().getUser()._id)[0].nick }}
          </div>
        </template>

        <template v-slot:default>
          <div class="chat-content">
            <q-virtual-scroll :items="openChat.mensajes" class="scr" v-slot="{ item, index }" ref="scrollChat">

              <q-item
                :class="`row no-wrap items-center justify${transformUIDToNick(item.autor, openChat) == useUser().getUser().nick ? '-end' : '-start'}`">
                <q-chat-message :name="transformUIDToNick(item.autor, openChat)" :text="[item.contenido]"
                  :sent="transformUIDToNick(item.autor, openChat) == useUser().getUser().nick">
                  <template v-slot:avatar>
                    <q-img :src="`http://localhost:3001/uploads/${item.autor}`" ratio="1" height="35px" width="35px"
                      :class="`q-m${transformUIDToNick(item.autor, openChat) == useUser().getUser().nick ? 'l' : 'r'}-md`
                        "></q-img>
                  </template>
                </q-chat-message>
              </q-item>




            </q-virtual-scroll>
            <q-separator />
            <div class="chat-input self-center">
              <form @submit.prevent="testeo">
                <q-input type="text" placeholder="Escribe mensaje" dense v-model="newMessage"></q-input>
              </form>
            </div>

          </div>
        </template>

      </q-expansion-item>
    </div>

    <div class="q-pa-sm col-6 chats">
      <q-expansion-item class="text-h6" style="border: 1px solid salmon">

        <template v-slot:header>
          <div class="justify-evenly">
            Chats
          </div>
        </template>

        <template v-slot:default>
          <div class="q-py-sm q-pl-sm q-pr-lg cvs">
            <q-list separator class="chat-list">
              <q-item clickable v-ripple v-for="v of useUserStore().chats" :key="v._id" @click="openChat = v">

                <q-item-section avatar>
                  <q-img ratio="1" width="50px"
                    :src="`http://localhost:3001/uploads/${v.participantes.filter(i => i._id != useUser().getUser()._id)[0]._id}`" />
                </q-item-section>

                <q-item-section>{{
                  v.participantes.filter(i => i._id != useUser().getUser()._id)[0].nick }}</q-item-section>

              </q-item>
            </q-list>
          </div>

          <q-btn class="new-chat" color="green" @click="openUserList = true">
            <q-icon name="mdi-chat-plus">

            </q-icon>
          </q-btn>

        </template>



      </q-expansion-item>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const retrieved = await useUser().getChats()


onMounted(() => {
  console.log(useUserStore().chats, 'ibiien joder')
})


const socket = new WebSocket('ws://localhost:4000');
const openChat = ref(null);
const newMessage = ref('')
const sockets = ref([])
const chats = ref(useUserStore().chats)
const openUserList = ref(false)
const scrollChat = ref()

function loguear(e){
  console.log(' QUE MIERDAS PASA')
  console.log('que cojones pasa tio', useUserStore().chats, useUserStore().chats.filter(c => c._id == e)[0], 'veamos a puto ver')
}

function r(e) {
  console.log('que cojones pasa tio', useUserStore().chats, useUserStore().chats.filter(c => c._id == e)[0], 'veamos a puto ver')
  loguear(e)
  // useUser().getChats().then((res) => {
  //   // openChat.value = useUserStore().chats.filter(c => c._id == e)[0]
  //   console.log(openChat.value, useUserStore().chats, res, ' veamos a puto ver')
  // })

}

function transformUIDToNick(uid, chat) {
  return chat.participantes.filter(p => p._id == uid)[0].nick
}

async function testeo() {
  console.log(chats.value, openChat.value._id, chats[openChat.value.id], chats.value)
  // openChat.value.mensajes.push({ autor: useUser().getUser()._id, contenido: newMessage.value })
  await useUser().sendMessage({ autor: useUser().getUser()._id, content: newMessage.value, id: openChat.value._id })
  // chats.value[openChat.value.id].msg.push({ autor: 'admin', content: newMessage.value })
  // socket.send(JSON.stringify({ autor: 'admin', content: newMessage.value }))
  // sockets.value[openChat.value.id].send(JSON.stringify({ autor: 'admin', content: newMessage.value, id: openChat.value.id }))
  newMessage.value = ''

  console.log('vien', sockets.value, openChat.value, chats.value)
}

socket.onopen = () => {
  console.log('Conectado');
};

watch(openChat, (old) => {
  console.log(openChat.value, 'cambiante')
  if (openChat.value == null) {
    return;
  } else {

    if (!sockets.value[openChat.value._id]) {
      let newSocket = new WebSocket('ws://localhost:4000', openChat.value._id);

      newSocket.onopen = () => {
        newSocket.send(JSON.stringify({ id: openChat.value._id }))
      }

      newSocket.onmessage = async (e) => {
        let data = JSON.parse(e.data);
        useUserStore().chats.filter(c => c._id == data.id)[0].mensajes.push({ autor: data.autor, contenido: data.content })


      };


      sockets.value[openChat.value._id] = newSocket
    }
  }
  nextTick(() => {
    scrollChat.value.scrollTo(useUserStore().chats.filter(c => c._id == openChat.value._id)[0].mensajes.length)
  })
})



socket.onmessage = (e) => {
  console.log(e.data);
}






</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 625px;
  max-height: 50%;
  // height: 100%;
  // border: 1px solid cyan;
  display: flex;
  background-color: white;

  .chat {
    position: relative;
    max-height: 100%;
    height: 100%;
    border: 1px solid goldenrod;

    .conversation {
      border: 1px solid greenyellow;
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: 100%;
    }

    .chat-header {
      position: sticky;
      top: 0;
      // background: white;
      border-bottom: 1px solid blue;
      z-index: 1;
      padding: 0.5rem;
    }

    .chat-content {

      max-height: 42vh;
      // min-height: 42vh;

      border: 1px solid red;

      .scr {
        min-height: 37.5vh;
        max-height: 37.5vh;
        height: 100%;
      }

    }

  }

  .chats {
    position: relative;
    max-height: 50vh;
    // overflow-y: scroll;
    height: 100%;
    // border: 1px solid goldenrod;

    .chat-list {
      border: 1px solid red;
      max-height: 40vh;
      min-height: 40vh;
      overflow-y: auto;
      width: 100%;
    }

    .cvs {
      max-height: 42vh;
      min-height: 42vh;

      width: 100%;
    }

    .new-chat {
      position: absolute;
      right: 0;
      bottom: 0;
      margin: 0.5rem;
    }

  }
}
</style>
