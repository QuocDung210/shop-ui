import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Product() {
    const params = useParams();
    const [currentProduct, setCurrentProduct] = useState({});
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
    return (
        <Container fluid>
            <Container className="p-0">
                <Row>
                    <Col xs={5}>
                        <Card>
                            <Card.Img variant="top" src={currentProduct.avatar} />
                            <Card.Body>
                                <Card.Title>{currentProduct.nickname}</Card.Title>
                                <Card.Text>{currentProduct.bio}</Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={7} style={{ backgroundColor: '#ccc' }}>
                        <div className="product-detai-name">
                            <h2>{currentProduct.nickname}</h2>
                        </div>
                        <div className="product-detail-price">
                            <h3>250.000 d</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Product;
