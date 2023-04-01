import axiosTest from './apiTest';

export const BrandApi = {
    getAll() {
        return axiosTest.get('/Brand');
    },
    getById(id) {
        return axiosTest.get(`/Brand/${id}`);
    },
    addBrand(payload) {
        return axiosTest.post('/Brand', payload);
    },
    updateBrand(id, data) {
        return axiosTest.put('/Brand', {
            ...data,
            id: id,
        });
    },
    deleteBrand(id) {
        return axiosTest.delete(`/Brand/${id}`);
    },
};
