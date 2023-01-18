import { Col, Container, Stack } from 'react-bootstrap';
import ProfileForm from '~/components/Form/profile-form';

function Profile() {
    return (
        <Container fluid>
            <Stack>
                <div>
                    <h2>HO SO CUA TOI</h2>
                    <p>quan ly thong tin</p>
                </div>
                <hr />
                <div>
                    <Col xs={12} md={8}>
                        <ProfileForm />
                    </Col>
                </div>
            </Stack>
        </Container>
    );
}

export default Profile;
