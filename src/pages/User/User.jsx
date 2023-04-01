import { faCartShopping, faClock, faKey, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import config from '~/config';
import { logoutFailed, logoutSuccess, startLogout } from '~/redux/slices/authSlice';
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
        link: '#',
    },
];

function User() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logoutSuccess());
        navigate('/');
    };

    return (
        <Container fluid>
            <Container className="my-4">
                <Row className="g-4">
                    <Col md={3} className="content-box p-0">
                        <Stack>
                            {DASH_BOARD_MENU.map((item, idx) => (
                                <Link to={item.link} className="d-flex align-items-center db-menu-item" key={idx}>
                                    <div className="db-menu-item-icon">{item.icon}</div>
                                    <div className="db-menu-item-title">{item.title}</div>
                                </Link>
                            ))}
                            <div className="d-flex align-items-center db-menu-item" onClick={handleLogOut}>
                                <div className="db-menu-item-icon">
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </div>
                                <div className="db-menu-item-title">Đăng xuất</div>
                            </div>
                        </Stack>
                    </Col>
                    <Col className="content-box">
                        <div>
                            <Outlet />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default User;
