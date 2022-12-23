import { Container, Row } from 'react-bootstrap';

function _404() {
    return (
        <Container fluid>
            <Container className="p-0">
                <Row className="justify-content-center">
                    <span style={{ fontSize: '4vw', fontWeight: '600' }}>ERROR 404 : NOT FOUND PAGE</span>
                </Row>
            </Container>
        </Container>
    );
}

export default _404;
