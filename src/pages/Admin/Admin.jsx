import { faBell, faClockRotateLeft, faGauge, faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Col, Container, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import './Admin.scss';
import AdminSidebar from './components/AdminSidebar';

const ADMIN_SIDEBAR_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faGauge} />,
        title: 'Bảng điều khiển',
        link: 'dashboard',
    },
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Tài khoản',
        link: 'account',
    },
    {
        icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
        title: 'Đơn hàng',
        link: 'order',
    },
    {
        icon: <FontAwesomeIcon icon={faTag} />,
        title: 'Sản phẩm',
        link: 'products',
    },
    {
        icon: <FontAwesomeIcon icon={faBell} />,
        title: 'Thông báo',
        link: 'notify',
    },
];

function AdminMainPage() {
    const [open, setOpen] = useState(false);

    const handleToggleMenu = () => {
        setOpen(!open);
    };

    const handleCloseOffCanvas = () => {
        setOpen(false);
    };

    return (
        <Container fluid className="admin-container">
            <Row>
                <Col xs={2} className="d-none d-lg-block admin-sidebar">
                    <AdminSidebar sbItems={ADMIN_SIDEBAR_ITEMS} />
                </Col>
                <Col className="admin-content">
                    <Container fluid className="px-0">
                        <Row className="admin-content-top ">
                            <Navbar key={'lg'} expand={'lg'} className="py-4">
                                <Container fluid>
                                    <Navbar.Toggle
                                        aria-controls={`offcanvasNavbar-expand-${'lg'}`}
                                        onClick={handleToggleMenu}
                                    />
                                    <Navbar.Offcanvas
                                        id={`offcanvasNavbar-expand-${'lg'}`}
                                        aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
                                        placement="end"
                                        show={open}
                                    >
                                        <Offcanvas.Header closeButton onHide={() => setOpen(false)}></Offcanvas.Header>
                                        <Offcanvas.Body className="d-block d-lg-none p-0">
                                            <AdminSidebar
                                                sbItems={ADMIN_SIDEBAR_ITEMS}
                                                handleCloseOffCanvas={handleCloseOffCanvas}
                                            />
                                        </Offcanvas.Body>
                                    </Navbar.Offcanvas>
                                </Container>
                            </Navbar>
                        </Row>
                        <Row className="admin-content-bottom m-4">
                            <Outlet />
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminMainPage;
