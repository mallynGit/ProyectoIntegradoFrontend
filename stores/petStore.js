import { defineStore } from 'pinia'
import { useAxiosInstance } from "~/utils/axiosInstance.js";

export const usePetStore = defineStore('pet', {

    state: () => ({
        pets: []
    }),
    actions: {

        async getPets() {
            let pets = (await useAxiosInstance().get('/pets/getAll')).data
            this.pets = pets
            return pets
        },

        async createPet(form) {
            return await useAxiosInstance().post('/pets/createPet', form, { headers: { "Content-Type": "multipart/form-data" } })
        },

        async update(form) {
            return await useAxiosInstance().put('/pets/update', form)
        }

    }


})