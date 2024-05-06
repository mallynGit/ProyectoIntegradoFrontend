import { defineStore } from 'pinia'
import { useAxiosInstance } from "~/utils/axiosInstance.js";


export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        setUser(user) {
            this.user = user
        },

        logout() {
            console.log('noufdsa')
        },

        async login(form) {
            try {
                console.log('llega antes')
                let p = await useAxiosInstance().post('/auth/login', form)
                this.token = p.data

                console.log(p, 'peticion')
                return p.data
            } catch (err) {
                console.log(err.response.status)
                return err.response.status
            }
        },

        getUser() {
            return this.user
        },
        async findUsers() {
            return await useAxiosInstance().get('/user/find')
        },

        async deleteUser(id) {
            return await useAxiosInstance().delete('/user/delete/' + id)
        },

        removeToken() {
            this.token = null
        },

        isLogged() {
            return this.token != null
        },

        async checkToken() {
            try{
            return (await useAxiosInstance().post('/auth/check', {}, { headers: { Authorization: `Bearer ${this.token}` } })).data
            }catch(err){
                console.log(err, 'checktoken fallido, borrando token...')
                localStorage.removeItem('token')
                this.removeToken()
            }
        }

    }
})