import { Container, Row, Stack } from 'react-bootstrap';
import './AccountDetail.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userApi } from '~/api';
import Images from '~/components/Images';
import images from '~/assets/images';
import Buttons from '~/components/Buttons';
import { toast } from 'react-toastify';
import { ROLE_ARR } from '~/const/roleArr';
function AccountDetail() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const [user, setUser] = useState({});
    const [render, setRender] = useState(false);

    const acc = searchParams.get('acc')?.split('%');

    useEffect(() => {
        const fetch = async () => {
            const res = await userApi.getAll();
            setUser(res.find((item) => item?.phone === acc[1]));
        };
        fetch();
    }, [acc, render]);

    const handleSetRole = async () => {
        try {
            if (user?.role === 'Customer') {
                return;
            } else {
                if (user?.role === 'Employee') {
                    await userApi.setRole({
                        id: '',
                        name: '',
                        email: '',
                        phone: user.phone,
                        password: '',
                        img: 'string',
                        roleId: 2,
                    });
                    setRender(!render);
                } else if (user?.role === 'Admin') {
                    await userApi.setRole({
                        id: '',
                        name: '',
                        email: '',
                        phone: user.phone,
                        password: '',
                        img: '',
                        roleId: 1,
                    });
                    setRender(!render);
                }
            }
            toast.success('Cấp quyền thành công.');
        } catch (err) {
            console.log(err);
            toast.error('Có lỗi xảy ra.');
        }
    };

    return (
        <Container fluid className="manage-acc-detail">
            <h2>Chi tiết tài khoản</h2>
            <Row>
                <Stack gap={3}>
                    <div className="content-box">
                        <h3 className="mb-4">Quyền</h3>
                        <div className="d-flex justify-content-between align-items-center">
                            {ROLE_ARR.map(
                                (dt, idx) =>
                                    user?.role === dt.role && (
                                        <p key={idx} className={`m-0 role ${dt.color}`}>
                                            {user?.role}
                                        </p>
                                    ),
                            )}

                            <Buttons primary disabled={user?.role === 'Customer'} onClick={handleSetRole}>
                                {`Cấp quyền ${user?.role === 'Employee' ? 'Admin' : 'Employee'}`}
                            </Buttons>
                        </div>
                    </div>
                    <div className="content-box">
                        <h3 className="mb-4">Thông tin tài khoản</h3>
                        <div className="d-flex flex-wrap justify-content-center gap-5">
                            <Images
                                src={user?.img || images.errorImg}
                                alt="user"
                                className="manage-acc-detail-img"
                                fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                            />
                            <div>
                                <Stack gap={3}>
                                    <div className="d-flex flex-wrap gap-4 align-items-center">
                                        <h4>Tên người dùng :</h4>
                                        <p className=" mb-0">{user?.name}</p>
                                    </div>
                                    <div className="d-flex flex-wrap gap-4 align-items-center">
                                        <h4>Email :</h4>
                                        <p className=" mb-0">{user?.email}</p>
                                    </div>
                                    <div className="d-flex flex-wrap gap-4 align-items-center">
                                        <h4>Số điện thoại :</h4>
                                        <p className=" mb-0">{user?.phone}</p>
                                    </div>
                                    <div className="d-flex flex-wrap gap-4 align-items-center">
                                        <h4>Quyền :</h4>
                                        <p className=" mb-0">{user?.role}</p>
                                    </div>
                                </Stack>
                            </div>
                        </div>
                    </div>
                </Stack>
            </Row>
        </Container>
    );
}

export default AccountDetail;
