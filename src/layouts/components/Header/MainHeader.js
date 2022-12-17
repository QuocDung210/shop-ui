import Search from '../Search/Search';
import 'tippy.js/dist/tippy.css';
import Logo from '~/components/Logo';
import { Container, Navbar, Offcanvas } from 'react-bootstrap';
import MainHeaderMenu from './MainHeaderMenu';
import Cart from '../Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import MainNavbar from '../MainNavbar';
import Tippy from '@tippyjs/react/headless';

function MainHeader({ menuItems, navList }) {
    return (
        <Container fluid className="d-flex align-items-center p-0 main-header">
            <Container className="p-0 main-header-wrapper">
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand>
                            <div className="me-5 header-logo-wrapper">
                                <Logo />
                            </div>
                        </Navbar.Brand>
                        <div className="d-flex gap-3">
                            <div className="d-block d-lg-none">
                                <Cart />
                            </div>
                            <Navbar.Toggle aria-controls="offcanvasNavbar" />
                        </div>
                        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby={`offcanvasNavbarLabel`}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel`}>Menu</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="p-0">
                                <div className="d-none d-lg-flex align-items-center gap-4 w-100">
                                    <div className="flex-fill">
                                        <MainNavbar navList={navList} />
                                    </div>
                                    <div>
                                        <Tippy
                                            delay={[0, 500]}
                                            placement="bottom-end"
                                            interactive
                                            arrow
                                            render={(attrs) => (
                                                <div className="nav-search-popper" {...attrs}>
                                                    <Search />
                                                </div>
                                            )}
                                        >
                                            <div className="nav-search-icon">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </div>
                                        </Tippy>
                                    </div>

                                    <MainHeaderMenu menuItems={menuItems} />

                                    <Cart />
                                </div>
                                <div className="d-flex flex-column d-lg-none">
                                    <div className="my-4">
                                        <Search />
                                    </div>
                                    <div>
                                        <MainNavbar navList={navList} />
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </Container>
        </Container>
    );
}

export default MainHeader;
