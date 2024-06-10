<template>
  <q-dialog v-model="showPets">
    <q-card class="pets">
      <q-card-section class="justify-center row">
        <pet-card
          v-if="selectedUserPets.length != 0"
          v-for="pet of selectedUserPets"
          :key="pet._id"
          :pet="pet"
        />
        <div v-else>No tiene pets</div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="editUser">
    <q-card style="width: 400px">
      <q-card-section>
        <!-- <span v-for="(v, k) of selectedUser" :key="k">{{ k }}: {{ v }}</span> -->
      </q-card-section>
      <q-card-section>
        <q-input
          class="input"
          label="Nick"
          v-model="selectedUser.nick"
        />

        <q-input
          class="input"
          label="Nombre"
          v-model="selectedUser.nombre"
        />

        <q-input
          class="input"
          label="Apellidos"
          v-model="selectedUser.apellidos"
        />

        <q-select
          class="input"
          label="Rol"
          v-model="selectedUser.role"
          :options="['ADMIN', 'USER']"
        />

        <q-checkbox
          class="input"
          label="Bloqueado"
          v-model="selectedUser.bloqueado"
          color="primary"
        />
      </q-card-section>
      <q-card-actions class="buttons">
        <q-btn color="green" @click="updateItem(selectedUser)">Aplicar</q-btn>
        <q-btn color="red" @click="deleteItem(selectedUser._id)"
          >Eliminar</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div class="container">
    <div class="space"></div>
    
    <div class="table-container">
      

      <q-table class="table" :rows="items">
        <template v-slot:header="props">
          <q-tr class="table-header" :props="props">
            <q-td
              v-for="col in sel == 'users' ? userCols : petCols"
              :key="col.name"
              >{{ col.label }}</q-td
            >
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props" class="table-body">
            <q-td>{{ props.row.nick }}</q-td>
            <q-td>{{ props.row.nombre }}</q-td>
            <q-td>{{ props.row.apellidos }}</q-td>
            <q-td>{{ props.row.email }}</q-td>
            <q-td> {{ props.row.role }} </q-td>
            <q-td
              ><q-btn class="ver" label="Ver" @click="openPets(props.row)"
            /></q-td>
            <q-td><q-checkbox v-model="props.row.bloqueado"></q-checkbox></q-td>
            <q-td
              ><q-btn label="Editar" @click="editarUsuario(props.row)"></q-btn
            ></q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUser } from "~/composables/userComposable";
import { usePet } from "~/composables/petComposable";

definePageMeta({
  role: "admin",
});

let items = ref([]);
let sel = ref("users");
let options = ["pets", "users"];
const showPets = ref(false);
const selectedUserPets = ref([]);
const editUser = ref(false);
const selectedUser = ref(null);

async function fetchUsers() {
  items.value = await useUser().findUsers();
}

async function deleteItem(id) {
  let deleted = await l.deleteUser(id);
  items.value = await l.findUsers();

  return alert(JSON.stringify(deleted));
}

async function updateItem(item) {
  items.value[items.value.findIndex((x) => x._id === item._id)] = item;
  useUser().update(item);
}

async function editarUsuario(user) {
  console.log(user, "user");
  selectedUser.value = JSON.parse(JSON.stringify(user));
  console.log(selectedUser.value, "selectedUser");
  editUser.value = true;
}

watch(editUser, (x) => {
  if (!x) {
    selectedUser.value = null;
  }
});

async function openPets(user) {
  usePet()
    .getUserPets(user._id)
    .then((x) => {
      selectedUserPets.value = x;
    });
  showPets.value = true;
}


async function fetchPets() {
  items.value = await usePet().getPets();
}

async function swapItems() {
  if (sel.value === "users") {
    await fetchUsers();
  } else if (sel.value === "pets") {
    await fetchPets();
  }
}

const userCols = [
  { name: "nick", label: "Nick" },
  { name: "nombre", label: "Nombre" },
  { name: "apellidos", label: "Apellidos" },
  { name: "email", label: "Email" },
  { name: "rol", label: "Rol" },
  { name: "pets", label: "Pets" },
  { name: "bloqueado", label: "Bloqueado" },
];

onMounted(async () => {
  await fetchUsers();
  console.log("users", items.value);
});
</script>

<style scoped lang="scss">
.container {
  height: 93vh;
}

.space {
  height: 50px;
}

.select {
  font-size: 1.5em;
}

.table-container {
  width: 80%;
  margin: auto;
  background-color: aliceblue;
}

.lista {
  background-color: #e99d55;
  font-size: 1.2em;
  font-weight: bold;
  padding: 1em;
  border-radius: 10px;
}
</style>
