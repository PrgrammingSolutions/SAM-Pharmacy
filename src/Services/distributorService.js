import axiosInstance from "./axiosInstance";

const distributorService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/pharmacyDistributor/create', payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchSingle: async (id) => {
        try {
            const response = await axiosInstance.get('/pharmacyDistributor/get/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/pharmacyDistributor/all');
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    update: async (id, payload) => {
        try {
            const response = await axiosInstance.put('/pharmacyDistributor/update/' + id, payload);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    delete: async (id) => {
        try {
            const response = await axiosInstance.delete('/pharmacyDistributor/delete/' + id);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

};

export default distributorService;
