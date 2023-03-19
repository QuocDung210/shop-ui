import { Col, Container, Row } from 'react-bootstrap';
import Widget from '../../components/Widget';

import 'react-circular-progressbar/dist/styles.css';
import TotalRevenue from '../../components/TotalRevenue';
import ProductsSalesChart from '../../components/Chart/ProductsSalesChart';
import PieChartModel from '../../components/Chart/PieChart';
import TotalSale from '../../components/Chart/TotalSale';
import YearlySales from '../../components/Chart/YearlySales';

const WIDGET_ARR = ['users', 'products', 'orders', 'soleout'];

function Dashboard() {
    return (
        <Container fluid className="dashboard-container ">
            <Row xs={1} sm={2} md={4} className="g-4 mb-4">
                {WIDGET_ARR.map((item, idx) => (
                    <Col key={idx}>
                        <Widget type={item} />
                    </Col>
                ))}
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
                <Col md={8} xs={12}>
                    <PieChartModel />
                </Col>
                <Col md={4}>
                    <TotalRevenue />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
