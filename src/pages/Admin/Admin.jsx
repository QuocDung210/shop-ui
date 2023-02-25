import { faChartArea, faClockRotateLeft, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Image, Nav, Navbar, NavDropdown, Offcanvas, Row, Stack } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Images from '~/components/Images';
import Sidebar from '~/layouts/components/Sidebar';
import './Admin.scss';
import AdminSidebar from './AdminSidebar';

const ADMIN_SIDEBAR_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faChartArea} />,
        title: 'Bảng điều khiển',
        link: 'dashboard',
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Quản lý tài khoản',
        link: '#',
    },
    {
        icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
        title: 'Quản lý đơn hàng',
        link: '#',
    },
    {
        icon: <FontAwesomeIcon icon={faTag} />,
        title: 'Quản lý sản phẩm',
        link: '#',
    },
];

function AdminMainPage() {
    return (
        <Container fluid className="admin">
            <Row>
                <Col xs={2} className="d-none d-lg-block p-0">
                    <AdminSidebar sbItems={ADMIN_SIDEBAR_ITEMS} />
                </Col>
                <Col>
                    <Container fluid className="px-0">
                        <Row className="p-0 admin-header">
                            <Navbar key={'lg'} expand={'lg'} className="py-4">
                                <Container fluid>
                                    <Navbar.Brand href="#">
                                        <h3 className="m-0">Dashboard</h3>
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
                                    <Navbar.Offcanvas
                                        id={`offcanvasNavbar-expand-${'lg'}`}
                                        aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                                        placement="end"
                                    >
                                        <Offcanvas.Header closeButton></Offcanvas.Header>
                                        <Offcanvas.Body className="d-block d-lg-none p-0">
                                            <AdminSidebar sbItems={ADMIN_SIDEBAR_ITEMS} />
                                        </Offcanvas.Body>
                                    </Navbar.Offcanvas>
                                </Container>
                            </Navbar>
                        </Row>
                        <Row className="my-4">
                            <Outlet />
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminMainPage;
