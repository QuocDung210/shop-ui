import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import { Container, Row, Stack } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import { userApi } from '~/api/userApi';
import useAuth from '~/hooks/useAuth';
import { toast } from 'react-toastify';
import './AddNotify.scss';
import images from '~/assets/images';
function AddNotify() {
    const [descriptionUser, setDescriptionUser] = useState('');
    const [descriptionRole, setDescriptionRole] = useState('');
    const [targetRole, setTargetRole] = useState(0);
    const [userList, setUserList] = useState([]);
    const [selected, setSelected] = useState(null);
    const auth = useAuth();
    const configHeader = {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
    };

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const allUser = await userApi.getAll(configHeader);
                setUserList(allUser);
            } catch (err) {
                toast.error('Có lỗi xảy ra.');
            }
        };
        fetchAllUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreactNoticeRole = () => {
        console.log(descriptionRole);
    };
    const handleCreactNoticeUser = () => {
        console.log(descriptionUser);
    };
    return (
        <Container fluid className="add-notice-container">
            <h2>Tạo thông báo</h2>
            <Row className="mb-4">
                <Stack gap={4} className="content-box">
                    <h3>Tạo thông báo theo quyền</h3>
                    <div>
                        <h4>Chọn đối tượng</h4>
                        <div className="d-flex flex-wrap gap-3">
                            <div>
                                <Buttons
                                    outline={targetRole !== 0}
                                    primary={targetRole === 0}
                                    onClick={() => setTargetRole(0)}
                                >
                                    Khách hàng
                                </Buttons>
                            </div>
                            <div>
                                <Buttons
                                    outline={targetRole !== 1}
                                    primary={targetRole === 1}
                                    onClick={() => setTargetRole(1)}
                                >
                                    Nhân viên
                                </Buttons>
                            </div>
                            <div>
                                <Buttons
                                    outline={targetRole !== 2}
                                    primary={targetRole === 2}
                                    onClick={() => setTargetRole(2)}
                                >
                                    Quản trị viên
                                </Buttons>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>Nội dung</h4>
                        <CKEditor
                            editor={ClassicEditor}
                            data={descriptionRole}
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                // console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescriptionRole(data);
                            }}
                            onBlur={(event, editor) => {
                                // console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                // console.log('Focus.', editor);
                            }}
                        />
                    </div>
                    <Buttons primary onClick={handleCreactNoticeRole}>
                        Tạo thông báo
                    </Buttons>
                </Stack>
            </Row>
            <Row>
                <Stack gap={4} className="content-box">
                    <h3>Tạo thông báo cho cá nhân</h3>
                    <div>
                        <h4>Danh sách người dùng</h4>
                        <Stack gap={3} className="notice-user-list">
                            {userList.map((user, idx) => (
                                <div
                                    key={idx}
                                    className={`notice-user d-flex align-items-center ${
                                        selected?.phone === user.phone && 'selected'
                                    }`}
                                    onClick={() => setSelected(user)}
                                >
                                    <img className="notice-user-avatar" src={images.errorImg} alt="img" />
                                    <div className="ms-4 flex-fill d-flex flex-column gap-3">
                                        <p className="m-0 notice-user-name">{user?.name}</p>
                                        <div className="d-flex flex-wrap gap-5">
                                            <p className="m-0">
                                                Số điện thoại: <strong>{user?.phone}</strong>
                                            </p>
                                            <p className="m-0">
                                                Email: <strong>{user?.email}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Stack>
                    </div>
                    <Stack gap={3}>
                        <h4>Người nhận</h4>
                        <div className={`${selected ? 'd-flex' : 'd-none'} align-items-center `}>
                            <img className="notice-target-user-avatar" src={images.errorImg} alt="img" />
                            <div className="ms-4 flex-fill d-flex flex-column gap-3">
                                <p className="notice-selected-name m-0">{selected?.name}</p>
                                <div className="d-flex flex-wrap gap-5">
                                    <p className="m-0">
                                        Số điện thoại: <strong>{selected?.phone}</strong>
                                    </p>
                                    <p className="m-0">
                                        Email: <strong>{selected?.email}</strong>
                                    </p>
                                </div>
                                <p className="noticep-selected-role m-0">{selected?.role}</p>
                            </div>
                        </div>
                        <h4>Nội dung</h4>
                        <CKEditor
                            editor={ClassicEditor}
                            data={descriptionUser}
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                // console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescriptionUser(data);
                            }}
                            onBlur={(event, editor) => {
                                // console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                // console.log('Focus.', editor);
                            }}
                        />
                    </Stack>
                    <Buttons primary onClick={handleCreactNoticeUser}>
                        Tạo thông báo
                    </Buttons>
                </Stack>
            </Row>
        </Container>
    );
}

export default AddNotify;
