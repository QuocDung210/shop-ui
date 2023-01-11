import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

function WithSidebar({ children }) {
    return (
        <Container fluid>
            <Row className="pt-3">
                <Col className="d-flex flex-row">
                    <Container className="p-0">
                        <Row>
                            <Col md={3} className="d-none d-lg-block">
                                <Sidebar />
                            </Col>
                            <Col xs={12} lg={9}>
                                {children}
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default WithSidebar;
