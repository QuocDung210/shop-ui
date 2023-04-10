import axiosTest from './apiTest';

export const AuthApi = {
    login(payload) {
        return axiosTest.post('Auth/log-in', payload);
    },

    register(payload) {
        return axiosTest.post('Auth/register', payload);
    },

    changePassword(data) {
        return axiosTest.put('/Auth/change-password', data);
    },
    getProfile(payload) {
        return axiosTest.get('/Auth/profile', payload);
    },
    checkAcc(payload) {
        return axiosTest.post('/Auth/check-user', {
            phone: payload,
        });
    },
    forgotPassword(paload) {
        return axiosTest.put('/Auth/get-password', paload);
    },
    updateAvatar(payload) {
        return axiosTest.put('/Auth/update-image', {
            image: payload,
        });
    },
};