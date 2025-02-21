import axiosInstance from "./axiosInstance";

const productService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/pharmacyProduct/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchSingle: async (id) => {
        try {
            const response = await axiosInstance.get('/pharmacyProduct/get/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/pharmacyProduct/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchMedicines: async () => {
        try {
            const response = await axiosInstance.get('/pharmacyProduct/medicines');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put('/pharmacyProduct/update/' + id, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/pharmacyProduct/delete/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

};

export default productService;
