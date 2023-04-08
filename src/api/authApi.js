import axiosTest from './apiTest';

export const AuthApi = {
    login(payload) {
        return axiosTest.post('Auth/log-in', payload);
    },

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
    checkAcc(payload) {
        return axiosTest.post('/Auth/check-user', null, {
            params: {
                phone: payload,
            },
        });
    },
    forgotPassword(paload) {
        return axiosTest.put('/Auth/get-password', paload);
    },
    updateAvatar(payload) {
        return axiosTest.post('/Auth/update-image', null, {
            params: {
                img: payload,
            },
        });
    },
};
