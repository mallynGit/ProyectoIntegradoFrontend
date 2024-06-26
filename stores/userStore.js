import { defineStore } from "pinia";
import { useAxiosInstance } from "~/utils/axiosInstance.js";
import { duplicate } from "~/utils/duplicateMedia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
    chats: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },

    logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.$reset();
      this.user = null;
      this.token = null;
    },

    async sendMessage(message) {
      return (await useAxiosInstance().post("/chat/sendMsg", message)).data;
    },

    async createChat(uid) {
      return (
        await useAxiosInstance().post("/chat/createChat", {
          user1: uid,
          user2: this.user._id,
        })
      ).data;
    },

    async getChats() {
      let chats = (
        await useAxiosInstance().get("/chat/getAll?id=" + this.user._id)
      ).data;
      this.chats = chats;
      return chats;
    },

    async login(form) {
      try {
        console.log("principio desde store login");
        let p = await useAxiosInstance().post("/auth/login", form);
        this.token = p.data.token;
        localStorage.setItem("token", p.data.token);
        this.user = p.data.user;
        // console.log(p, 'peticion')
        return p.data;
      } catch (err) {
        console.log(err.response.status);
        return err.response.status;
      }
    },

    async update(user) {
      if (this.user.role == "ADMIN") {
        return await useAxiosInstance().put("/user/update/" + user._id, user);
      } else {
        return await useAxiosInstance().put(
          "/user/update/" + this.user._id,
          user
        );
      }
    },

    async register(user, profilePic, pets) {
      console.log(user, profilePic, " desde register");
      let formData = new FormData();
      for (let key in user) {
        formData.append(key, user[key]);
      }
      if (profilePic) {
        console.log(profilePic.name);
        formData.append(
          "multi",
          profilePic,
          "test." + profilePic.name.split(".")[1]
        );
      }
      if (pets.length > 0) {
        let i = 1;
        for (let pet of pets) {
          pet.number = i;
          formData.append(
            "multi",
            pet.media,
            `pet${i}.${pet.media.name.split(".")[1]}`
          );
          delete pet["media"];
          i++;
        }
        formData.append("pets", JSON.stringify(pets));
      }
      // return useAxiosInstance().post('2', formData)
      return useAxiosInstance()
        .post("/auth/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res, " desde store regitsrer?");
          if (useRuntimeConfig().public.environment == "development") {
            duplicate(formData, res.data._id);
          }
        });
    },

    getUser() {
      return this.user;
    },
    async findUsers() {
      return await useAxiosInstance().get("/user/find");
    },

    async deleteUser(id) {
      return await useAxiosInstance().delete("/user/delete/" + id);
    },

    async retrieveUser() {
      return await useAxiosInstance().get("/user/find?name=" + this.user.nick);
    },

    isLogged() {
      return this.token != null;
    },

    async checkToken() {
      try {
        console.log("checking...");
        return (
          await useAxiosInstance().post(
            "/auth/check",
            {},
            {
              headers: {
                Authorization: `Bearer ${
                  this.token ? this.token : localStorage.getItem("token")
                }`,
              },
            }
          )
        ).data;
      } catch (err) {
        console.log(err, "checktoken fallido, deslogueando...");
        this.logout();
      }
    },
  },
});
