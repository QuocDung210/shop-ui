import axiosTest from './apiTest';

export const seriesApi = {
    getAll() {
        return axiosTest.get('/Series');
    },
    getById(id, config) {
        return axiosTest.get(`/Series/${id}`, config);
    },
    addSeries(payload, config) {
        return axiosTest.post('/Series', payload, config);
    },
    updateSeries(id, data, config) {
        return axiosTest.put(
            '/Series',
            {
                ...data,
                id: id,
            },
            config,
        );
    },
    deleteSeries(id, config) {
        return axiosTest.delete(`/Series/${id}`, config);
    },
};
