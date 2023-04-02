import axiosTest from './apiTest';

export const seriesApi = {
    getAll() {
        return axiosTest.get('/Series');
    },
    getById(id) {
        return axiosTest.get(`/Series/${id}`);
    },
    addSeries(payload) {
        return axiosTest.post('/Series', payload);
    },
    updateSeries(id, data) {
        return axiosTest.put('/Series', {
            ...data,
            id: id,
        });
    },
    deleteSeries(id) {
        return axiosTest.delete(`/Series/${id}`);
    },
};
