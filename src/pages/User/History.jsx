import { Col, Container, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HistoryItem = () => {
    return (
        <Container fluid className="history-item-container">
            <Link to={'#'}>
                <Row style={{ color: 'black' }}>
                    <Col>
                        <p className="m-0">#Hình đại diện</p>
                    </Col>
                    <Col className="d-none d-md-block">
                        <p className="m-0">#Ngày đặt hàng</p>
                    </Col>
                    <Col className="d-none d-md-block">
                        <p className="m-0">#Trạng thái</p>
                    </Col>
                    <Col>
                        <p className="m-0">#Tổng giá</p>
                    </Col>
                </Row>
            </Link>
        </Container>
    );
};

function History() {
    return (
        <Container fluid>
            <Stack>
                <div>
                    <h2>Lịch sử mua hàng</h2>
                </div>
                <hr />
                <div className="history-list">
                    <HistoryItem />
                    <hr />
                </div>
            </Stack>
        </Container>
    );
}

export default History;
