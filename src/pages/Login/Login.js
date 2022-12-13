import { faGoogle, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Buttons from '~/components/Buttons';
import Logo from '~/components/Logo';
import config from '~/config';
import './Login.scss';

function Login() {
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
                                    <Form.Check type="checkbox" label="Check me out" />
                                    <div>
                                        <span>Quên mật khẩu ?</span>
                                    </div>
                                </Form.Group>
                                <Buttons primary lager>
                                    Đăng nhập
                                </Buttons>
                                <Link to={config.routes.register}>
                                    <p>chưa có tài khoản ?</p>
                                </Link>
                            </Form>
                            <hr />
                            <div>
                                <p>hoặc</p>
                                <Buttons primary lager leftIcon={<FontAwesomeIcon icon={faSquareFacebook} />}>
                                    Đăng nhập bằng Facebook
                                </Buttons>
                                <Buttons primary lager leftIcon={<FontAwesomeIcon icon={faGoogle} />}>
                                    Đăng nhập bằng Google
                                </Buttons>
                            </div>
                        </div>
                    </Col>
                    <Col className="p-0 d-none d-lg-block">
                        <div className="login-img"></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
