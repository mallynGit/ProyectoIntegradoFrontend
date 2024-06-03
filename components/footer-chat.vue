<template>
  <div class="footer row justify-end">

    <div class="q-pa-sm col-6 chat" v-if="openChat != null">
      <q-expansion-item class="conversation" :label="'Chat ' + openChat" default-opened>
        <template v-slot:header>
          <div class="chat-header">
            Chat {{ openChat.id }}
          </div>
        </template>

        <template v-slot:default>
          <div class="chat-content">
            <q-virtual-scroll :items="openChat.msg" class="q-pa-sm scr" v-slot="{ item, index }">

              <q-chat-message :name="item.autor" :text="[item.content]" :sent="item.autor == 'admin'"></q-chat-message>

            </q-virtual-scroll>
            <q-separator />
            <div class="chat-input self-center ">
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
            <q-list separator style="border: 1px solid red; max-height: 40vh; overflow-y: scroll; width: 100%;">
              <q-item clickable v-ripple v-for="v of chats" :key="v.id" @click="openChat = v">Chat {{ v.id }}</q-item>
            </q-list>
          </div>

          <q-btn class="new-chat" style="background-color: green;">
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

const items = ref([
  { autor: 'admin', content: 'Mensaje 1' },
  { autor: 'miguel', content: 'Mensaje 2' },
  { autor: 'admin', content: 'Mensaje 33132121212131312312313131312332132131' },
  { autor: 'miguel', content: 'Mensaje 4' },
  { autor: 'miguel', content: 'Mensaje 5' },
  { autor: 'miguel', content: 'Mensaje 6' },
  { autor: 'admin', content: 'Mensaje 7' },
  { autor: 'admin', content: 'Mensaje 8' }
]);

const socket = new WebSocket('ws://localhost:4000');
const openChat = ref(null);
const newMessage = ref('')
const sockets = ref([])
const chats = ref({
  'e326': {
    id: 'e326', msg: [
      { autor: 'admin', content: 'Hola' },
      { autor: 'miguel', content: 'Hola' },
      { autor: 'admin', content: 'Adios' },
    ]
  },
  'a980': {
    id: 'a980', msg: [
      { autor: 'admin', content: '123' },
      { autor: 'miguel', content: '321' },
      { autor: 'admin', content: '456' },
    ]
  }
})



function testeo() {
  console.log(chats.value, openChat.value.id, chats[openChat.value.id], chats.value)
  // chats.value[openChat.value.id].msg.push({ autor: 'admin', content: newMessage.value })
  // socket.send(JSON.stringify({ autor: 'admin', content: newMessage.value }))
  sockets.value[openChat.value.id].send(JSON.stringify({ autor: 'admin', content: newMessage.value, id: openChat.value.id }))
  newMessage.value = ''

  console.log('vien', sockets.value, openChat.value, chats.value)
}

socket.onopen = () => {
  console.log('Conectado');
};

watch(openChat, (x) => {
  if (openChat.value == null) {
    return;
  } else {
    if (!sockets.value[openChat.value.id]) {
      let newSocket = new WebSocket('ws://localhost:4000', openChat.value.id);
      
      newSocket.onopen = () => {
        newSocket.send(JSON.stringify({ id: openChat.value.id }))
      }
      newSocket.onmessage = (e) => {
        console.log(e.data, 'epa!!');
        let data = JSON.parse(e.data)
        chats.value[data.id].msg.push(data)
        // openChat.value.msg.push(JSON.parse(e.data))
      }

      sockets.value[openChat.value.id] = newSocket
    }
  }
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
        // min-height: 37.5vh;
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

    .cvs {
      max-height: 42vh;
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
