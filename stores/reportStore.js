import { defineStore } from 'pinia'
import { useAxiosInstance } from "~/utils/axiosInstance.js";

export const useReportStore = defineStore('report', {

    state: () => ({
        reportes: [],
    }),
    actions: {


        async getReports() {
            return await useAxiosInstance().get('/reports/getAll')
        },

        async createReport(form) {
            return await useAxiosInstance().post('/reports/createReport', form)
        }

    }

})