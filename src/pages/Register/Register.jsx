import './Register.scss';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import Logo from '~/components/Logo';
import RegisterForm from '~/components/AuthForm/register-form';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useState } from 'react';
import OtpForm from '~/components/AuthForm/otp-form';
function Register() {
    const [info, setInfo] = useState(null);
    console.log('check info: ', info);
    return (
        <div className="d-flex align-items-center login">
            <Container className="login-container">
                <Row className="justify-content-center login-wrapper">
                    <Col xs={12} lg={7}>
                        <p style={{ textAlign: 'end', marginTop: '20px ' }} className="d-none d-sm-block">
                            Đã có tài khoản?{' '}
                            <Link to={config.routes.login} style={{ color: 'var(--color-1)' }}>
                                Đăng nhập
                            </Link>
                        </p>
                        <Stack gap={3} className=" mx-auto login-form">
                            <div>
                                <Logo />
                            </div>
                            {!info ? <RegisterForm setInfo={(data) => setInfo(data)} /> : <OtpForm info={info} />}

                            <div>
                                <p className="fs-5">
                                    Bằng việc đăng ký, tôi đồng ý với{' '}
                                    <strong>
                                        <u>Điều khoản dịch vụ</u>
                                    </strong>{' '}
                                    và{' '}
                                    <strong>
                                        <u>Chính sách bảo mật</u>
                                    </strong>{' '}
                                    của MyStore.
                                </p>
                            </div>
                            <p style={{ textAlign: 'center' }} className="d-block d-sm-none fs-4">
                                Đã có tài khoản?{' '}
                                <Link to={config.routes.login} style={{ color: 'var(--color-1)' }}>
                                    Đăng nhập
                                </Link>
                            </p>
                        </Stack>
                    </Col>
                    <Col className="p-0 d-none d-lg-block">
                        <div className="d-flex align-items-center login-img" style={{ borderLeft: '1px solid #ccc' }}>
                            <img src={images.LoginImg} alt="login img" style={{ width: '100%' }} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;
