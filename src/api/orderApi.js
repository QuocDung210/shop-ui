import axiosTest from './apiTest';

export const orderApi = {
    createOrder(payload, config) {
        return axiosTest.post('/Order', payload, config);
    },
    getOrderUser(config) {
        return axiosTest.get('/Order', config);
    },
    getOrderAdmin(config) {
        return axiosTest.get(`/Order/all`, config);
    },
    getOrderDetailById(id, config) {
        return axiosTest.get(`/Order/Detail/${id}`, config);
    },
    getOrderIncomeYear(year, config) {
        return axiosTest.get(`/Order/income/${year}`, config);
    },
    getOrderSoleYear(year, config) {
        return axiosTest.get(`/Order/sole/${year}`, config);
    },
    getOrderBrandChartYear(year, config) {
        return axiosTest.get(`/Order/brandchart/${year}`, config);
    },
    getOrderBrandChartMonthOrYear(payload, config) {
        return axiosTest.get(`/Order/brandchart`, {
            params: payload,
        });
    },
    cancelOrder(id, config) {
        return axiosTest.put(`/Order/cancel/${id}`, config);
    },
};
