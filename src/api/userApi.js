import axiosTest from './apiTest';

export const userApi = {
    getAll() {
        return axiosTest.get('/User');
    },
    addUser(data) {
        return axiosTest.post('/User', data);
    },
    setRole(data) {
        return axiosTest.put('/User', data);
    },
    deleteUser(data) {
        return axiosTest.delete('/User', data);
    },
};
