import { Col, Container, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Images from '~/components/Images';

function AdminSidebar({ sbItems }) {
    return (
        <Container fluid className="m-0 admin-sb">
            <Row className="p-3 ">
                <Col xs="12" className="d-flex justify-content-center mb-3">
                    <Images
                        src=""
                        alt="user"
                        className="admin-img"
                        fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                        style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                    />
                </Col>
                <Col className="admin-name">
                    <h2>Nguyen Van A</h2>
                    <p className="m-0">Nhan vien</p>
                </Col>
            </Row>

            <hr />
            <Row className="pb-3">
                <Stack gap={2}>
                    {sbItems.map((item, idx) => (
                        <Link to={item.link}>
                            <div key={idx} className="admin_sb_item">
                                {item.icon}
                                <p className="mb-0 ps-4">{item.title}</p>
                            </div>
                        </Link>
                    ))}
                </Stack>
            </Row>
        </Container>
    );
}

export default AdminSidebar;
