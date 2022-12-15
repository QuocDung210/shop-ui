import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './MainNavbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Popper/Menu';

function MainNavbar({ navList }) {
    return (
        <Container fluid className="  main__navbar">
            <Nav as="ul">
                {navList.map((navItem, idx) => (
                    <Nav.Item as="li" key={idx} className="d-flex align-items-center nav__item">
                        <Link to={navItem.link}>
                            {navItem.items ? (
                                <Menu items={navItem.items} placement={'bottom-start'}>
                                    <div className="d-flex">
                                        <span className="me-3 nav__item-label">{navItem.label}</span>
                                        <div className="nav-item-icon ">
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
        </Container>
    );
}

export default MainNavbar;
