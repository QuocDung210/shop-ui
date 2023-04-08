import axiosTest from './apiTest';

export const orderApi = {
    createOrder(payload) {
        return axiosTest.post('/Order', payload);
    },
    getOrderUser() {
        return axiosTest.get('/Order');
    },
    getOrderAdmin() {
        return axiosTest.get(`/Order/all`);
    },
    getOrderDetailById(id) {
        return axiosTest.get(`/Order/Detail/${id}`);
    },
    getOrderIncomeYear(year) {
        return axiosTest.get(`/Order/income/${year}`);
    },
    getOrderSoleYear(year) {
        return axiosTest.get(`/Order/sole/${year}`);
    },
    getOrderBrandChartYear(year) {
        return axiosTest.get(`/Order/brandchart/${year}`);
    },
    getOrderBrandChartMonthOrYear(payload) {
        return axiosTest.get(`/Order/brandchart`, {
            params: payload,
        });
    },
    cancelOrderAdmin(id) {
        return axiosTest.post(`/Order/cancel/${id}`);
    },
    updateOrder(id) {
        return axiosTest.post(`/Order/Process/${id}`);
    },
    cancelOrder(id) {
        return axiosTest.post(`/Order/${id}`);
    },
};
