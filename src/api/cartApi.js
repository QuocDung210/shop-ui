import axiosTest from './apiTest';

export const cartApi = {
    getCart(payload) {
        return axiosTest.get('/Cart', payload);
    },
    updateCart(payload, config) {
        return axiosTest.put('/Cart', payload, config);
    },
    addCart(data, config) {
        return axiosTest.post('/Cart', data, config);
    },
    deleteCart(id, config) {
        return axiosTest.delete(`/Cart/${id}`, config);
    },
};
