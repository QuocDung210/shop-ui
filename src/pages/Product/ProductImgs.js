import { useState } from 'react';
import { Container, Row, Carousel } from 'react-bootstrap';

function ProductImgs({ images }) {
    const imgs = [
        { id: 0, value: images },
        { id: 1, value: 'https://source.unsplash.com/user/c_v_r/1900x800' },
        { id: 2, value: 'https://source.unsplash.com/user/c_v_r/100x100' },
    ];
    const [img, setImg] = useState(imgs[0]);

    const handleClick = (index) => {
        console.log(index);
        const wordSlider = imgs[index];
        setImg(wordSlider);
    };
    return (
        <Container fluid>
            <Row>
                <Carousel>
                    {imgs.map((img, idx) => (
                        <Carousel.Item key={idx}>
                            <img className="pd-img" src={img.value} alt="slide" />
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className="d-flex pt-4 imgs-pd">
                    {imgs.map((data, i) => (
                        <div className="thumbnail" key={i}>
                            <img
                                className={img.id === i ? 'clicked' : ''}
                                src={data.value}
                                onClick={() => handleClick(i)}
                                height="70"
                                width="100"
                                alt={`img-${i}`}
                            />
                        </div>
                    ))}
                </div>
            </Row>
        </Container>
    );
}

export default ProductImgs;
