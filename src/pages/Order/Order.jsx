import { Col, Container, Row, Stack } from 'react-bootstrap';
import './Order.scss';
import { useContext, useEffect, useState } from 'react';

import { cartApi, orderApi } from '~/api';
import { toast } from 'react-toastify';
import Images from '~/components/Images';
import images from '~/assets/images';
import { splitNumber } from '~/numberSplit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Buttons from '~/components/Buttons';
import { useNavigate } from 'react-router-dom';
import getAllUrlParams from '~/hooks/getAllParams';
import OrderForm from '~/components/Form/order-form';
import { AppContext } from '~/Context/AppContext';
function Order() {
    const context = useContext(AppContext);

    useEffect(() => {
        const check = getAllUrlParams(window.location.href);
        if (check.resultcode === '0') {
            toast.success('Thanh toán thành công.Đang chuyển hướng.');
            setTimeout(() => {
                navigate('/');
            }, 5000);
        } else if (check.resultcode) {
            toast.success('Thanh toán Momo thất bại. Đã đặt hàng với phương thức thanh toán trực tiếp.');
            setTimeout(() => {
                navigate('/');
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [cartItems, setCartItems] = useState([]);
    // const [quantity, setQuantity] = useState(0);
    const [data, setData] = useState({
        shipName: '',
        shipPhone: '',
        shipAddress: '',
        note: '',
        shipMethod: 0,
    });
    const [deliverType, setDeliverType] = useState(0);
    const [payType, setPayType] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await cartApi.getCart();
                if (res.length <= 0) {
                    setTimeout(() => {
                        navigate('/product');
                    }, 2000);
                }
                setCartItems(res);
            } catch (err) {
                toast.error('Error.');
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.render]);

    const handleDelete = async (pd) => {
        try {
            await cartApi.deleteCart(pd?.productId);
            setCartItems(cartItems?.filter((item) => item?.productId !== pd?.productId));
            if (cartItems?.filter((item) => item?.productId !== pd?.productId).length <= 0) {
                toast.warning('Không còn sản phẩm trong giở hàng. Đang điều hướng về cửa hàng.');
                setTimeout(() => {
                    navigate('/product');
                }, 5000);
            }
            context.handleReRender();
            toast.success('Xóa sản phẩm thành công.');
        } catch (err) {
            toast.error('Xóa sản phẩm thất bại.');
        }
    };

    // const handleSetData = (e) => {
    //     if (e.target.id === 'receiver-name') {
    //         setData({ ...data, shipName: e.target.value });
    //     }
    //     if (e.target.id === 'receiver-phone') {
    //         setData({ ...data, shipPhone: e.target.value });
    //     }
    //     if (e.target.id === 'receiver-address') {
    //         setData({ ...data, shipAddress: e.target.value });
    //     }
    //     if (e.target.id === 'receiver-note') {
    //         setData({ ...data, note: e.target.value });
    //     }
    // };

    const handleOrder = async (info) => {
        let total =
            cartItems?.reduce((total, num) => {
                return total + num.product.price * num.quantity;
            }, 0) -
            cartItems?.reduce((total, num) => {
                return total + (num.product.price * num.quantity * num.product.discount) / 100;
            }, 0) +
            deliverType;
        console.log('check total:', total);
        if (total > 50000000 && payType === 2) {
            toast.warning('Giá trị đơn hàng vượt quá giới hạn thanh toán của Momo.');
        } else {
            try {
                // for (let key in data) {
                //     if (data[key] === '' && key !== 'note') {
                //         toast.warn('Vui lòng nhập đầy đủ thông tin người nhận.');
                //         return;
                //     }
                // }
                // const payload = info;
                const payload = { ...info, orderDetails: [], id: '', orderer: '', transMethod: payType };
                const res = await orderApi.createOrder(payload);
                if (res) {
                    window.location.assign(res);
                } else {
                    toast.success('Đặt hàng thành công.');
                    setTimeout(() => {
                        navigate('/product');
                    }, 2000);
                }
            } catch (err) {
                console.log(err);
                toast.error('Đặt hàng thất bại.');
            }
        }
    };
    // const handleSetQuantityPlus = async (item) => {
    //     try {
    //         let numbers = parseInt(quantity) + 1;
    //         await cartApi.updateCart(
    //             {
    //                 productId: item.productId,
    //                 quantity: numbers,
    //             }
    //         );
    //         setQuantity(numbers);
    //     } catch (err) {
    //         toast.error(err);
    //     }
    //     console.log(item);
    // };
    // const handleSetQuantityMinus = async (item) => {
    //     if (quantity > 1) {
    //         let numbers = parseInt(quantity) - 1;
    //         await cartApi.updateCart(
    //             {
    //                 productId: item.productId,
    //                 quantity: numbers,
    //             }
    //         );
    //         setQuantity(numbers);
    //     } else {
    //         return;
    //     }
    //     console.log(item);
    // };

    return (
        <Container fluid>
            <Container className="mb-4">
                <Row className="gap-3 mb-4">
                    <Col className="content-box">
                        <h3>Giỏ hàng</h3>
                        <Row className="cart-table-header d-flex align-items-center">
                            <Col xs={6} lg={5}>
                                <p>Tên sản phẩm</p>
                            </Col>
                            <Col xs={2} className="d-none d-lg-block">
                                <p>Đơn giá</p>
                            </Col>
                            <Col xs={1} className="d-none d-lg-block">
                                <p>Số lượng</p>
                            </Col>
                            <Col xs={4} lg={3}>
                                <p>Thành tiền</p>
                            </Col>
                            <Col xs={2} lg={1} className="text-center">
                                <p>Xóa</p>
                            </Col>
                        </Row>
                        <Stack gap={3} className="cart-table-body">
                            {cartItems?.map((item, idx) => (
                                <Row key={idx} className="d-flex align-items-center">
                                    <Col xs={6} lg={5} className="d-flex align-items-center">
                                        <Images
                                            src={item?.product?.images[0] || images.errorImg}
                                            alt="user"
                                            className="pd-order-img"
                                            fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                            style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                                        />

                                        <p className="text-split mb-0 ms-4">{item?.product?.name}</p>
                                    </Col>
                                    <Col xs={2} className="d-none d-lg-block">
                                        <p>{`${splitNumber(item?.product?.price)} đ`}</p>
                                    </Col>
                                    <Col xs={1} className="d-none d-lg-block">
                                        <p>{item?.quantity}</p>
                                    </Col>
                                    <Col xs={4} lg={3}>
                                        <p>{`${splitNumber(item?.product?.price * item?.quantity)} đ`}</p>
                                    </Col>
                                    <Col
                                        xs={2}
                                        lg={1}
                                        className="order-cart-delete text-center"
                                        onClick={() => handleDelete(item)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Col>
                                </Row>
                            ))}
                        </Stack>
                    </Col>
                </Row>

                <Row className="gap-4 mb-4">
                    <Col className=" content-box">
                        <h3>Phương thức thanh toán</h3>
                        <div className="d-flex flex-column gap-3">
                            <div>
                                <Buttons
                                    outline={payType === 1}
                                    primary={payType === 2}
                                    onClick={() => setPayType(2)}
                                    leftIcon={
                                        <img style={{ width: '30px', height: '30px' }} src={images.momo} alt="momo" />
                                    }
                                >
                                    Thanh toán qua Momo
                                </Buttons>
                                <div className={payType === 1 ? 'd-none' : 'd-block'}>
                                    <p>***Chú ý: Giới hạn đơn hàng ở 50.000.000 đồng</p>
                                </div>
                            </div>
                            <div>
                                <Buttons outline={payType === 2} primary={payType === 1} onClick={() => setPayType(1)}>
                                    Trực tiếp
                                </Buttons>
                            </div>
                        </div>
                    </Col>
                    <Col className="content-box">
                        <h3>Phương thức vận chuyển</h3>
                        <div className="d-flex flex-wrap gap-3">
                            <div>
                                <Buttons
                                    outline={deliverType === 100000}
                                    primary={deliverType === 0}
                                    onClick={() => {
                                        setData({ ...data, shipMethod: 0 });
                                        setDeliverType(0);
                                    }}
                                >
                                    Tiêu chuẩn (Miễn phí)
                                </Buttons>
                                <p className="m-0">Nhận sau 3-5 ngày</p>
                            </div>
                            <div>
                                <Buttons
                                    outline={deliverType === 0}
                                    primary={deliverType === 100000}
                                    onClick={() => {
                                        setData({ ...data, shipMethod: 1 });
                                        setDeliverType(100000);
                                    }}
                                >
                                    Siêu tốc (100.000đ/đơn)
                                </Buttons>
                                <p className="m-0">Nhận sau 1-2 ngày</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="gap-4">
                    <Col md={6} xs={12} className="content-box">
                        <h3>Thông tin nhận hàng</h3>

                        <OrderForm submit={handleOrder} />
                    </Col>
                    <Col className="content-box ">
                        <h3 className="mb-4">Thông tin đơn hàng</h3>
                        <Stack gap={3} className="order-info">
                            <div className="d-flex justify-content-between">
                                <p>Tổng tiền sản phẩm</p>
                                <span>{`${splitNumber(
                                    cartItems?.reduce((total, num) => {
                                        return total + num.product.price * num.quantity;
                                    }, 0),
                                )} đ`}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p>Giảm giá</p>
                                <span>{`${splitNumber(
                                    cartItems?.reduce((total, num) => {
                                        return total + (num.product.price * num.product.discount) / 100;
                                    }, 0),
                                )} đ`}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p>Phí vận chuyển</p>
                                <span>{`${splitNumber(deliverType)} đ`}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p>Hình thức thanh toán</p>
                                <span>{payType === 1 ? 'Trực tiếp' : 'Momo'}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center pt-3">
                                <h3 className="m-0">Tổng tiền</h3>
                                <span
                                    style={{ color: 'var(--color-6)', fontSize: '2rem', fontWeight: '600' }}
                                >{`${splitNumber(
                                    cartItems?.reduce((total, num) => {
                                        return total + num.product.price * num.quantity;
                                    }, 0) -
                                        cartItems?.reduce((total, num) => {
                                            return (
                                                total + (num.product.price * num.quantity * num.product.discount) / 100
                                            );
                                        }, 0) +
                                        deliverType,
                                )} đ`}</span>
                            </div>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Order;
