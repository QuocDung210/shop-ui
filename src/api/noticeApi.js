import axiosTest from './apiTest';

export const noticeApi = {
    getNoticeAdmin() {
        return axiosTest.get('/Notify');
    },
    createNotice(payload) {
        return axiosTest.post('/Notify', payload);
    },
    getNoticeUser() {
        return axiosTest.get('/Notify/Show');
    },
    getNoticeById(id, config) {
        return axiosTest.get(`/Notify/${id}`, config);
    },
    deleteNotice(id) {
        return axiosTest.delete(`/Notify/${id}`);
    },
};
