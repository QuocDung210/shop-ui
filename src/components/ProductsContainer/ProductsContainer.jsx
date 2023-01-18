import { Col, Container, Row } from 'react-bootstrap';

import ProductCard from '~/layouts/components/ProductCard';
import Buttons from '../Buttons';

import './ProductsContainer.scss';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ProductsContainer(props) {
    // const { products, title, to } = props;
    const lg = 2;
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

    const CustomRightArrow = ({ onClick, ...rest }) => {
        // const {
        //     onMove,
        //     carouselState: { currentSlide, deviceType },
        // } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <button onClick={() => onClick()} className="rightArrow">
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        );
    };
    const CustomLeftArrow = ({ onClick, ...rest }) => {
        // const {
        //     onMove,
        //     carouselState: { currentSlide, deviceType },
        // } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <button onClick={() => onClick()} className="leftArrow">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        );
    };

    return (
        <Container fluid>
            <Container className="product-slider">
                <Row>
                    <Col className="d-flex align-items-center">
                        <h3 className="m-0">Chưa biết để gì</h3>
                    </Col>
                    <Col style={{ textAlign: 'end' }}>
                        <Buttons
                            className={lg <= 4 && 'd-none'}
                            primary
                            rightIcon={<FontAwesomeIcon icon={faAnglesRight} />}
                        >
                            See All
                        </Buttons>
                    </Col>
                </Row>
                <Row>
                    <Carousel
                        responsive={responsive}
                        className="p-0"
                        showDots
                        customRightArrow={<CustomRightArrow />}
                        customLeftArrow={<CustomLeftArrow />}
                        renderButtonGroupOutside={true}
                    >
                        {Array.from({ length: lg }).map((_, idx) => (
                            <div className="product-slider-item " key={idx}>
                                <ProductCard.Loading />
                            </div>
                        ))}
                    </Carousel>
                </Row>
            </Container>
        </Container>
    );
}

export default ProductsContainer;
