import axios from 'axios';
import { store } from '~/redux/store';
import { AuthApi } from './authApi';
import { loginSuccess, logoutSuccess } from '~/redux/slices/authSlice';
import { toast } from 'react-toastify';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const axiosTest = axios.create({
    baseURL: 'https://localhost:7296/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const refreshTokenRequest = async (accessToken, refreshToken) => {
    const data = await AuthApi.refresh({
        accessToken: accessToken,
        refreshToken: refreshToken,
    });
    store.dispatch(loginSuccess(data));
    return data;
};

axiosTest.interceptors.request.use(
    (config) => {
        const auth = store.getState();

        const accessToken = auth.auth.login.currentUser?.accessToken;

        const { headers } = config;
        const common = headers.common || {};
        common['Access-Control-Allow-Origin'] = '*';

        headers.Authorization = `Bearer ${accessToken}`;

        return config;
    },
    (err) => {
        return Promise.reject(err.response.status);
    },
);

axiosTest.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    async (error) => {
        const auth = store.getState();
        const accessToken = auth.auth.login.currentUser?.accessToken;
        const refreshToken = auth.auth.login.currentUser?.refreshToken;
        if (!accessToken || !refreshToken) return Promise.reject(error);
        const { config } = error;
        console.log('check: ', config);
        // const prevRequest = error?.config;
        if (error.response.status === 401 && !config._retry && refreshToken) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        console.log('test token: ', token);
                        config.headers['Authorization'] = `Bearer ${token}`;
                        return axiosTest(config);
                    })
                    .catch((err) => {
                        return Promise.reject((err.response && err.response.data) || 'something was wrong.');
                    });
            }
            config._retry = true;
            isRefreshing = true;
            try {
                const newData = await refreshTokenRequest(accessToken, refreshToken);
                console.log('new access:', newData.accessToken);
                console.log('/n new refresh: ', newData.refreshToken);
                axiosTest.defaults.headers.common['Authorization'] = 'Bearer ' + newData.accessToken;
                config.headers['Authorization'] = `Bearer ${newData.accessToken}`;
                processQueue(null, newData.accessToken);
                isRefreshing = false;
                return axiosTest(config);
            } catch (err) {
                processQueue(err, null);
                toast.warning('Đã hết hạn đăng nhập. Vui lòng đăng nhập lại.');
                store.dispatch(logoutSuccess());
                return Promise.reject((error.response && error.response.data) || 'something was wrong.');
            }
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject((error.response && error.response.data) || 'something was wrong.');
    },
);

export default axiosTest;
