import { faCartShopping, faClock, faKey, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Outlet } from 'react-router-dom';
import config from '~/config';
import './User.scss';

const { Container, Row, Col, Stack } = require('react-bootstrap');

const DASH_BOARD_MENU = [
    {
        title: 'Thông tin tài khoản',
        icon: <FontAwesomeIcon icon={faUser} />,
        link: config.routes.userDetail,
    },
    {
        title: 'Đổi mật khẩu',
        icon: <FontAwesomeIcon icon={faKey} />,
        link: config.routes.changePassword,
    },
    {
        title: 'Lịch sử mua hàng',
        icon: <FontAwesomeIcon icon={faClock} />,
        link: config.routes.history,
    },
    {
        title: 'Giỏ hàng',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
    },
    {
        title: 'Đăng xuất',
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    },
];

function User() {
    return (
        <Container fluid>
            <Container className="mt-3">
                <Row>
                    <Col md={3} className="db-menu p-0 d-none d-md-block">
                        <Stack>
                            {DASH_BOARD_MENU.map((item, idx) => (
                                <Link to={item.link} className="d-flex align-items-center db-menu-item" key={idx}>
                                    <div className="db-menu-item-icon">{item.icon}</div>
                                    <div className="db-menu-item-title">{item.title}</div>
                                </Link>
                            ))}
                        </Stack>
                    </Col>
                    <Col className="db-menu p-0 d-block d-md-none" xs={2}>
                        <Stack>
                            {DASH_BOARD_MENU.map((item, idx) => (
                                <Link
                                    to={item.link}
                                    className="d-flex align-items-center justify-content-center db-menu-item"
                                    key={idx}
                                >
                                    <div className="db-menu-item-icon p-0">{item.icon}</div>
                                </Link>
                            ))}
                        </Stack>
                    </Col>
                    <Col md={9} xs={10}>
                        <div className="db-content">
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default User;
