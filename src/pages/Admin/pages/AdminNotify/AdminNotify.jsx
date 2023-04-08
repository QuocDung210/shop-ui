import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import './AdminNotify.scss';
import { useState } from 'react';
import useAuth from '~/hooks/useAuth';
import Images from '~/components/Images';
function AdminNotify() {
    const [noticeList, setNoticeList] = useState([1, 3, 4, 2, 1, 2, 3, 4, 5]);
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
                <Col className="notify-list content-box " md={4} xs={12}>
                    <Stack gap={4}>
                        <h3>Danh sách thông báo</h3>
                        <Stack gap={4} style={{ maxHeight: '400px', overflow: 'overlay' }}>
                            {noticeList.map((notice, idx) => (
                                <div key={idx} className="admin-notify-item d-flex align-items-center ">
                                    <Images
                                        src=""
                                        alt="user"
                                        className="admin-notice-avatar"
                                        fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                        style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                                    />
                                    <div className="notify-item-title flex-fill">
                                        <h4>#Tiêu đề</h4>
                                        <p className="m-0">#loại thông báo</p>
                                    </div>
                                </div>
                            ))}
                        </Stack>
                    </Stack>
                </Col>
                <Col className="notify-detail content-box ">
                    <p>Title</p>
                    <div>hahah</div>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminNotify;
