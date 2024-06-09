import { defineStore } from "pinia";
import { useAxiosInstance } from "~/utils/axiosInstance.js";
import { duplicate } from "~/utils/duplicateMedia";
import axios from "axios";
const env = useRuntimeConfig().public;

export const usePetStore = defineStore("pet", {
  state: () => ({
    pets: [],
  }),
  actions: {
    async getPets() {
      let pets = (await useAxiosInstance().get("/pets/getAll")).data;

      this.pets = pets;
      return pets;
    },

    async getUserPets(id) {
      return (await useAxiosInstance().get("/user/getUserPets/" + id)).data;
    },

    async getPetById(id) {
      let pet = (await useAxiosInstance().get("/pets/get/" + id)).data[0];

      return pet;
    },

    async createPet(form) {
      useAxiosInstance()
        .post("/pets/createPet", form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (env.environment == "development") {
            duplicate(form, res.data.foto_perfil);
          }
        });
    },

    async uploadPicture(file, id){
      let formD= new FormData();
      formD.append("media", file);
      formD.append("petId", id)
      return await useAxiosInstance().post('/pets/uploadPicture', formD, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    },

    async createPost(form) {
      return (
        await useAxiosInstance().post("/posts/createPost", form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
    },

    async getPetPosts(id) {
      return (await useAxiosInstance().get("/posts/" + id)).data;
    },

    async getPost(id) {
      return (await useAxiosInstance().get("/posts/post/" + id)).data;
    },

    async postComment(form) {
      return await useAxiosInstance().post("/comments/post", form);
    },

    async reply(form) {
      return await useAxiosInstance().post("/comments/reply", form);
    },

    async update(form) {
      return await useAxiosInstance().put("/pets/update", form);
    },
  },
});
