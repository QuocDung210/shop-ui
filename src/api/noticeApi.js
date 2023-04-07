import axiosTest from './apiTest';

export const noticeApi = {
    getNoticeAdmin(config) {
        return axiosTest.get('/Notice', config);
    },
    createNotice(config) {
        return axiosTest.post('/Notice', config);
    },
    getNoticeUser(config) {
        return axiosTest.get('/Notice/Show', config);
    },
    getNoticeById(id, config) {
        return axiosTest.get(`/Notice/${id}`, config);
    },
    deleteNotice(id, config) {
        return axiosTest.delete(`/Notice/${id}`, config);
    },
};
