import axiosTest from './apiTest';

export const AuthApi = {
    login(payload) {
        return axiosTest.post('Auth/log-in', payload);
    },
    logout() {},
    register(payload) {
        return axiosTest.post('Auth/register', payload);
    },

    changePassword(data, config) {
        console.log('check paload', data, config);
        return axiosTest.put('/Auth/change-password', data, config);
    },
    getProfile(payload) {
        return axiosTest.get('/Auth/profile', payload);
    },
};
