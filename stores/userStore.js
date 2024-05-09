import { defineStore } from 'pinia'
import { useAxiosInstance } from "~/utils/axiosInstance.js";
import { duplicate } from '~/utils/duplicateMedia';


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
            localStorage.removeItem('token')
            this.$reset()
        },

        async login(form) {
            try {
                console.log('llega antes')
                let p = await useAxiosInstance().post('/auth/login', form)
                this.token = p.data.token
                localStorage.setItem('token', p.data.token)
                this.user = p.data.user
                console.log(p, 'peticion')
                return p.data
            } catch (err) {
                console.log(err.response.status)
                return err.response.status
            }
        },

        async update(user) {
            if (this.user.role == 'ADMIN') {
                return await useAxiosInstance().put('/user/update/' + user._id, user)
            } else {
                return await useAxiosInstance().put('/user/update/' + this.user._id, user)
            }
        },

        async register(user, profilePic) {
            console.log(user, profilePic, ' desde register')
            let formData = new FormData()
            for (let key in user) {
                formData.append(key, user[key]);
            }
            if (profilePic) {
                formData.append('media', profilePic);
            }
            return useAxiosInstance().post('/auth/register', formData, { headers: { "Content-Type": "multipart/form-data" } }).then(res => {
                console.log(res, ' desde store regitsrer?')
                if (useRuntimeConfig().public.environment == 'development') {
                    duplicate(formData, res.data._id)
                }
            })
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
            localStorage.removeItem('token')
        },

        isLogged() {
            return this.token != null
        },

        async checkToken() {
            try {
                return (await useAxiosInstance().post('/auth/check', {}, { headers: { Authorization: `Bearer ${this.token ? this.token : localStorage.getItem('token')}` } })).data
            } catch (err) {
                console.log(err, 'checktoken fallido, borrando token...')
                localStorage.removeItem('token')
                this.removeToken()
            }
        }

    }
})