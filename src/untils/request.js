import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    timeout: 2000,
});

export const get = async (path, option = {}) => {
    const res = await request.get(path, option);
    return res.data;
};

export default request;
// https://tiktok.fullstack.edu.vn/api/
