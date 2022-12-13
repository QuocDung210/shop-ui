import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Col, Container, Nav, Offcanvas, Row } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import Images from '~/components/Images';
import Menu from '~/components/Popper/Menu';
import config from '~/config';
import { Link } from 'react-router-dom';

import './Header.scss';
import { useState } from 'react';

function MainHeaderMenu({ menuItems }) {
    const currentUser = false;
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Người dùng',
            to: '/profile',
            separateBottom: true,
        },
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Đăng xuất',
            separateTop: true,
        },
    ];
    const [showMenu, setShowMenu] = useState(false);
    // const [showCart, setShowCart] = useState(false);
    const handleShowMenu = () => {
        setShowMenu(true);
    };
    // const handleShowCart = () => {
    //     setShowCart(true);
    // };

    const handleCloseMenu = () => {
        setShowMenu(false);
    };
    // const handleCloseCart = () => {
    //     setShowCart(false);
    // };
    return (
        <Container fluid className="p-0 h-100">
            <Row className="d-none d-lg-block h-100">
                {currentUser ? (
                    <Col className="d-flex justify-content-end align-items-center options__list">
                        <Link>
                            <p className="mb-0 d-none d-sm-block header-user-name">tên người dùng</p>
                        </Link>
                        <Menu items={userMenu} placement={'bottom-end'}>
                            <Images
                                src=""
                                alt="user"
                                className="current-user"
                                fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                            />
                        </Menu>
                    </Col>
                ) : (
                    <Col className="d-flex justify-content-end align-items-center options__list">
                        <Buttons rounded to={config.routes.register}>
                            Register
                        </Buttons>
                        <Buttons primary rounded to={config.routes.login}>
                            Log in
                        </Buttons>
                    </Col>
                )}
            </Row>
            <Row className="d-block d-lg-none h-100">
                <Offcanvas show={showMenu} onHide={handleCloseMenu} backdrop="static">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav as="ul" className="d-flex flex-column">
                            {userMenu.map((userMenuItem, idx) => (
                                <Nav.Item as="li" key={idx} className=" m-4">
                                    <Link to={userMenuItem.to}>
                                        <div className="user-menu-item">
                                            {userMenuItem.icon}
                                            <span className="nav__item-label">{userMenuItem.title}</span>
                                        </div>
                                    </Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
                <Col style={{ zIndex: '1000' }} className="d-flex justify-content-end align-items-center options__list">
                    {currentUser && <p className="mb-0 d-none d-md-block header-user-name">tên người dùng</p>}
                    <div onClick={handleShowMenu}>
                        {currentUser ? (
                            <Images
                                src=""
                                alt="user"
                                className=" current-user"
                                fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                            />
                        ) : (
                            <div
                                className="d-flex justify-content-center align-items-center current-user"
                                onClick={handleShowMenu}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default MainHeaderMenu;
