import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '~/config';
import './MainNavbar.scss';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Popper/Menu';

const NavList = [
    {
        label: 'TRANG CHỦ',
        link: config.routes.home,
    },
    {
        label: 'SẢN PHẨM',
        link: config.routes.store,
        items: [
            {
                title: 'Quần áo nam',
                to: '/profile',
                separateBottom: true,
            },
            { title: 'Quần áo nữ', to: '/profile', separateBottom: true },
            { title: 'Vest', to: '/profile' },
        ],
    },
    {
        label: 'GIỚI THIỆU',
        link: config.routes.introduce,
    },
    {
        label: 'LIÊN HỆ',
        link: config.routes.contact,
    },
];

function MainNavbar() {
    const [showNavMini, setShowNavMini] = useState(false);
    const handleShowNavMini = () => {
        setShowNavMini(true);
    };
    const handleClose = () => {
        setShowNavMini(false);
    };
    return (
        <Container fluid className="d-none d-lg-block main__navbar">
            <Container>
                <Row>
                    <Col className="d-block d-lg-none p-0">
                        <Offcanvas show={showNavMini} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Menu</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                        <Button variant="outline-success">Search</Button>
                                    </Form>
                                </div>
                                <Nav as="ul" className="d-flex flex-column">
                                    {NavList.map((navItem, idx) => (
                                        <Nav.Item as="li" key={idx} className=" m-4">
                                            <Link to={navItem.link}>
                                                <span className="nav__item-label">{navItem.label}</span>
                                            </Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </Offcanvas.Body>
                        </Offcanvas>
                        <Buttons outline circle onClick={() => handleShowNavMini()}>
                            <FontAwesomeIcon icon={faBars} />
                        </Buttons>
                    </Col>
                    <Col className="d-none d-lg-block p-0">
                        <Nav as="ul">
                            {NavList.map((navItem, idx) => (
                                <Nav.Item as="li" key={idx} className="nav__item m-4">
                                    <Link to={navItem.link}>
                                        {navItem.items ? (
                                            <Menu items={navItem.items} placement={'bottom-start'}>
                                                <div className="d-flex align-items-center justify-content-center ">
                                                    <span className="me-3 nav__item-label">{navItem.label}</span>
                                                    <div className="nav-item-icon">
                                                        <FontAwesomeIcon icon={faChevronUp} />
                                                    </div>
                                                </div>
                                            </Menu>
                                        ) : (
                                            <span className="nav__item-label">{navItem.label}</span>
                                        )}
                                    </Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default MainNavbar;
