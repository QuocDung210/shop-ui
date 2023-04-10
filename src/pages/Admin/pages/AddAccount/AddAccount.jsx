import { Container, Row, Stack } from 'react-bootstrap';
import AddAccountForm from '~/components/Form/add-account-form';
import './AddAccount.scss';
import Buttons from '~/components/Buttons';
import { useState } from 'react';
function AddAccount() {
    const [role, setRole] = useState(1);
    return (
        <Container fluid className="add-product-container">
            <Row className="mb-4">
                <h2>Thêm tài khoản</h2>
            </Row>
            <Row>
                <Stack gap={3} className="px-4  content-box ">
                    <div>
                        <h3>Quyền tài khoản</h3>
                        <div className="d-flex gap-4">
                            <div>
                                <Buttons
                                    primary={role === 1 ? true : false}
                                    outline={role === 2 ? true : false}
                                    onClick={() => setRole(1)}
                                >
                                    Employee
                                </Buttons>
                            </div>
                            <div>
                                <Buttons
                                    outline={role === 1 ? true : false}
                                    primary={role === 2 ? true : false}
                                    onClick={() => setRole(2)}
                                >
                                    Admin
                                </Buttons>
                            </div>
                        </div>
                    </div>
                    <AddAccountForm roleid={role} />
                </Stack>
            </Row>
        </Container>
    );
}

export default AddAccount;
