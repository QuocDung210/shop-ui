import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Placeholder, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AddCartForm from '~/components/Form/add-cart-form';
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

const style = {
    backgroundColor: '#ffffff',
    boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)',
    padding: '20px',
};

function Product() {
    const params = useParams();
    const [currentProduct, setCurrentProduct] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const product = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://tiktok.fullstack.edu.vn/api/users/search?q=${params.id}&type=less`,
                );

                setCurrentProduct(res.data.data[0]);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        product();
    }, [params.id]);

    return (
        <Container fluid>
            <Container style={{ backgroundColor: 'var(--background-color)' }}>
                <Row className="mt-4 product-detail">
                    <Col xs={12} lg={5} style={style} className="mb-4">
                        <div className="w-100">
                            {loading ? <ProductImgs.Loading /> : <ProductImgs images={currentProduct.avatar} />}
                        </div>
                    </Col>
                    <Col xs={12} lg={7} style={style} className="mb-4">
                        <div className="product-detail-name">
                            {loading ? (
                                <Placeholder as={'p'} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                            ) : (
                                <h2 className="text-uppercase fs-1">{currentProduct.nickname}</h2>
                            )}
                        </div>
                        <div className="product-detail-price">
                            <h3>250.000 d</h3>
                        </div>
                        <hr />
                        <div>
                            <p>Thương hiệu</p>
                        </div>
                        <div>
                            <p>Màu sắc</p>
                        </div>
                        <div>
                            <p>Trạng thái</p>
                        </div>
                        <hr />
                        <div>
                            <AddCartForm color={colors} size={colors} />
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
