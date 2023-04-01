import { Col, Container, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Logo from '~/components/Logo';
import config from '~/config';
import './Login.scss';
import LoginForm from '~/components/AuthForm/login-form';
function Login() {
    return (
        <div className="d-flex align-items-center login">
            <Container className="login-container">
                <Row className="justify-content-center login-wrapper">
                    <Col>
                        <Stack gap={3} className="col-md-8 mx-auto login-form">
                            <div>
                                <Logo />
                            </div>

                            <LoginForm />
                            <div className="d-flex gap-2">
                                <p className="m-0">Chưa có tài khoản? </p>
                                <Link to={config.routes.register}>
                                    <p className="m-0" style={{ color: 'var(--color-1)' }}>
                                        Đăng ký ngay
                                    </p>
                                </Link>
                            </div>
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

export default Login;
