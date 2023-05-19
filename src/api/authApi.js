import axiosTest from './apiTest';

export const AuthApi = {
    login(payload) {
        return axiosTest.post('Auth/log-in', payload);
    },

    register(payload, otp) {
        return axiosTest.post('Auth/register', payload, {
            params: {
                otp: otp,
            },
        });
    },

    changePassword(data) {
        return axiosTest.put('/Auth/change-password', data);
    },
    getProfile() {
        return axiosTest.get('/Auth/profile');
    },
    checkAcc(payload) {
        return axiosTest.post('/Auth/check-user', {
            email: payload,
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
    refresh(payload) {
        return axiosTest.post('/Auth/refreshtoken', payload);
    },
    updateName(payload) {
        return axiosTest.put('/Auth/update-name', {
            name: payload,
            email: '',
            phone: '',
            img: '',
            role: '',
        });
    },
    sendOtp(payload) {
        console.log('check body:', payload);
        return axiosTest.post('/Auth/sendotp', payload);
    },
};
