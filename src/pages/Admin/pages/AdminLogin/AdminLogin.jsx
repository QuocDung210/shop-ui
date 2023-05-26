import './AdminLogin.scss';

import { Col, Container, Row, Stack } from 'react-bootstrap';
import Logo from '~/components/Logo';
import AdminLoginForm from '~/components/AuthForm/admin-login-form';
import images from '~/assets/images';
function AdminLogin() {
    return (
        <div className="d-flex align-items-center admin-login">
            <Container className="login-container">
                <Row className="justify-content-center align-items-center login-wrapper">
                    <Col>
                        <Stack gap={3} className="col-md-8 mx-auto login-form">
                            <Logo.NotLink />
                            <AdminLoginForm />
                        </Stack>
                    </Col>
                    <Col className="p-0 d-none d-lg-block">
                        <div className="d-flex align-items-center login-img" style={{ borderLeft: '1px solid #ccc' }}>
                            <img src={images.adminLogin} alt="login img" style={{ width: '100%' }} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminLogin;
