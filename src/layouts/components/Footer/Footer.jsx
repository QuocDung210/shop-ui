import { Col, Container, Row } from 'react-bootstrap';
import './Footer.scss';
import Logo from '~/components/Logo';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faMap, faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col>
                        <div>
                            <Logo />
                        </div>
                        <p>
                            Chúng tôi tự hào cung cấp các sản phẩm chính hãng. Nhằm mang đến xu hướng thời trang chính
                            hãng trải rộng toàn quốc, với mong muốn trở thành nơi mua sắm thời trang uy tín với cam kết
                            100% hàng chính hãng.
                        </p>
                    </Col>
                    <Col>
                        <h3>
                            <strong>VỀ MyStore</strong>
                        </h3>
                        <Link to={'#'}>
                            <p>Giới thiệu</p>
                        </Link>
                        <Link to={'#'}>
                            <p>Tuyển dụng</p>
                        </Link>
                        <Link to={'#'}>
                            <p>chính sách bảo mật</p>
                        </Link>
                        <Link to={'#'}>
                            <p>Điều khoản dịch vụ</p>
                        </Link>
                    </Col>
                    <Col className="d-flex flex-column gap-3">
                        <h3>
                            <strong>LIÊN HỆ</strong>
                        </h3>
                        <div className="d-flex align-items-center gap-4">
                            <FontAwesomeIcon icon={faPhone} />
                            <Link to="#">
                                <p className="m-0">0123 456 789</p>
                            </Link>
                        </div>
                        <div className="d-flex align-items-center gap-4">
                            <FontAwesomeIcon icon={faMailBulk} />
                            <Link to="#">
                                <p className="m-0">habaxa0122@gmail.com</p>
                            </Link>
                        </div>
                        <div className="d-flex align-items-center gap-4">
                            <FontAwesomeIcon icon={faMap} />
                            <Link to="#">
                                <p className="m-0">
                                    Đường số 2 Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam
                                </p>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="p-0">
                <Row>
                    <div className="footer-bottom"></div>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
