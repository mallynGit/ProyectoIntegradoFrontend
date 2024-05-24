import { useReportStore } from '~/stores/reportStore.js'

export const useReports = () => {

    const pinia = usePinia();
    const store = useReportStore(pinia);
    const userStore = useUser()

    const getReports = async () => {
        return await store.getReports();
    }

    const createReport = async (form) => {
        form.reportante = userStore.getUser()._id
        return await store.createReport(form);
    }


    return { getReports, createReport }
}