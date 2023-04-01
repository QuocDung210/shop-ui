import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import './AdminNotify.scss';
function AdminNotify() {
    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <h2>Thông báo</h2>
                </Col>
                <Col className="text-end">
                    <Buttons primary leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Tạo thông báo
                    </Buttons>
                </Col>
            </Row>
            <Row className="gap-4">
                <Col className="notify-list content-box" md={4} xs={12}>
                    hahahah
                </Col>
                <Col className="notify-detail content-box flex-fill">hohooh</Col>
            </Row>
        </Container>
    );
}

export default AdminNotify;
