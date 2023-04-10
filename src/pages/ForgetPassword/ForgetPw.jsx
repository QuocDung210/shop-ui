import { Col, Container, Row, Stack } from 'react-bootstrap';
import './ForgetPw.scss';
import Logo from '~/components/Logo';
import Buttons from '~/components/Buttons';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AuthApi } from '~/api';
function ForgetPw() {
    const [phone, setPhone] = useState('');
    const [check, setCheck] = useState(false);
    const [data, setData] = useState({ phone: '', newPassword: '', otp: '' });
    const handleCheck = async () => {
        try {
            const res = await AuthApi.checkAcc(phone);
            if (res) {
                toast.success('Nhập mã OTP để đổi mật khẩu.');
                setCheck(true);
            } else {
                toast.warning('Tài khoản không tồn tại.');
            }
        } catch (err) {
            console.log(err);
            toast.error('Có lỗi xảy ra.');
        }
    };
    const handleSetData = (e) => {
        if (e.target.id === 'renew-phone') {
            setData({ ...data, phone: e.target.value });
        }
        if (e.target.id === 'renew-pass') {
            setData({ ...data, newPassword: e.target.value });
        }

        if (e.target.id === 'renew-otp') {
            setData({ ...data, otp: e.target.value });
        }
    };
    const handleSubmit = async () => {
        for (let key in data) {
            if (data[key] === '') {
                toast.warning('vui lòng nhập đày đủ thông tin.');
                return;
            }
        }
        try {
            const res = await AuthApi.forgotPassword(data);
            console.log(res);
            toast.success('Đổi mật khẩu thành công.');
        } catch (err) {
            toast.error('Xảy ra lỗi.');
        }
    };
    return (
        <Container fluid className="forgot-pw">
            <Row className="justify-content-center content-box">
                <Col className={`${check ? 'd-none' : 'd-block'}`}>
                    <Stack gap={3}>
                        <Logo />
                        <div className="forgot-check-acc">
                            <input
                                value={phone}
                                id="forgot-check-acc-ip"
                                type="number"
                                placeholder="Số điện thoại đăng ký..."
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <Buttons primary className={'w-100'} onClick={handleCheck}>
                            Gửi
                        </Buttons>
                    </Stack>
                </Col>
                <Col className={`${check ? 'd-block' : 'd-none'}`}>
                    <Stack gap={3}>
                        <Logo />
                        <div className="forgot-check-acc">
                            <input id="renew-phone" type="number" placeholder="Phone..." onChange={handleSetData} />
                        </div>
                        <div className="forgot-check-acc">
                            <input
                                id="renew-pass"
                                type="password"
                                placeholder="New Password..."
                                onChange={handleSetData}
                            />
                        </div>
                        <div className="forgot-check-acc">
                            <input id="renew-otp" type="text" placeholder="Otp..." onChange={handleSetData} />
                        </div>
                        <Buttons primary className={'w-100'} onClick={handleSubmit}>
                            Gửi
                        </Buttons>
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgetPw;
