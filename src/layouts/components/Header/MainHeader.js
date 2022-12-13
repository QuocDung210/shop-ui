import Search from '../Search/Search';
import 'tippy.js/dist/tippy.css';
import Logo from '~/components/Logo';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import MainHeaderMenu from './MainHeaderMenu';
import Cart from '../Cart';
import Buttons from '~/components/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function MainHeader({ menuItems }) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };
    return (
        <Container fluid className="d-flex align-items-center main-header">
            <Container className="main-header-wrapper">
                <Row className="justify-content-between main-header-contents">
                    <Col lg={'auto'} xs={12} className="d-flex header-logo ">
                        <div className="d-block d-lg-none header-nav-menu">
                            <Offcanvas show={show} onHide={handleClose}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Menu</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <div>
                                        <Search />
                                    </div>
                                    {/* <Nav as="ul" className="d-flex flex-column">
                                    {NavList.map((navItem, idx) => (
                                        <Nav.Item as="li" key={idx} className=" m-4">
                                            <Link to={navItem.link}>
                                                <span className="nav__item-label">{navItem.label}</span>
                                            </Link>
                                        </Nav.Item>
                                    ))}
                                </Nav> */}
                                </Offcanvas.Body>
                            </Offcanvas>
                            <Buttons outline circle onClick={handleShow}>
                                <FontAwesomeIcon icon={faBars} />
                            </Buttons>
                        </div>
                        <div className="header-logo-wrapper">
                            <Logo />
                        </div>
                        <div className="d-block d-lg-none header-user-avatar">
                            <div className="d-flex justify-content-center align-items-center h-100 gap-4">
                                <MainHeaderMenu menuItems={menuItems} />
                                <Cart />
                            </div>
                        </div>
                    </Col>
                    <Col className="d-none d-lg-block inner-search">
                        <Search />
                    </Col>
                    <Col lg={'auto'} className="d-none d-lg-block options">
                        <div className="d-flex justify-content-center align-items-center h-100 gap-4">
                            <MainHeaderMenu menuItems={menuItems} />
                            <Cart />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default MainHeader;
