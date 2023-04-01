import { Col, Container, Row } from 'react-bootstrap';
import './Notify.scss';
import NotifyItem from './NotifyItem';
function AdminNotify() {
    return (
        <Container fluid>
            <Container>
                <Row>
                    <h2 className="m-0">THÔNG BÁO</h2>
                </Row>
                <Row className="g-3 mt-2 mb-4">
                    <Col xs={12} md={4}>
                        <div className="content-box">
                            <h3>Tất cả thông báo</h3>
                            <div className="all-notify">
                                <NotifyItem />
                                <NotifyItem />
                                <NotifyItem />
                                <NotifyItem />
                                <NotifyItem />
                                <NotifyItem />
                                <NotifyItem />
                                <NotifyItem />
                                <NotifyItem />
                                <NotifyItem />
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="content-box">
                            <h3>#tên thông báo</h3>
                            <div className="notify-detail">hahaha</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default AdminNotify;
