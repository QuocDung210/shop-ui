import axiosTest from './apiTest';

export const categoryApi = {
    getAll() {
        return axiosTest.get('/Category');
    },
    getById(id) {
        return axiosTest.get(`/Category/${id}`);
    },
    addCategory(payload) {
        return axiosTest.post('/Category', payload);
    },
    updateCategory(id, data) {
        return axiosTest.put('/Category', {
            ...data,
            id: id,
        });
    },
    deleteCategory(id) {
        return axiosTest.delete(`/Category/${id}`);
    },
};
