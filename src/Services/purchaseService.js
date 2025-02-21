import axiosInstance from "./axiosInstance";

const purchaseService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/pharmacyPurchase/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchSingle: async (id) => {
        try {
            const response = await axiosInstance.get('/pharmacyPurchase/get/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/pharmacyPurchase/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put('/pharmacyPurchase/update/' + id, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/pharmacyPurchase/delete/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

};

export default purchaseService;
