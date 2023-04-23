import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import './AdminNotify.scss';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { noticeApi } from '~/api/noticeApi';
import { toast } from 'react-toastify';
import useAuth from '~/hooks/useAuth';
import Images from '~/components/Images';
import config from '~/config';
function AdminNotify() {
    const [noticeList, setNoticeList] = useState([]);
    const [selected, setSelected] = useState(null);
    const auth = useAuth();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await noticeApi.getNoticeAdmin();
                setNoticeList(res.reverse());
                setSelected(res[0]);
            } catch (err) {
                console.log(err);
                toast.error('Có lỗi xảy ra.');
            }
        };
        fetch();
    }, []);

    const handleDeleteNotice = async () => {
        try {
            await noticeApi.deleteNotice(selected?.id);
            setNoticeList(noticeList.filter((item) => item?.id !== selected?.id));
            setSelected(null);
            toast.success('Đã xóa thành công.');
        } catch (err) {
            console.log(err);
            toast.error('Đã xảy ra lỗi.');
        }
    };

    return (
        <Container fluid className="admin-notify-container">
            <Row className="mb-4">
                <Col>
                    <h2>Thông báo</h2>
                </Col>
                <Col className=" d-flex flex-wrap justify-content-end gap-4">
                    <div>
                        <Buttons
                            primary
                            to={`/admin/${config.routes.addNotify}`}
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        >
                            Tạo thông báo
                        </Buttons>
                    </div>
                    <div>
                        <Buttons
                            outline
                            disabled={auth?.user?.role === 'admin' ? false : true}
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={handleDeleteNotice}
                        >
                            Xóa thông báo
                        </Buttons>
                    </div>
                </Col>
            </Row>
            <Row className="gap-4">
                <Col className="notify-list content-box " md={4} xs={12}>
                    <Stack gap={4}>
                        <h3>Danh sách thông báo</h3>
                        <Stack gap={4} style={{ maxHeight: '400px', overflow: 'overlay' }}>
                            {noticeList.map((notice, idx) => (
                                <div
                                    key={idx}
                                    className={`admin-notify-item  ${selected?.id === notice?.id && 'selected'}`}
                                    onClick={() => setSelected(notice)}
                                >
                                    <Images
                                        src=""
                                        alt="user"
                                        className="notify-item-avatar"
                                        fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                        style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                                    />
                                    <div className="notify-item-title">
                                        <h3>{notice?.role}</h3>
                                        <p>{notice?.title}</p>
                                    </div>
                                </div>
                            ))}
                        </Stack>
                    </Stack>
                </Col>
                <Col className="notify-detail content-box ">
                    <div>
                        <h3>{selected?.title}</h3>
                        {selected ? parse(`${selected?.message}`) : <h2 className="m-0">Không có thông báo</h2>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminNotify;
