import axiosClient from './axiosClient';

export const ProductApi = {
    getById(payload) {
        return axiosClient.get('/users/search', { params: payload });
    },
};
