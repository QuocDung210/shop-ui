import { Container, Row } from 'react-bootstrap';
import './PolicePage.scss';
import Buttons from '~/components/Buttons';
import { Outlet } from 'react-router-dom';
function PolicyPage() {
    return (
        <Container fluid>
            <Row className="police-page-nav mb-5 content-box">
                <p>
                    CHÍNH SÁCH <strong>MyStore</strong>
                </p>
                <div className="d-flex justify-content-center">
                    <Buttons to={'/police/chinh-sach-bao-hanh'} outline>
                        Chính sách bảo hành
                    </Buttons>
                    <Buttons to={'/police/chinh-sach-van-chuyen'} outline>
                        Chính sách vận chuyển
                    </Buttons>
                </div>
            </Row>
            <Row className="police-page-content">
                <Outlet />
            </Row>
        </Container>
    );
}

export default PolicyPage;
