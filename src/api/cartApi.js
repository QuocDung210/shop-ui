import axiosTest from './apiTest';

export const cartApi = {
    getCart() {
        return axiosTest.get('/Cart');
    },
    updateCart(payload) {
        return axiosTest.put('/Cart', payload);
    },
    addCart(data) {
        return axiosTest.post('/Cart', data);
    },
    deleteCart(id) {
        return axiosTest.delete(`/Cart/${id}`);
    },
};
