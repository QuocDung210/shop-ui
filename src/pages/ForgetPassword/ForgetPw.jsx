import { Col, Container, Row, Stack } from 'react-bootstrap';
import './ForgetPw.scss';
import Logo from '~/components/Logo';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AuthApi } from '~/api';
import { useNavigate } from 'react-router-dom';
import ForgotPwForm from '~/components/AuthForm/forgot-pass';
import ForgotPwOtpForm from '~/components/AuthForm/forgot-pass-otp';
function ForgetPw() {
    const navigate = useNavigate();
    const [check, setCheck] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleCheck = async (email) => {
        try {
            const res = await AuthApi.checkAcc(email);
            if (res) {
                toast.success('Nhập mã OTP để đổi mật khẩu.');
                setCheck(true);
                setUserEmail(email);
            } else {
                toast.warning('Tài khoản không tồn tại.');
            }
        } catch (err) {
            console.log(err);
            toast.error('Có lỗi xảy ra.');
        }
    };

    const handleSubmit = async (otp, newPass) => {
        try {
            await AuthApi.forgotPassword({
                email: userEmail,
                newPassword: newPass,
                otp: otp,
            });
            toast.success('Đổi mật khẩu thành công.');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            toast.error('Xảy ra lỗi.');
        }
    };
    return (
        <Container fluid className="forgot-pw">
            <Row className="justify-content-center content-box">
                <Col style={{ minWidth: '400px' }} className={`${check ? 'd-none' : 'd-block'}`}>
                    <Stack gap={3}>
                        <Logo />
                        <ForgotPwForm handleCheck={(email) => handleCheck(email)} />
                    </Stack>
                </Col>
                <Col style={{ minWidth: '400px' }} className={`${!check ? 'd-none' : 'd-block'}`}>
                    <Stack gap={3}>
                        <Logo />
                        <ForgotPwOtpForm handleGetPw={(otp, newPass) => handleSubmit(otp, newPass)} />
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgetPw;
