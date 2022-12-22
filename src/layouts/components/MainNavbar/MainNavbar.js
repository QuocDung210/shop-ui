import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './MainNavbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Popper/Menu';
import MainNavItem from './MainNavItem';

function MainNavbar({ navList, handleOpenOffcanvas }) {
    return (
        <Container fluid className="p-0 header-nav">
            <Nav as="ul" className="d-none d-lg-flex header-main-nav">
                {navList.map((navItem, idx) => (
                    <Nav.Item as="li" key={idx} className="d-flex align-items-center nav-item">
                        <Link to={navItem.link}>
                            {navItem.items ? (
                                <Menu items={navItem.items} placement={'bottom-start'}>
                                    <div className="d-flex">
                                        <span className="me-1 nav-item-label">{navItem.label}</span>
                                        <div className="nav-item-icon ">
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        </div>
                                    </div>
                                </Menu>
                            ) : (
                                <span className="nav-item-label">{navItem.label}</span>
                            )}
                        </Link>
                    </Nav.Item>
                ))}
            </Nav>
            <div className="d-block d-lg-none">
                <MainNavItem navItems={navList} handleOpenOffcanvas={handleOpenOffcanvas} />
            </div>
        </Container>
    );
}

export default MainNavbar;
