import { useContext, useEffect, useState } from 'react';
import { Col, Container, Placeholder, Row, Stack, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductApi, cartApi } from '~/api';
import AddCartForm from '~/components/Form/add-cart-form';
import './Product.scss';
import ProductImgs from './ProductImgs';
import { PRODUCT_TAGS } from '~/const';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import useAuth from '~/hooks/useAuth';
import { splitNumber } from '~/numberSplit';
import config from '~/config';
import { AppContext } from '~/Context/AppContext';

function Product() {
    const params = useParams();
    const navigate = useNavigate();
    const [currentProduct, setCurrentProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const context = useContext(AppContext);

    useEffect(() => {
        const product = async () => {
            try {
                setLoading(true);
                // const res = await ProductApi.getByIdProduct(params.id);
                const res = await ProductApi.getBySlug(params.id);
                setCurrentProduct(res);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        product();
    }, [params.id]);

    const handleAdd = async (id, quantity) => {
        if (!currentUser) {
            toast.warning('Vui lòng đăng nhập trước khi sử dụng tính năng này.');
            return;
        }

        try {
            await cartApi.addCart({
                productId: id,
                quantity: quantity,
            });
            toast.success('Thêm thành công.');
            context.handleReRender();
        } catch (err) {
            toast.error(err);
        }
    };

    const handleBuyNow = async (id, quantity) => {
        if (!currentUser) {
            navigate(config.routes.login);
            return;
        }
        try {
            await cartApi.addCart({
                productId: id,
                quantity: quantity,
            });
            context.handleReRender();
            navigate(`/${config.routes.order}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container fluid style={{ fontSize: '2rem' }}>
            <Container>
                <Row className="product-detail my-4 ">
                    <Col xs={12} lg={5} className="content-box mb-4">
                        <div className="w-100">
                            {loading ? <ProductImgs.Loading /> : <ProductImgs imageList={currentProduct.images} />}
                        </div>
                    </Col>
                    <Col xs={12} lg={7} className="content-box mb-4">
                        <div className="product-detail-name">
                            {loading ? (
                                <Placeholder as={'p'} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                            ) : (
                                <h2 className="text-uppercase fs-1">{currentProduct.name}</h2>
                            )}
                        </div>
                        <hr />
                        <Stack gap={3} className="product-detail-price">
                            <div>
                                <h3 className="m-0">Giá gốc :</h3>
                                <p className="m-0">{`${splitNumber(currentProduct?.price)} đ`}</p>
                            </div>
                            <div className={`${currentProduct?.discount <= 0 && 'd-none'}`}>
                                <h3 className="m-0">Giá KM :</h3>
                                <p className="m-0">
                                    {`${splitNumber(
                                        currentProduct?.price -
                                            (currentProduct?.price * currentProduct?.discount) / 100,
                                    )} đ`}
                                </p>
                            </div>
                        </Stack>
                        <hr />
                        <div className="d-flex align-items-center gap-3">
                            <h3 className="m-0">Thương hiệu :</h3>
                            <p className="m-0">{currentProduct?.brand}</p>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <h3 className="m-0">Trạng thái :</h3>
                            <p className="m-0">{currentProduct?.available > 0 ? 'Còn hàng.' : 'Hết hàng.'}</p>
                        </div>
                        <hr />
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <h3 className="m-0">Số lượng hiện tại :</h3>
                            <p className="m-0">{currentProduct?.available}</p>
                        </div>
                        <div>
                            <AddCartForm
                                id={currentProduct.id}
                                add={handleAdd}
                                buy={handleBuyNow}
                                max={currentProduct?.available}
                            />
                        </div>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <h2>Thông số kỹ thuật</h2>
                    <Col className="content-box" style={{ fontSize: '1.6rem' }}>
                        <Table striped="columns">
                            <tbody>
                                {PRODUCT_TAGS.map((tag, idx) => (
                                    <tr key={idx}>
                                        <td width={'20%'}>{tag}</td>
                                        <td colSpan={2}>{currentProduct.tags && currentProduct.tags[idx]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <h2>Mô tả sản phẩm</h2>
                    <Col className="description-container content-box">{parse(`${currentProduct.description}`)}</Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Product;
