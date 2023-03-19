import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Container, Row, Carousel, Placeholder, Modal } from 'react-bootstrap';

function ProductImgs({ images }) {
    const [currentImg, setCurrentImg] = useState(0);
    const [openModal, setopenModal] = useState(false);
    const imgs = [
        { id: 0, value: images },
        { id: 1, value: 'https://source.unsplash.com/user/c_v_r/1900x800' },
        { id: 2, value: 'https://source.unsplash.com/user/c_v_r/100x100' },
        { id: 3, value: 'https://source.unsplash.com/user/c_v_r/100x100' },
        { id: 4, value: 'https://source.unsplash.com/user/c_v_r/100x100' },
        { id: 5, value: 'https://source.unsplash.com/user/c_v_r/100x100' },
    ];
    const [img, setImg] = useState(imgs[0]);

    const handleClick = (index) => {
        const wordSlider = imgs[index];
        setImg(wordSlider);
        setCurrentImg(index);
    };

    return (
        <Container fluid>
            <Row className="img-slide">
                <Carousel interval={null} activeIndex={currentImg} onSelect={handleClick}>
                    {imgs.map((img, idx) => (
                        <Carousel.Item key={idx}>
                            <img className="pd-img" src={img.value} alt="slide" />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className="full-green" onClick={() => setopenModal(true)}>
                    <FontAwesomeIcon icon={faEye} />
                </div>
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
            <Modal
                show={openModal}
                onHide={() => setopenModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body style={{ backgroundColor: 'rgba($color: #000000, $alpha: 0.5)' }}>
                    <div>
                        <img
                            style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                            src={imgs[currentImg].value}
                            alt="slide"
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

const Loading = () => {
    return (
        <Container fluid>
            <Row>
                <Placeholder animation="glow">
                    <Placeholder style={{ width: '100%', height: '300px' }} />
                </Placeholder>
                <div className="mt-2">
                    <Placeholder animation="glow">
                        <Placeholder style={{ width: '100%', height: '70px' }} />
                    </Placeholder>
                </div>
            </Row>
        </Container>
    );
};

ProductImgs.Loading = Loading;

export default ProductImgs;
