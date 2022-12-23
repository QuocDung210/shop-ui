import { faGoogle, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Buttons from '~/components/Buttons';
import Logo from '~/components/Logo';
import config from '~/config';
import './Login.scss';

function Login() {
    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div className="d-flex align-items-center login">
            <Container className="login-container">
                <Row className="justify-content-center login-wrapper">
                    <Col className=" d-flex flex-column justify-content-center align-items-center">
                        <div className="login-form">
                            <div>
                                <Logo />
                            </div>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <div className=" d-flex justify-content-center align-items-center">
                                        <FontAwesomeIcon icon={faUser} />
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </div>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <div className=" d-flex justify-content-center align-items-center">
                                        <FontAwesomeIcon icon={faKey} />
                                        <Form.Control type="password" placeholder="Password" />
                                    </div>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Nhớ tài khoản" />
                                </Form.Group>
                                <Buttons primary lager onClick={handleLogin} className="button-login">
                                    Đăng nhập
                                </Buttons>
                            </Form>
                            <div className="d-flex gap-2">
                                <p>Chưa có tài khoản? </p>
                                <Link to={config.routes.register}>
                                    <p>Đăng ký ngay</p>
                                </Link>
                            </div>
                            <div>
                                <span>Quên mật khẩu ?</span>
                            </div>
                        </div>
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
