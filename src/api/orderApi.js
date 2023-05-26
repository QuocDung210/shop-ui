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

    cancelOrderAdmin(id) {
        return axiosTest.post(`/Order/cancel/${id}`);
    },
    updateOrder(id) {
        return axiosTest.post(`/Order/Process/${id}`);
    },
    cancelOrder(id) {
        return axiosTest.post(`/Order/${id}`);
    },
    getIncomeYear(year) {
        return axiosTest.get(`/Order/income/${year}`);
    },
    getSoldYear(year) {
        return axiosTest.get(`/Order/sold/${year}`);
    },
    getDataColumnChart(year) {
        return axiosTest.get('/Order/column-chart', {
            params: {
                year: year,
            },
        });
    },
    getBrandChart(month, year) {
        return axiosTest.get('/Order/brandcircle-chart', {
            params: {
                month: month,
                year: year,
            },
        });
    },
    getCategoryChart(month, year) {
        return axiosTest.get('/Order/categoycircle-chart', {
            params: {
                month: month,
                year: year,
            },
        });
    },
    getSeriesChart(month, year) {
        return axiosTest.get('/Order/seriescircle-chart', {
            params: {
                month: month,
                year: year,
            },
        });
    },
    momoPay(payload) {
        return axiosTest.get(`/Order/quick-pay/${payload}`);
    },
    getOrdersShipper() {
        return axiosTest.get('/Order/shipper');
    },
};
