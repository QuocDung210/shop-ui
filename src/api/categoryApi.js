import axiosTest from './apiTest';

export const categoryApi = {
    getAll() {
        return axiosTest.get('/Category');
    },
    getById(id, config) {
        return axiosTest.get(`/Category/${id}`, config);
    },
    addCategory(payload, config) {
        return axiosTest.post('/Category', payload, config);
    },
    updateCategory(id, data, config) {
        return axiosTest.put(
            '/Category',
            {
                ...data,
                id: id,
            },
            config,
        );
    },
    deleteCategory(id, config) {
        return axiosTest.delete(`/Category/${id}`, config);
    },
};
