import { Container, Row } from 'react-bootstrap';
import ProductsContainer from '~/components/ProductsContainer';
import Slider from '~/layouts/components/Slider';

function Home() {
    return (
        <Container fluid style={{ backgroundColor: 'var(--background-color)' }}>
            <Row>
                <Slider />
            </Row>
            <Row>
                <ProductsContainer />
            </Row>
            <Row>
                <ProductsContainer />
            </Row>
            <Row>
                <ProductsContainer />
            </Row>
        </Container>
    );
}

export default Home;
