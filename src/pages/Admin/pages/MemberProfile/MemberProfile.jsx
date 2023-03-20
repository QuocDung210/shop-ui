import { Col, Container, Row } from 'react-bootstrap';
import images from '~/assets/images';
import ProfileForm from '~/components/Form/profile-form';
import './MemberProfile.scss';
function Profile() {
    return (
        <Container fluid>
            <Row className="member-wrapper mb-4">
                <div className="member-panel content-box" style={{ backgroundImage: `url(${images.background})` }}>
                    <div></div>
                </div>
            </Row>
            <Row>
                <div className="content-box">
                    <Row>
                        <Col>Thông tin liên hệ</Col>
                        <Col>
                            <div>
                                <ProfileForm />
                            </div>
                            <div></div>
                        </Col>
                    </Row>
                </div>
            </Row>
        </Container>
    );
}

export default Profile;
