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

    return { getPets, createPet, update, getPetById, postComment }

}