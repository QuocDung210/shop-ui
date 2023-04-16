import {
    faBell,
    faBuildingFlag,
    faClockRotateLeft,
    faGauge,
    faRectangleAd,
    faTag,
    faTags,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Navbar, Offcanvas, Row, Stack } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Images from '~/components/Images';
import AdminSidebar from './components/AdminSidebar';
import Tippy from '@tippyjs/react/headless';
import './Admin.scss';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '~/redux/slices/authSlice';
import { toast } from 'react-toastify';
import { noticeApi } from '~/api/noticeApi';
import Buttons from '~/components/Buttons';
import { AuthApi } from '~/api';
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
    {
        icon: <FontAwesomeIcon icon={faRectangleAd} />,
        title: 'Quảng cáo',
        link: 'advertising',
    },
    {
        icon: <FontAwesomeIcon icon={faBuildingFlag} />,
        title: 'Thương hiệu',
        link: 'brand',
    },
    {
        icon: <FontAwesomeIcon icon={faTags} />,
        title: 'Danh mục và dòng máy',
        link: 'category-series',
    },
];

function AdminMainPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [enable, setEnable] = useState(false);
    const [noticeList, setNoticeList] = useState([]);
    const contentBox = useRef(null);
    const [render, setRender] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const top = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await noticeApi.getNoticeUser();
                const resUser = await AuthApi.getProfile();
                setCurrentUser(resUser);
                setNoticeList(res.reverse());
            } catch (err) {
                console.log(err);
                toast.error('Đã xảy ra lỗi.');
            }
        };
        fetch();
    }, [render]);

    const handleToggleMenu = () => {
        setOpen(!open);
    };

    const handleCloseOffCanvas = () => {
        setOpen(false);
    };

    const handleScroll = (e) => {
        if (e.target.scrollTop > 300) {
            setEnable(true);
        } else {
            setEnable(false);
        }
    };

    const handleScrollTop = () => {
        top.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleLogOut = () => {
        dispatch(logoutSuccess());
        navigate('/');
    };

    return (
        <Container fluid className="admin-container">
            <Row>
                <Col xs={2} className="d-none d-lg-block admin-sidebar">
                    <AdminSidebar sbItems={ADMIN_SIDEBAR_ITEMS} />
                </Col>
                <Col className="admin-content" onScroll={handleScroll}>
                    <div ref={top}></div>
                    <Container fluid className="px-0" ref={contentBox}>
                        <Row className="admin-content-top">
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

                            <div xs={2} className="admin-menu">
                                <div className="d-flex align-items-center">
                                    <Tippy
                                        delay={[0, 200]}
                                        placement="bottom-end"
                                        interactive
                                        arrow
                                        zIndex={9999}
                                        trigger="click"
                                        render={(attrs) => (
                                            <Stack gap={4} className="admin-notice-wrapper content-box p-3" {...attrs}>
                                                {noticeList.length > 0 ? (
                                                    noticeList?.map((notice, idx) => (
                                                        <div key={idx} className="admin-notice-option">
                                                            <Images
                                                                src=""
                                                                alt="user"
                                                                className="sender-notice-avatar"
                                                                fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                                                style={{
                                                                    boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)',
                                                                }}
                                                            />
                                                            <div>
                                                                <h3>MyShop</h3>
                                                                <p className="m-0">{notice?.title}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <h3 className="m-0">Không có thông báo</h3>
                                                )}
                                                <Buttons
                                                    disabled={noticeList.length > 0 ? false : true}
                                                    outline
                                                    small
                                                    to={'/admin/notify'}
                                                >
                                                    Xem tất cả
                                                </Buttons>
                                            </Stack>
                                        )}
                                    >
                                        <div
                                            className="d-flex align-items-center"
                                            style={{ position: 'relative' }}
                                            onClick={() => setRender(!render)}
                                        >
                                            <FontAwesomeIcon icon={faBell} className="admin-menu-icon" />
                                            <div className={`notice-quantity ${noticeList.length === 0 && 'd-none'}`}>
                                                {noticeList.length}
                                            </div>
                                        </div>
                                    </Tippy>
                                </div>
                                <div>
                                    <Tippy
                                        trigger="click"
                                        delay={[0, 200]}
                                        placement="bottom-end"
                                        interactive
                                        arrow
                                        render={(attrs) => (
                                            <Stack className="admin-avatar-menu content-box p-3" {...attrs}>
                                                <Link to={'/admin/member-profile'}>
                                                    <div className="admin-avatar-menu-option">Người dùng</div>
                                                </Link>
                                                <div className="admin-avatar-menu-option" onClick={handleLogOut}>
                                                    Đăng xuất
                                                </div>
                                            </Stack>
                                        )}
                                    >
                                        <Images
                                            src={currentUser?.img || ''}
                                            alt="user"
                                            className="admin-avatar"
                                            fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                            style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                                        />
                                    </Tippy>
                                </div>
                            </div>
                        </Row>
                        <Row className="admin-content-bottom m-4">
                            <Outlet />
                        </Row>
                    </Container>
                    <div className={`btn-go-top ${!enable && 'd-none'}`} onClick={handleScrollTop}>
                        <FontAwesomeIcon icon={faArrowAltCircleUp} className="btn-go-top-icon" />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminMainPage;
