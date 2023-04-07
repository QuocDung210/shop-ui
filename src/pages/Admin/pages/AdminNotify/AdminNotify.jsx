import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import './AdminNotify.scss';
import { useState } from 'react';
import useAuth from '~/hooks/useAuth';
function AdminNotify() {
    const [noticeList, setNoticeList] = useState([]);
    const [selected, setSelected] = useState(0);
    const auth = useAuth();
    const configHeader = {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
    };

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <h2>Thông báo</h2>
                </Col>
                <Col className="text-end">
                    <Buttons primary to={'/admin/add-notify'} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Tạo thông báo
                    </Buttons>
                </Col>
            </Row>
            <Row className="gap-4">
                <Col className="notify-list content-box" md={4} xs={12}>
                    <Stack>
                        <h3>Danh sách thông báo</h3>
                        <div>
                            {noticeList.map((notice, idx) => (
                                <div></div>
                            ))}
                        </div>
                    </Stack>
                </Col>
                <Col className="notify-detail content-box ">hohooh</Col>
            </Row>
        </Container>
    );
}

export default AdminNotify;
