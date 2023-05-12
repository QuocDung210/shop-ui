import { Col, Container, Row } from 'react-bootstrap';
import Widget from '../../components/Widget';

import 'react-circular-progressbar/dist/styles.css';
import ProductsSalesChart from '../../components/Chart/ProductsSalesChart';
import TotalSale from '../../components/Chart/TotalSale';
import YearlySales from '../../components/Chart/YearlySales';
import { useEffect, useState } from 'react';
import { ProductApi, orderApi, userApi } from '~/api';
import TotalSalesCategory from '../../components/Chart/TotalSalesCategory';
import TotalSalesSeries from '../../components/Chart/TotalSalesSeries';
import useAuth from '~/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [oders, setOders] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (auth.user.role === 'employee') {
            navigate('/admin/order');
            return;
        }
        const fetch = async () => {
            const resPd = await ProductApi.getAll({
                query: '',
                pageIndex: 1,
                pageSize: 1000,
                totalRow: 0,
                sort: 0,
                products: [],
                brandId: 0,
                categoryId: 0,
                seriesId: 0,
                minPrice: 0,
                maxPrice: 0,
            });
            const resOders = await orderApi.getOrderAdmin();
            const resUsers = await userApi.getAll();

            setOders(resOders.length);
            setProducts(resPd.products.length);
            setUsers(resUsers.length);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid className="dashboard-container ">
            <Row xs={1} sm={2} md={3} className="g-4 mb-4">
                <Col>
                    <Widget type="users" dt={users} link={'/admin/account'} />
                </Col>
                <Col>
                    <Widget type="products" dt={products} link={'/admin/products'} />
                </Col>
                <Col>
                    <Widget type="orders" dt={oders} link={'/admin/order'} />
                </Col>
            </Row>
            <Row className="g-4 mb-4" md={2} xs={1}>
                <Col>
                    <TotalSale />
                </Col>
                <Col>
                    <ProductsSalesChart />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <YearlySales />
                </Col>
            </Row>
            <Row md={2} xs={1} className="mb-4 g-4">
                <Col>
                    <TotalSalesCategory />
                </Col>
                <Col>
                    <TotalSalesSeries />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
