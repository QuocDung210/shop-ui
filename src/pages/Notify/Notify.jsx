import { Col, Container, Row, Stack } from 'react-bootstrap';
import './Notify.scss';
import NotifyItem from './NotifyItem';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { noticeApi } from '~/api/noticeApi';
import parse from 'html-react-parser';
function AdminNotify() {
    const [noticeList, setNoticeList] = useState([]);
    const [selected, setSelected] = useState({});
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await noticeApi.getNoticeUser();
                setNoticeList(res?.reverse());
                setSelected(res[res.length - 1]);
            } catch (err) {
                console.log(err);
                toast.error('Có lỗi xảy ra.');
            }
        };
        fetch();
    }, []);
    return (
        <Container fluid>
            <Container>
                <Row>
                    <h2 className="m-0">THÔNG BÁO</h2>
                </Row>
                <Row className="g-3 mt-2 mb-4">
                    <Col xs={12} md={4}>
                        <div className="content-box">
                            <h3>Tất cả thông báo</h3>
                            <div className="all-notify">
                                <Stack gap={3}>
                                    {noticeList?.length > 0 &&
                                        noticeList.map((notice, idx) => (
                                            <div
                                                className={`${selected?.id === notice?.id && 'selected'}`}
                                                key={idx}
                                                onClick={() => setSelected(notice)}
                                            >
                                                <NotifyItem notice={notice} />
                                            </div>
                                        ))}
                                </Stack>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="content-box">
                            <h3>{selected?.title}</h3>
                            <div className="user-notify-message-container">{parse(`${selected?.message}`)}</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default AdminNotify;
