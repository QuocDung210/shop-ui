import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import { AuthApi } from '~/api';
import Buttons from '~/components/Buttons';
import ProfileForm from '~/components/Form/profile-form';
import Images from '~/components/Images';
import './MemberProfile.scss';
import { toast } from 'react-toastify';
import { FirebaseService } from '~/firebase/firebaseService';
import ChangePasswordForm from '~/components/Form/change-password-form';
function Profile() {
    const [show, setShow] = useState(false);
    const [changePwShow, setChangePwShow] = useState(false);
    const [profile, setProfile] = useState({});
    const [img, setImg] = useState('');
    const handleUpdate = () => {
        setShow(false);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await AuthApi.getProfile();
                setProfile(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeAvatar = async (e) => {
        setImg(URL.createObjectURL(e.target.files[0]));
        try {
            const url = await FirebaseService.uploadImg([e.target.files[0]], 'UserAvatar');

            await AuthApi.updateAvatar(url[0]);

            toast.success('Thay đổi ảnh thành công.');
        } catch (err) {
            toast.error('Có lỗi xảy ra.');
        }
    };

    return (
        <Container fluid className="content-box">
            <Stack>
                <div>
                    <h2>HỒ SƠ</h2>
                    <p>Quản lý thông tin</p>
                </div>
                <hr />
                <Row className="g-4">
                    <Col className="text-center" style={{ position: 'relative' }}>
                        <Images
                            src={img || profile?.img}
                            alt="user"
                            className="user-avatar"
                            fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                            style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                        />
                        <div className="member-avatar-change">
                            <label htmlFor="logo">
                                <FontAwesomeIcon icon={faPen} />
                            </label>

                            <input
                                type="file"
                                id="logo"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleChangeAvatar}
                            />
                        </div>
                    </Col>
                    <Col>
                        <Stack gap={3}>
                            <div>
                                <h3>Họ tên :</h3>
                                <p>{profile?.name}</p>
                            </div>
                            <div>
                                <h3>Số điện thoại :</h3>
                                <p>{profile?.phone}</p>
                            </div>
                            <div>
                                <h3>Email :</h3>
                                <p>{profile?.email}</p>
                            </div>
                            <div>
                                <h3>Chức vụ :</h3>
                                <p>{profile?.role}</p>
                            </div>
                        </Stack>
                    </Col>
                </Row>
                <Row className="justify-content-end">
                    <Col xs={6} className="d-flex gap-3">
                        <div>
                            <Buttons primary leftIcon={<FontAwesomeIcon icon={faPen} />} onClick={() => setShow(true)}>
                                Chỉnh sửa
                            </Buttons>
                        </div>
                        <div>
                            <Buttons
                                primary
                                leftIcon={<FontAwesomeIcon icon={faPen} />}
                                onClick={() => setChangePwShow(true)}
                            >
                                Đổi mật khẩu
                            </Buttons>
                        </div>
                    </Col>
                </Row>
            </Stack>
            <Modal show={show} onHide={() => setShow(false)} className="update-profile">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Cập nhật thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileForm handleClose={handleUpdate} />
                </Modal.Body>
            </Modal>
            <Modal show={changePwShow} onHide={() => setChangePwShow(false)} className="update-profile">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Thay đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChangePasswordForm handleClose={() => setChangePwShow(false)} />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Profile;
