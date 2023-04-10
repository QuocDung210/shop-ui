import Search from '../Search/Search';
import 'tippy.js/dist/tippy.css';
import Logo from '~/components/Logo';
import { Container, Navbar, Offcanvas, Stack } from 'react-bootstrap';
import MainHeaderMenu from './MainHeaderMenu';
import Cart from '../Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBox, faSearch } from '@fortawesome/free-solid-svg-icons';

import MainNavbar from '../MainNavbar';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import Buttons from '~/components/Buttons';
import { cartApi } from '~/api';
import useAuth from '~/hooks/useAuth';
import { toast } from 'react-toastify';
import CartItem from '../Cart/CartItem';
import config from '~/config';
import { noticeApi } from '~/api/noticeApi';
import parse from 'html-react-parser';

function MainHeader({ menuItems, navList }) {
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [show, setShow] = useState(false);
    const [noticeList, setNoticeList] = useState([]);
    const auth = useAuth();
    const [render, setRender] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            if (auth) {
                try {
                    const res = await cartApi.getCart({
                        headers: { Authorization: `Bearer ${auth?.accessToken}` },
                    });
                    setCartItems(res);
                    const noticeRes = await noticeApi.getNoticeUser();

                    setNoticeList(noticeRes);
                } catch (err) {
                    toast.error('Error.');
                }
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [render]);
    const toggleMenu = () => {
        setOpen(!open);
    };

    const handleOpenOffcanvas = () => {
        setOpen(false);
    };

    return (
        <Container fluid className="d-flex align-items-center p-0 main-header">
            <Container className="p-0 main-header-wrapper">
                <Navbar bg="light" expand="lg" className="main-header-nav">
                    <Container fluid>
                        <Navbar.Brand>
                            <div className="me-5 header-logo-wrapper">
                                <Logo />
                            </div>
                        </Navbar.Brand>

                        <div className="d-flex gap-3">
                            <div className="d-block d-lg-none">
                                <Cart handleShow={() => setShow(!show)} />
                            </div>
                            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={toggleMenu} />
                        </div>
                        <Navbar.Offcanvas show={open} id="offcanvasNavbar" aria-labelledby={`offcanvasNavbarLabel`}>
                            <Offcanvas.Header closeButton onHide={() => setOpen(false)}>
                                <Offcanvas.Title id={`offcanvasNavbarLabel`}>Menu</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="p-0">
                                <div className="d-none d-lg-flex align-items-center gap-4 w-100">
                                    <div className="flex-fill">
                                        <MainNavbar navList={navList} />
                                    </div>
                                    <div>
                                        <Tippy
                                            trigger="click"
                                            delay={[0, 300]}
                                            placement="bottom-end"
                                            interactive
                                            arrow
                                            render={(attrs) => (
                                                <Stack gap={4} className="nav-notify-popper content-box p-3" {...attrs}>
                                                    {noticeList.length > 0 ? (
                                                        noticeList?.map((notice, idx) => (
                                                            <div key={idx} className="admin-notice-option">
                                                                <h3 className="m-0">{notice?.title}</h3>
                                                                <div>{parse(notice?.message)}</div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <h3 className="m-0">Không có thông báo</h3>
                                                    )}
                                                    <Buttons
                                                        disabled={noticeList.length > 0 ? false : true}
                                                        outline
                                                        small
                                                        to={'/notify'}
                                                    >
                                                        Xem tất cả
                                                    </Buttons>
                                                </Stack>
                                            )}
                                        >
                                            <div
                                                className="nav-notify-icon"
                                                onClick={() => setRender(!render)}
                                                style={{ position: 'relative' }}
                                            >
                                                <FontAwesomeIcon icon={faBell} />
                                                <div
                                                    className={`notice-quantity-user ${
                                                        noticeList.length === 0 && 'd-none'
                                                    }`}
                                                >
                                                    {noticeList.length}
                                                </div>
                                            </div>
                                        </Tippy>
                                    </div>
                                    <div>
                                        <Tippy
                                            trigger="click"
                                            delay={[0, 100]}
                                            placement="bottom-end"
                                            interactive
                                            arrow
                                            render={(attrs) => (
                                                <div className="nav-search-popper" {...attrs}>
                                                    <Search handleOpenOffcanvas={handleOpenOffcanvas} />
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
                                        <Search handleOpenOffcanvas={handleOpenOffcanvas} />
                                    </div>
                                    <div>
                                        <MainNavbar navList={navList} handleOpenOffcanvas={handleOpenOffcanvas} />
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
                <div className={`d-lg-none ${show ? 'd-block' : 'd-none'}`}>
                    <Stack gap={3} className="cart-list content-box p-0">
                        <div className="cart-list-header d-flex align-items-center gap-3 p-4 ">
                            <FontAwesomeIcon icon={faBox} />
                            <h3 className="m-0">Giỏ hàng</h3>
                        </div>

                        <Stack gap={3} className="p-3">
                            {cartItems && cartItems?.result?.map((item, idx) => <CartItem item={item} key={idx} />)}
                        </Stack>
                        <div className="text-center p-4" style={{ borderTop: '1px solid #ccc' }}>
                            <Buttons primary to={config.routes.order} onClick={() => setShow(!show)}>
                                {`Thanh toán ${cartItems?.result?.reduce((total, num) => {
                                    return total + num.product.price;
                                }, 0)} đ`}
                            </Buttons>
                        </div>
                    </Stack>
                </div>
            </Container>
        </Container>
    );
}

export default MainHeader;
