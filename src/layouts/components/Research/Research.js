import { Container, Nav, Row } from 'react-bootstrap';
import ResearchItem from './ResearchItem';

function Research() {
    return (
        <Container fluid>
            <Row className="d-flex flex-row flex-wrap m-0  research-list">
                <Nav as="ul">
                    {Array.from({ length: 2 }).map((_, idx) => (
                        <Nav.Item as="li">
                            <ResearchItem ind={idx} />
                        </Nav.Item>
                    ))}
                </Nav>
            </Row>
            {/* <div className="d-flex flex-row flex-wrap research-list">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <ResearchItem ind={idx} />
                ))}
            </div> */}
        </Container>
    );
}

export default Research;
