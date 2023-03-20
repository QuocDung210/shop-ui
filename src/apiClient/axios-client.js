import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,

    timeout: 2000,
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject((error.response && error.response.data) || 'Something wrong');
    },
);

export default axiosClient;
