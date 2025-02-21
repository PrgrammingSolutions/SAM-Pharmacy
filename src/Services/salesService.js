import axiosInstance from "./axiosInstance";

const salesService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/pharmacySale/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchSingle: async (id) => {
        try {
            const response = await axiosInstance.get('/pharmacySale/get/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/pharmacySale/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put('/pharmacySale/update/' + id, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/pharmacySale/delete/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

};

export default salesService;
