import { Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import './MainNavbar.scss';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Menu from '~/components/Popper/Menu';
import MainNavItem from './MainNavItem';

const OFFCANVAS_NAV = [
    {
        link: config.routes.register,
        label: 'ĐĂNG KÝ',
    },
    {
        link: config.routes.login,
        label: 'ĐĂNG NHẬP',
    },
];

const USER_NAV = [
    {
        link: config.routes.userDetail,
        label: 'TÀI KHOẢN',
    },
    {
        link: config.routes.userDetail,
        label: 'ĐĂNG XUẤT',
    },
];

function MainNavbar({ navList, handleOpenOffcanvas }) {
    const navigate = useNavigate();
    const user = false;

    const offNav = user ? [...navList, ...USER_NAV] : [...navList, ...OFFCANVAS_NAV];

    const handleClickNavItem = (navItem) => {
        handleOpenOffcanvas();
        navigate(navItem.link);
    };

    return (
        <Container fluid className="p-0 header-nav">
            <Nav as="ul" className="d-none d-lg-flex header-main-nav">
                {navList.map((navItem, idx) => (
                    <Nav.Item as="li" key={idx} className="d-flex align-items-center nav-item ">
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
                <Nav as="ul" className=" header-offcanvas-nav">
                    {offNav.map((navItem, idx) => (
                        <Nav.Item as="li" className="d-flex m-0 nav-item" key={idx}>
                            {navItem.items ? (
                                <MainNavItem
                                    item={navItem}
                                    handleOpenOffcanvas={handleOpenOffcanvas}
                                    handleClickNavItem={handleClickNavItem}
                                />
                            ) : (
                                <span className="nav-item-label" onClick={() => handleClickNavItem(navItem)}>
                                    {navItem.label}
                                </span>
                            )}
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
        </Container>
    );
}

export default MainNavbar;
