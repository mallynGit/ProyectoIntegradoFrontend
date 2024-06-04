import { useUserStore } from "~/stores/userStore.js";

export const useUser = () => {
  const pinia = usePinia();
  const userStore = useUserStore(pinia);

  const login = async (form) => {
    let ler = await userStore.login(form);
    return ler;
  };

  const getChats = async () => {
    return await userStore.getChats();
  };

  const sendMessage = async (msg) => {
    return await userStore.sendMessage(msg);
  };

  const update = async (form) => {
    const res = (await userStore.update(form)).data;
    userStore.user = res;
    return res;
  };

  const createChat = async (uid) => {
    let returned = await userStore.createChat(uid);
    // getChats();
    return returned;
  };

  const register = async (user, profilePic, pets) => {
    return await userStore.register(user, profilePic, pets);
  };

  const returnStore = () => {
    return userStore;
  };

  const setUser = (user) => {
    userStore.setUser(user);
  };

  const getUser = () => {
    return userStore.user;
  };

  const findUsers = async () => {
    return (await userStore.findUsers()).data;
  };

  const deleteUser = async (id) => {
    return (await userStore.deleteUser(id)).data;
  };

  const getToken = () => {
    return userStore.getToken();
  };

  const retrieveUser = async () => {
    return (await userStore.retrieveUser()).data;
  };

  const isLogged = () => {
    return userStore.isLogged();
  };

  const logout = () => {
    return userStore.logout();
  };

  const checkToken = async () => {
    return await userStore.checkToken();
  };

  return {
    login,
    getChats,
    sendMessage,
    setUser,
    getUser,
    createChat,
    findUsers,
    deleteUser,
    getToken,
    isLogged,
    returnStore,
    logout,
    checkToken,
    update,
    register,
    retrieveUser,
  };
};
