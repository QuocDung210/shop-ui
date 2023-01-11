import { Carousel, Col, Container, Row } from 'react-bootstrap';
import './Slider.scss';

const listSlider = [
    {
        image: 'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107__340.jpg',
        mess: 'First slide',
        label: 'First slide label',
        descrip: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    },
    {
        image: 'https://cdn.pixabay.com/photo/2017/10/17/16/10/fantasy-2861107__340.jpg',
        mess: 'Second slide',
        label: 'Second slide label',
        descrip: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    },
    {
        image: 'https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455__340.jpg',
        mess: 'Third slide',
        label: 'Third slide label',
        descrip: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    },
];

function Slider() {
    return (
        <Container fluid className="p-5 slider-container">
            <Row className="m-0 slider-wrapper">
                <Col>
                    <Carousel className="p-0 slider" controls={false}>
                        {listSlider.map((sliderItem, idx) => (
                            <Carousel.Item interval={3000} key={idx}>
                                <img
                                    className="d-block w-100 slider-img"
                                    src={sliderItem.image}
                                    alt={sliderItem.mess}
                                />
                                <Carousel.Caption>
                                    <h3>{sliderItem.label}</h3>
                                    <p>{sliderItem.descrip}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}

export default Slider;
