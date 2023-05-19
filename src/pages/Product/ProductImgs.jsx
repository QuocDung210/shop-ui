import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Container, Row, Carousel, Placeholder, Modal } from 'react-bootstrap';
import images from '~/assets/images';
function ProductImgs({ imageList = [] }) {
    const [currentImg, setCurrentImg] = useState(0);
    const [openModal, setopenModal] = useState(false);
    const [img, setImg] = useState(imageList[0]);

    const imgList = () => {
        let a = [];
        for (let i = 0; i < imageList.length; i++) {
            a.push({
                id: i,
                value: imageList[i],
            });
        }
        return a;
    };

    const handleClick = (index) => {
        const wordSlider = imgList()[index];
        setImg(wordSlider);
        setCurrentImg(index);
    };

    return (
        <Container fluid>
            <Row className="img-slide">
                <Carousel activeIndex={currentImg} onSelect={handleClick}>
                    {imageList[0] !== 'string' ? (
                        imgList().map((img, idx) => (
                            <Carousel.Item key={idx}>
                                <img className="pd-slider-img" src={img?.value || images.errorImg} alt="slide" />
                            </Carousel.Item>
                        ))
                    ) : (
                        <Carousel.Item>
                            <img className="pd-slider-img" src={images.errorImg} alt="slide" />
                        </Carousel.Item>
                    )}
                </Carousel>
                <div className="full-green" onClick={() => setopenModal(true)}>
                    <FontAwesomeIcon icon={faEye} />
                </div>
                <div className="d-flex pt-4 imgs-pd">
                    {imageList[0] !== 'string' ? (
                        imgList().map((data, i) => (
                            <div className="thumbnail" key={i}>
                                <img
                                    className={img.id === i ? 'clicked' : ''}
                                    src={data.value || images.errorImg}
                                    onClick={() => handleClick(i)}
                                    height="70"
                                    width="100"
                                    alt={`img-${i}`}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="thumbnail">
                            <img src={images.errorImg} height="70" width="100" alt={`img-err`} />
                        </div>
                    )}
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
                            src={imgList()[currentImg]?.value}
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
