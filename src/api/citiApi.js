import axios from 'axios';

export const cityApi = {
    getProvince() {
        return axios.get('/province', { baseURL: 'https://vapi.vnappmob.com/api' });
    },
    getDistrict(province_id) {
        return axios.get(`/province/district/${province_id}`, {
            baseURL: 'https://vapi.vnappmob.com/api',
        });
    },
    getWard(district_id) {
        return axios.get(`/province/ward/${district_id}`, {
            baseURL: 'https://vapi.vnappmob.com/api',
        });
    },
};
