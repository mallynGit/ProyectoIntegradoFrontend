<template>
  <div class="footer row justify-end items-end" v-if="useUser().isLogged">
    <listado-usuarios
      v-if="openUserList"
      v-model="openUserList"
    />
    <div class="col-6 chat" v-if="openChat != null">
      <q-expansion-item
        dense
        class="conversation"
        :label="
          openChat.participantes.filter(
            (i) => i._id != useUser().getUser()._id
          )[0].nick
        "
        default-opened
      >
        <template v-slot:default>
          <div class="chat-content">
            <q-virtual-scroll
              :items="openChat.mensajes"
              class="scr"
              v-slot="{ item, index }"
              ref="scrollChat"
            >
              <q-item
                :class="`row wrap items-center justify${
                  transformUIDToNick(item.autor, openChat) ==
                  useUser().getUser().nick
                    ? '-start'
                    : '-end'
                }`"
              >
                <q-chat-message
                  :name="transformUIDToNick(item.autor, openChat)"
                  :text="[item.contenido]"
                  :sent="
                    transformUIDToNick(item.autor, openChat) !=
                    useUser().getUser().nick
                  "
                >
                  <template v-slot:stamp>
                    <span style="font-size: 11.5px">
                      {{
                        new Date(item.timestamp).toLocaleString("es-ES", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })
                      }}
                    </span>
                  </template>
                  <template v-slot:avatar>
                    <q-img
                      :src="`${apiUrl}/uploads/${item.autor}`"
                      ratio="1"
                      height="35px"
                      width="35px"
                      :class="`${
                        transformUIDToNick(item.autor, openChat) ==
                        useUser().getUser().nick
                          ? 'q-mr-md'
                          : 'q-ml-md'
                      }`"
                      style="min-width: 35px"
                    ></q-img>
                  </template>
                </q-chat-message>
              </q-item>
            </q-virtual-scroll>
            <q-separator />
            <div class="chat-input self-center">
              <form @submit.prevent="testeo">
                <q-input
                  type="text"
                  outlined
                  placeholder="Escribe mensaje"
                  dense
                  v-model="newMessage"
                  class="q-pb-xs"
                ></q-input>
              </form>
            </div>
          </div>
        </template>
      </q-expansion-item>
    </div>

    <div class="col-6 chats">
      <q-expansion-item
        class="text-h6"
        dense
        style="border: 1px solid salmon; background-color: aliceblue"
      >
        <template v-slot:header>
          <div class="justify-evenly">Chats</div>
        </template>

        <template v-slot:default>
          <div class="q-py-sm q-pl-sm q-pr-lg cvs">
            <q-list separator class="chat-list">
              <q-item
                clickable
                v-ripple
                v-for="v of useUserStore().chats"
                :key="v._id"
                @click="openChatGo(v._id)"
              >
                <q-item-section avatar>
                  <q-img
                    ratio="1"
                    width="50px"
                    :src="`${apiUrl}/uploads/${
                      v.participantes.filter(
                        (i) => i._id != useUser().getUser()._id
                      )[0]._id
                    }`"
                  />
                </q-item-section>

                <q-item-section
                  >{{
                    v.participantes.filter(
                      (i) => i._id != useUser().getUser()._id
                    )[0].nick
                  }}
                </q-item-section>

                <q-item-section side
                  >
                  <q-btn flat icon="mdi-download" style="z-index:1;" @click="downloadChat(v._id)"></q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-btn class="new-chat" color="green" @click="openUserList = true">
            <q-icon name="mdi-chat-plus"> </q-icon>
          </q-btn>
        </template>
      </q-expansion-item>
    </div>
  </div>
</template>

<script setup>
const apiUrl = useRuntimeConfig().public.urlApi;
import { ref } from "vue";
import io from "socket.io-client";

const socket = io(useRuntimeConfig().public.urlApi, {
  auth: { user: useUser().getUser()._id },
});

socket.on("connect", () => {
  console.log("Conectado");
});

socket.on("new msg", (data) => {
  console.log(data, "new msg");
  useUserStore()
    .chats.filter((c) => c._id == data.id)[0]
    .mensajes.push({
      autor: data.autor,
      contenido: data.content,
      timestamp: data.timestamp,
    });
  nextTick(() => {
    scrollChat.value.scrollTo(
      useUserStore().chats.filter((c) => c._id == openChat.value._id)[0]
        .mensajes.length
    );
  });
});

onBeforeMount(async () => {
  useUser()
    .getChats()
    .then((res) => {
      console.log(res, "chats");
      for (let v of res) {
        socket.emit("join", v._id);
      }
    });
});

async function downloadChat(id){
  useAxiosInstance().get('/chat/download?id='+id).then((res)=>{
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'chat.txt');
    document.body.appendChild(link);
    link.click();
  })
}

function openChatGo(item) {
  useUser()
    .getChats()
    .then(async (res) => {
      chats.value = res;
      console.log(res, " wtf");
      openChat.value = chats.value.filter((c) => c._id == item)[0];
    });
}

const openChat = ref(null);
const newMessage = ref("");
const chats = ref(useUserStore().chats);
const openUserList = ref(false);
const scrollChat = ref();



function transformUIDToNick(uid, chat) {
  return chat.participantes.filter((p) => p._id == uid)[0].nick;
}

async function testeo() {
  if (newMessage.value.trim() === "") return;
  await useUser().sendMessage({
    autor: useUser().getUser()._id,
    content: newMessage.value,
    id: openChat.value._id,
  });
  socket.emit("new msg", {
    autor: useUser().getUser()._id,
    content: newMessage.value,
    id: openChat.value._id,
  });

  newMessage.value = "";
}

watch(openChat, (old) => {
  console.log(openChat.value, "cambiante");
  if (openChat.value == null) {
    return;
  } else {
  }

  nextTick(() => {
    scrollChat.value.scrollTo(
      useUserStore().chats.filter((c) => c._id == openChat.value._id)[0]
        .mensajes.length
    );
  });
});
</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60%;
  max-height: 50%;
  // height: 100%;
  // border: 1px solid cyan;
  display: flex;
  pointer-events: none;

  .chat {
    position: relative;
    max-height: 100%;
    width: 60%;
    height: 100%;
    background-color: white;
    pointer-events: all;

    .conversation {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: 100%;
    }

    .chat-content {
      max-height: 42vh;
      // min-height: 42vh;
      max-width: 100%;
      text-wrap: wrap;

      .scr {
        min-height: 37.5vh;
        max-height: 37.5vh;
        height: 100%;
      }
    }
  }

  .chats {
    pointer-events: all;
    position: relative;
    max-height: 50vh;
    width: 40%;
    // overflow-y: scroll;
    height: 100%;
    // border: 1px solid goldenrod;
    // background-color: white;

    .chat-list {
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
