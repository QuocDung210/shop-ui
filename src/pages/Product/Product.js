import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Carousel, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Product.scss';
import ProductImgs from './ProductImgs';
const colors = [
    {
        label: 'Red',
        code: 'red',
    },
    {
        label: 'Black',
        code: 'black',
    },
];

function Product() {
    const params = useParams();
    const [currentProduct, setCurrentProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const colorRef = useRef();
    const sizeRef = useRef();
    const quantityRef = useRef();

    useEffect(() => {
        const product = async () => {
            try {
                const res = await axios.get(
                    `https://tiktok.fullstack.edu.vn/api/users/search?q=${params.id}&type=less`,
                );

                setCurrentProduct(res.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        product();
    }, [params.id]);

    const handleDecreaseQuantity = () => {
        let numbers = quantity - 1;
        if (numbers < 0) {
            return;
        } else {
            setQuantity(numbers);
        }
    };
    const handleAdd = () => {
        let numbers = quantity + 1;
        setQuantity(numbers);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log('check form data', colorRef.current.value);
        console.log('check form data', sizeRef.current.value);
        console.log('check form data', quantityRef.current.value);
    };
    return (
        <Container fluid>
            <Container>
                <Row className="mt-4 mb-4 product-detail">
                    <Col xs={12} lg={5}>
                        <div className="w-100">
                            <ProductImgs images={currentProduct.avatar} />
                        </div>
                    </Col>
                    <Col xs={12} lg={7}>
                        <div className="product-detail-name">
                            <h2 className="text-uppercase fs-1">{currentProduct.nickname}</h2>
                        </div>
                        <div className="product-detail-price">
                            <h3>250.000 d</h3>
                        </div>
                        <hr />
                        <p>Thương hiệu</p>
                        <p>Màu sắc</p>
                        <p>Trạng thái</p>
                        <hr />
                        <div>
                            <Form>
                                <Form.Group className="mb-3 d-flex ">
                                    <Form.Label className="options-label">Màu sắc</Form.Label>
                                    <Form.Select className="fs-4 w-50" id="pd-color" ref={colorRef}>
                                        {colors.map((color, idx) => (
                                            <option key={idx}>{color.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 d-flex">
                                    <Form.Label className="options-label">Kích thước</Form.Label>
                                    <Form.Select className="fs-4 w-50" id="pd-size" ref={sizeRef}>
                                        {colors.map((color, idx) => (
                                            <option key={idx}>{color.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex product-quantity">
                                    <Form.Label className="options-label">Số lượng</Form.Label>
                                    <div className="decrease-btn" onClick={handleDecreaseQuantity}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </div>
                                    <Form.Control
                                        id="pd-quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        ref={quantityRef}
                                    />
                                    <div className="add-btn" onClick={handleAdd}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="add-product-btn"
                                    onClick={handleSubmitForm}
                                    style={{ borderRadius: '0', border: 'none', backgroundColor: 'var(--color-1)' }}
                                >
                                    <span className="fs-4">Thêm vào giỏ hàng</span>
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <p>Sản phẩm liên quan</p>
                </Row>
                <Row className="mb-5">
                    <p>Sản phẩm đã xem</p>
                </Row>
            </Container>
        </Container>
    );
}

export default Product;
