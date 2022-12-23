import { Col, Container, Row } from 'react-bootstrap';
import './Footer.scss';

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col>
                        <h3>
                            <strong>Về chúng tôi</strong>
                        </h3>
                        <p>
                            Chúng tôi tự hào cung cấp các sản phẩm chính hãng. Nhằm mang đến xu hướng thời trang chính
                            hãng trải rộng toàn quốc, với mong muốn trở thành nơi mua sắm thời trang uy tín với cam kết
                            100% hàng chính hãng.
                        </p>
                    </Col>
                    <Col>
                        <h3>
                            <strong>Liên hệ</strong>
                        </h3>
                        <p>hahahahha</p>
                        <p>hahahahah</p>
                    </Col>
                    <Col>
                        <h3>
                            <strong>thông tin</strong>
                        </h3>
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
