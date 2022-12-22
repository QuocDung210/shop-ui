import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    timeout: 2000,
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
