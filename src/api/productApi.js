import axiosTest from './apiTest';
import axiosClient from './axiosClient';

export const ProductApi = {
    getAll(payload) {
        return axiosTest.post('/Product/filter', payload);
    },
    getById(payload) {
        return axiosClient.get('/users/search', { params: payload });
    },
    getByIdProduct(payload) {
        return axiosTest.get(`/Product/${payload}`);
    },
    addProduct(payload, config) {
        console.log('check data:', payload, config);
        return axiosTest.post(`/Product`, payload, config);
    },
    updateProduct(payload, config) {
        return axiosTest.put(`/Product`, payload, config);
    },
    deleteProduct(id, config) {
        return axiosTest.delete(`/Product/${id}`, config);
    },
    getProductBanner() {
        return axiosTest.get('/Product/show');
    },
};
