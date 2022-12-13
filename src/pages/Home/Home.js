import { Container, Row } from 'react-bootstrap';
import Slider from '~/layouts/components/Slider';

function Home() {
    return (
        <Container fluid>
            <Row>
                <Slider />
            </Row>
        </Container>
    );
}

export default Home;
