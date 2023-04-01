import { useEffect, useState } from 'react';
import { Carousel, Col, Container, Row, Stack } from 'react-bootstrap';
import { FirebaseService } from '~/firebase/firebaseService';
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
    const [currentAdImgs, setCurrentAddImgs] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const res = await FirebaseService.getImgs('AdImgs', 'img');
            setCurrentAddImgs(res.listImg);
        };
        fetch();
    }, []);
    return (
        <Container fluid className="slider-container">
            <Row className="m-0 slider-wrapper">
                <Container>
                    <Row className="gap-3">
                        <Col md={2} className="content-box d-none d-lg-block">
                            <Stack gap={2}>
                                <div className="slider-category">
                                    <p>Laptop Gaming</p>
                                </div>
                                <div className="slider-category">
                                    <p>Laptop Văn phòng</p>
                                </div>
                                <div className="slider-category">
                                    <p>Laptop Đồ Họa</p>
                                </div>
                            </Stack>
                        </Col>
                        <Col className="content-box p-0">
                            <Carousel className="p-0 slider" controls={false}>
                                {currentAdImgs.length > 0
                                    ? currentAdImgs.map((item, idx) => (
                                          <Carousel.Item interval={3000} key={idx}>
                                              <img className="d-block w-100 slider-img" src={item} alt={idx} />
                                          </Carousel.Item>
                                      ))
                                    : listSlider.map((sliderItem, idx) => (
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
            </Row>
        </Container>
    );
}

export default Slider;
