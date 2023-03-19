import { Container, Row } from 'react-bootstrap';
import AddAccountForm from '~/components/Form/add-account-form';
import './AddAccount.scss';
function AddAccount() {
    return (
        <Container fluid className="add-product-container">
            <Row className="mb-4">
                <h2>Thêm tài khoản</h2>
            </Row>
            <Row>
                <div className="px-4  content-box ">
                    <AddAccountForm />
                </div>
            </Row>
        </Container>
    );
}

export default AddAccount;
