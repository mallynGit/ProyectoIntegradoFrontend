import { defineStore } from 'pinia'
import { useAxiosInstance } from "~/utils/axiosInstance.js";
const env = useRuntimeConfig().public

export const usePetStore = defineStore('pet', {

    state: () => ({
        pets: []
    }),
    actions: {

        async getPets() {
            let pets = (await useAxiosInstance().get('/pets/getAll')).data
            for (let pet of pets) {
                pet.foto_perfil = env.urlApi + '/uploads/' + pet.foto_perfil._id + '.' + pet.foto_perfil.tipo
            }
            this.pets = pets
            return pets
        },

        async createPet(form) {
            useAxiosInstance().post('/pets/createPet', form, { headers: { "Content-Type": "multipart/form-data" } }).then(res => {
                if (env.environment == 'development') {
                    fetch('http://bondpetapi.duckdns.org:3001/media/post?filename=' + res.data.foto_perfil, { method: 'POST', body: form.media, headers: { "Content-Type": "multipart/form-data" } })
                }
            })
        },

        async update(form) {
            return await useAxiosInstance().put('/pets/update', form)
        }

    }


})