import { useUserStore } from '~/stores/userStore.js'

export const useUser = () => {

    const pinia = usePinia();
    const userStore = useUserStore(pinia)

    const login = async (form) => {
        let ler = await userStore.login(form)
        console.log(ler)
        return ler
    }

    const returnStore = () => {
        return userStore
    }

    const setUser = (user) => {
        userStore.setUser(user)
    }

    const getUser = () => {
        return userStore.getUser()
    }

    const findUsers = async () => {
        return (await userStore.findUsers()).data
    }

    const deleteUser = async (id) => {
        return (await userStore.deleteUser(id)).data
    }

    const getToken = () => {
        return userStore.getToken()
    }

    const removeToken = () => {
        return userStore.removeToken()
    }

    const isLogged = () => {
        return userStore.isLogged()
    }

    const logout = () => {
        return userStore.logout()
    }

    return { login, setUser, getUser, findUsers, deleteUser, getToken, isLogged, returnStore, removeToken, logout }
}