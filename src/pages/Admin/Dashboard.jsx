import { faClockRotateLeft, faPlus, faTag, faU, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Container, Nav, Navbar, NavDropdown, Offcanvas, Row, Stack } from 'react-bootstrap';
import Sidebar from '~/layouts/components/Sidebar';
import Chart from './components/Chart';

function Dashboard() {
    return (
        <Container fluid>
            <Row xs={1} sm={2} md={3} lg={4} className="g-3 mb-3">
                <Col>
                    <Stack className="info-wrapper">
                        <div style={{}}>
                            <FontAwesomeIcon
                                className="info-icon"
                                icon={faUser}
                                style={{ color: 'green', fontSize: '2rem' }}
                            />
                        </div>
                        <span>0</span>
                        <p>Tổng số khách hàng</p>
                    </Stack>
                </Col>
                <Col>
                    <Stack className="info-wrapper">
                        <FontAwesomeIcon
                            className="info-icon"
                            icon={faTag}
                            style={{ color: 'blue', fontSize: '2rem' }}
                        />
                        <span>0</span>
                        <p>Tổng số sản phẩm</p>
                    </Stack>
                </Col>
                <Col>
                    <Stack className="info-wrapper">
                        <FontAwesomeIcon
                            className="info-icon"
                            icon={faClockRotateLeft}
                            style={{ color: 'yellow', fontSize: '2rem' }}
                        />
                        <span>0</span>
                        <p>Tổng số đơn hàng trong tháng</p>
                    </Stack>
                </Col>
                <Col>
                    <Stack className="info-wrapper">
                        <FontAwesomeIcon
                            className="info-icon"
                            icon={faPlus}
                            style={{ color: 'red', fontSize: '2rem' }}
                        />
                        <span>0</span>
                        <p>Số sảng phẩm cần nhập thêm</p>
                    </Stack>
                </Col>
            </Row>

            <Row>
                <Chart />
            </Row>
        </Container>
    );
}

export default Dashboard;
