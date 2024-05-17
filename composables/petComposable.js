import { usePetStore } from "~/stores/petStore";

export const usePet = () => {

    const pinia = usePinia();
    const store = usePetStore(pinia)

    const getPets = async () => {
        return await store.getPets()
    }

    const createPet = async (form) => {
        return store.createPet(form);
    }

    const update = async (form) => {
        return store.update(form);
    }

    const getPetById = async (id) => {
        return store.getPetById(id)
    }

    const postComment = async (form) => {
        return await store.postComment(form)
    }

    const createPost = async (form) => {
        return await store.createPost(form)
    }

    const getPetPosts = async (id) => {
        return await store.getPetPosts(id)
    }

    return { getPets, createPet, update, getPetById, postComment, createPost, getPetPosts }

}