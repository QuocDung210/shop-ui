import axiosTest from './apiTest';
import axiosClient from './axiosClient';

export const ProductApi = {
    getAll(payload) {
        return axiosTest.post('/Product/filter', payload);
    },
    getById(payload) {
        return axiosClient.get('/users/search', { params: payload });
    },
    getBySlug(payload) {
        return axiosTest.get(`/Product/slug/${payload}`);
    },
    getByIdProduct(payload) {
        return axiosTest.get(`/Product/${payload}`);
    },
    addProduct(payload) {
        return axiosTest.post(`/Product`, payload);
    },
    updateProduct(payload) {
        return axiosTest.put(`/Product`, payload);
    },
    deleteProduct(id) {
        return axiosTest.delete(`/Product/${id}`);
    },
    getProductBanner() {
        return axiosTest.get('/Product/show');
    },
};
