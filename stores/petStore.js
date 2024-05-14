import { defineStore } from 'pinia'
import { useAxiosInstance } from "~/utils/axiosInstance.js";
import { duplicate } from '~/utils/duplicateMedia';
import axios from 'axios'
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
                let multimedia = []
                for (let pic of pet.multimedia) {
                    multimedia.push(env.urlApi + '/uploads/' + pic._id + '.' + pic.tipo)
                    // console.log(multimedia)
                }
                pet.multimedia = multimedia
            }
            this.pets = pets
            return pets
        },

        async createPet(form) {
            useAxiosInstance().post('/pets/createPet', form, { headers: { "Content-Type": "multipart/form-data" } }).then(res => {
                if (env.environment == 'development') {
                    duplicate(form, res.data.foto_perfil)
                }
            })
        },

        async update(form) {
            return await useAxiosInstance().put('/pets/update', form)
        }
    },



})