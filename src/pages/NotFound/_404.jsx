import { Container, Row } from 'react-bootstrap';

function _404() {
    return (
        <>
            <Container fluid>
                <Row className="justify-content-center">
                    <span style={{ fontSize: '5rem', fontWeight: '600' }}>ERROR 404 : NOT FOUND PAGE</span>
                </Row>
            </Container>
        </>
    );
}

export default _404;
