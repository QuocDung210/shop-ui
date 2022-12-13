import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';

function TopHeader() {
    return (
        <Container fluid className="p-0 header-top">
            <Container>
                <Row>
                    <Col className="slogan">
                        <span className="text-uppercase">Thể hiện tính cách của bạn</span>
                    </Col>
                    <Col className="d-none d-md-block">
                        <div className="d-flex flex-row justify-content-end">
                            <div className="d-flex">
                                <div className="me-3">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <div style={{ opacity: '0.8' }}>Hỗ trợ khách hàng: 0123 456 789</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default TopHeader;
