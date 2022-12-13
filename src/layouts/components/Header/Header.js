import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp, faRegistered, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import 'tippy.js/dist/tippy.css';
import TopHeader from './TopHeader';
import MainHeader from './MainHeader';
import { Col, Container, Row } from 'react-bootstrap';
import config from '~/config';
import { useEffect, useRef } from 'react';
const MENU_ITEMS = [
    // {
    //     icon: <FontAwesomeIcon icon={faGear} />,
    //     title: 'Cài đặt',
    //     children: {
    //         title: 'Cài đặt',
    //         data: [
    //             {
    //                 code: 'en',
    //                 title: 'English',
    //             },
    //             {
    //                 code: 'vi',
    //                 title: 'Vietnamese',
    //             },
    //         ],
    //     },
    // },
    // {
    //     icon: <FontAwesomeIcon icon={faCircleInfo} />,
    //     title: 'Thông tin',
    //     to: '/',
    // },
    {
        icon: <FontAwesomeIcon icon={faRightToBracket} />,
        title: 'Đăng nhập',
        to: config.routes.login,
    },
    {
        icon: <FontAwesomeIcon icon={faRegistered} />,
        title: 'Đăng ký',
        to: config.routes.register,
    },
];

function Header() {
    const ref = useRef(null);
    useEffect(() => {
        window.addEventListener('scroll', (event) => {
            if (ref.current) {
                if (window.scrollY >= 50) {
                    ref.current.classList.remove('d-none');
                } else {
                    ref.current.classList.add('d-none');
                }
            }
        });
    });
    return (
        <header className="p-0 header-container">
            <Container fluid className="header-wrapper">
                <Row className="d-flex flex-column p-0">
                    <Col className="p-0">
                        <TopHeader />
                    </Col>
                    <Col className="p-0">
                        <MainHeader menuItems={MENU_ITEMS} />
                    </Col>
                    <Col className="d-none p-0 header-fixed-container" ref={ref}>
                        <MainHeader menuItems={MENU_ITEMS} />
                    </Col>
                </Row>
                <div className="d-none go-to-top">
                    <FontAwesomeIcon icon={faCircleChevronUp} />
                </div>
            </Container>
        </header>
    );
}

export default Header;
