import { Col, Container, Row } from 'react-bootstrap';

import ProductCard from '~/layouts/components/ProductCard';
import Buttons from '../Buttons';

import './ProductsContainer.scss';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { createSearchParams, useNavigate } from 'react-router-dom';

function ProductsContainer(props) {
    const { products = null, title, isLoading, type, id } = props;
    const navigate = useNavigate();
    const lg = 5;
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
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
        return (
            <button onClick={() => onClick()} className="rightArrow">
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        );
    };
    const CustomLeftArrow = ({ onClick, ...rest }) => {
        return (
            <button onClick={() => onClick()} className="leftArrow">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        );
    };

    const handleSeeMore = () => {
        if (type) {
            if (type === 'sort') {
                navigate(`/product?${createSearchParams({ s: `${title}%${1}` })}`);
            } else {
                navigate(`/product?${createSearchParams({ c: `${title}%${id}` })}`);
            }
        } else {
            navigate('/product');
        }
    };

    return (
        <Container fluid>
            <Container className="product-slider ">
                <Row className="product-slider-header">
                    <Col className="product-slider-title d-flex align-items-center">
                        <h2 className="m-0">{title}</h2>
                    </Col>
                    <Col className="text-end p-0">
                        <Buttons primary rightIcon={<FontAwesomeIcon icon={faAnglesRight} />} onClick={handleSeeMore}>
                            Xem thêm
                        </Buttons>
                    </Col>
                </Row>
                <Row>
                    <Carousel
                        responsive={responsive}
                        className="p-0"
                        customRightArrow={<CustomRightArrow />}
                        customLeftArrow={<CustomLeftArrow />}
                        renderButtonGroupOutside={true}
                    >
                        {isLoading || !products
                            ? Array.from({ length: lg }).map((_, idx) => (
                                  <div className="product-slider-item " key={idx}>
                                      <ProductCard.Loading />
                                  </div>
                              ))
                            : products?.map((product, idx) => (
                                  <div className="product-slider-item " key={idx}>
                                      <ProductCard product={product} />
                                  </div>
                              ))}
                    </Carousel>
                </Row>
            </Container>
        </Container>
    );
}

export default ProductsContainer;
