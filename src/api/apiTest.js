import axios from 'axios';
import { store } from '~/redux/store';

const axiosTest = axios.create({
    baseURL: 'https://localhost:7296/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

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
        return Promise.reject(err);
    },
);

axiosTest.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject((error.response && error.response.data) || 'Something went wrong');
    },
);

export default axiosTest;
