import { Col, Container, Row } from 'react-bootstrap';
import Breadcrumb from '~/components/Breadcrumb';
import Pagination from '~/components/Pagination';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function WithSidebar({ children }) {
    return (
        <Container fluid className="">
            {/* <Row>
                <Header />
            </Row>
            <Row>
                <Breadcrumb />
            </Row> */}
            <Row className="pt-3">
                <Col className="d-flex flex-row">
                    <Container className="p-0">
                        <Row>
                            <Col md={3} className="d-none d-lg-block">
                                <Sidebar />
                            </Col>
                            <Col xs={12} lg={9}>
                                {children}
                                <Row>
                                    <Pagination />
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            {/* <Row>
                <Footer />
            </Row> */}
        </Container>
    );
}

export default WithSidebar;
