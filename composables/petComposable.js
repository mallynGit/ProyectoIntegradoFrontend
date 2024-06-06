import { usePetStore } from "~/stores/petStore";

export const usePet = () => {
  const pinia = usePinia();
  const store = usePetStore(pinia);

  const getPets = async () => {
    return await store.getPets();
  };

  const getUserPets = async (id) => {
    return await store.getUserPets(id);
  };

  const createPet = async (form) => {
    return store.createPet(form);
  };

  const update = async (form) => {
    return await store.update(form);
  };

  const getPetById = async (id) => {
    return store.getPetById(id);
  };

  const postComment = async (form) => {
    return await store.postComment(form);
  };

  const createPost = async (form) => {
    return await store.createPost(form);
  };

  const getPetPosts = async (id) => {
    return await store.getPetPosts(id);
  };

  const getPost = async (id) => {
    return await store.getPost(id);
  };

  const reply = async (form) => {
    return await store.reply(form);
  };

  const petStore = store;

  return {
    getPets,
    createPet,
    getUserPets,
    update,
    getPetById,
    postComment,
    createPost,
    getPetPosts,
    getPost,
    petStore,
    reply,
  };
};
