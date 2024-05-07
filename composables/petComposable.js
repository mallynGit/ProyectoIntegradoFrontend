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

    return { getPets, createPet, update }

}