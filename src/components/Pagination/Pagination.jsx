import { Container, Pagination, Row } from 'react-bootstrap';

function Pagiantion() {
    return (
        <Container fluid style={{ backgroundColor: '#ffffff', boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}>
            <Row>
                <Container fluid></Container>
                <Pagination className="d-flex justify-content-center">
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </Row>
        </Container>
    );
}

export default Pagiantion;
