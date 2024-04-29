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

        async login(form) {
            try {
                console.log('llega antes')
                let p = await useAxiosInstance().post('/auth/login', form)
                this.token = p.data
                localStorage.setItem('token', p.data)
                console.log(p, 'peticion')
                return p
            } catch (err) {
                console.log(err.response.status)
                return err.response.status
            }
        },

        logout() {
            this.token = null
            localStorage.removeItem('token')
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

        getToken() {
            return this.token
        },

        isLogged(){
            return this.token != null
        },

        async checkToken(token) {
            if (token == null) {
                token = this.getToken()
            }

            let res = await useAxiosInstance().post('/auth/check')
            return res.data
        }
    }
})