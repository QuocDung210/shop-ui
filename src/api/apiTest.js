import axios from 'axios';

const axiosTest = axios.create({
    baseURL: 'https://localhost:7296/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor
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
