import { Container, Stack } from 'react-bootstrap';
import ChangePasswordForm from '~/components/Form/change-password-form';
function ChangePassword() {
    return (
        <Container fluid>
            <Stack className="content-box">
                <div>
                    <h2>ĐỔI MẬT KHẨU</h2>
                    <p>Bạn nên cập nhập mật khẩu thường xuyên vì lý do bảo mật</p>
                </div>
                <hr />
                <div>
                    <ChangePasswordForm />
                </div>
            </Stack>
        </Container>
    );
}

export default ChangePassword;
