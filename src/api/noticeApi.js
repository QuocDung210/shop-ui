import axiosTest from './apiTest';

export const noticeApi = {
    getNoticeAdmin() {
        return axiosTest.get('/Notice');
    },
    createNotice(payload) {
        return axiosTest.post('/Notice', payload);
    },
    getNoticeUser() {
        return axiosTest.get('/Notice/Show');
    },
    getNoticeById(id, config) {
        return axiosTest.get(`/Notice/${id}`, config);
    },
    deleteNotice(id) {
        return axiosTest.delete(`/Notice/${id}`);
    },
};
