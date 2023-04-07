import axiosTest from './apiTest';

export const BrandApi = {
    getAll() {
        return axiosTest.get('/Brand');
    },
    getById(id) {
        return axiosTest.get(`/Brand/${id}`);
    },
    addBrand(payload, config) {
        return axiosTest.post('/Brand', payload, config);
    },
    updateBrand(id, data, config) {
        return axiosTest.put(
            '/Brand',
            {
                ...data,
                id: id,
            },
            config,
        );
    },
    deleteBrand(id, config) {
        return axiosTest.delete(`/Brand/${id}`, config);
    },
};
