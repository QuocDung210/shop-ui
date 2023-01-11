import { Col, Container, Row } from 'react-bootstrap';

import ProductCard from '~/layouts/components/ProductCard';
import Buttons from '../Buttons';

import './ProductsContainer.scss';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function ProductsContainer(props) {
    // const { products, title, to } = props;
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
        },
    };
    return (
        <Container fluid>
            <Container className="product-slider">
                <Row>
                    <Col>
                        <h3>Chưa biết để gì</h3>
                    </Col>
                    <Col style={{ textAlign: 'end' }}>
                        <Buttons primary>See All</Buttons>
                    </Col>
                </Row>
                <Row>
                    <Carousel responsive={responsive} className="p-0" showDots renderButtonGroupOutside={true}>
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <div className="product-slider-item">
                                <ProductCard.Loading key={idx} />
                            </div>
                        ))}
                    </Carousel>
                </Row>
            </Container>
        </Container>
    );
}

export default ProductsContainer;
