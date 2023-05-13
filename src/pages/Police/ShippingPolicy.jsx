import { Col, Container, Row } from 'react-bootstrap';
import './ShippingPolicy.scss';
function ShippingPolicy() {
    return (
        <Container fluid>
            <Row className="warranty-title-section ">
                <div className="warranty-title-section-bg"></div>
                <div className="warranty-title-section-content">
                    <h2>CHÍNH SÁCH VẬN CHUYỂN</h2>
                    <h3>TẠI MYSHOP</h3>
                    <p>
                        Để tăng thêm sự thuận tiện và dễ dàng cho Quý khách khi mua sắm online, MYSTORE hỗ trợ giao hàng
                        tới tận tay khách hàng trên toàn quốc.
                    </p>
                    <p>E-mail: cskh@mystore.com • Hotline: 1800.6173</p>
                </div>
            </Row>
            <Container className="content-box my-5 shipping-policy-container">
                <div className="text-center">
                    <h2 className="shipping-policy-in">NỘI THÀNH TP.HCM</h2>
                    <p>
                        Nội thành TP. Hồ Chí Minh: Quận 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, Thủ Đức, Tân Phú, Tân
                        Bình, Phú Nhuận, Gò Vấp, Bình Thạnh, Bình Tân.
                    </p>
                </div>
                <Row className="gap-4 mb-5">
                    <Col className="shipping-mothod-normal">
                        <div>
                            <h3 className="text-center">Giao hàng thông thường</h3>
                            <ul>
                                <li>
                                    Phí vận chuyển: <strong>Miễn phí vận chuyển</strong> trong nội thành Tp.Hồ Chí Minh
                                </li>
                                <li>
                                    Thời gian giao hàng : Từ <strong>3 đến 5 ngày </strong> kể từ ngày đặt hàng
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col className="shipping-mothod-fast">
                        <div>
                            <h3 className="text-center">Giao hàng siêu tốc</h3>
                            <ul>
                                <li>
                                    Phí vận chuyển: <strong>100.000 đồng</strong> trong nội thành Tp.Hồ Chí Minh
                                </li>
                                <li>
                                    Thời gian giao hàng : Trong vòng <strong>1 đến 2 ngày</strong> kể từ ngày đặt hàng
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <div className="text-center">
                    <h2>NGOẠI THÀNH</h2>
                </div>
                <Row className="gap-4">
                    <Col className="shipping-mothod-normal">
                        <div>
                            <h3 className="text-center">Giao hàng thông thường</h3>
                            <ul>
                                <li>
                                    Phí vận chuyển: <strong>Miễn phí vận chuyển</strong>
                                </li>
                                <li>
                                    Thời gian giao hàng : Trong vòng <strong>1 tuần </strong> kể từ ngày đặt hàng
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col className="shipping-mothod-fast">
                        <div>
                            <h3 className="text-center">Giao hàng siêu tốc</h3>
                            <ul>
                                <li>
                                    Phí vận chuyển: <strong>100.000 đồng</strong>
                                </li>
                                <li>
                                    Thời gian giao hàng : Trong vòng <strong>3 đến 4 ngày</strong> kể từ ngày đặt hàng
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default ShippingPolicy;
