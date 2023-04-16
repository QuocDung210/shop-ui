import { Col, Container, Row, Stack } from 'react-bootstrap';
import './Order.scss';
import { useEffect, useState } from 'react';

import { cartApi, orderApi } from '~/api';
import { toast } from 'react-toastify';
import Images from '~/components/Images';
import images from '~/assets/images';
import { splitNumber } from '~/numberSplit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Buttons from '~/components/Buttons';
import { useNavigate } from 'react-router-dom';
function Order() {
    const [cartItems, setCartItems] = useState([]);
    const [data, setData] = useState({
        shipName: '',
        shipPhone: '',
        shipAddress: '',
        note: '',
        shipMethod: 0,
    });
    const [deliverType, setDeliverType] = useState(0);
    const [payType, setPayType] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await cartApi.getCart();
                setCartItems(res);
            } catch (err) {
                toast.error('Error.');
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            toast.success('Xóa sản phẩm thành công.');
        } catch (err) {
            toast.error('Xóa sản phẩm thất bại.');
        }
    };

    const handleSetData = (e) => {
        if (e.target.id === 'receiver-name') {
            setData({ ...data, shipName: e.target.value });
        }
        if (e.target.id === 'receiver-phone') {
            setData({ ...data, shipPhone: e.target.value });
        }
        if (e.target.id === 'receiver-address') {
            setData({ ...data, shipAddress: e.target.value });
        }
        if (e.target.id === 'receiver-note') {
            setData({ ...data, note: e.target.value });
        }
    };

    const handleOrder = async () => {
        try {
            for (let key in data) {
                if (data[key] === '' && key !== 'note') {
                    toast.warn('Vui lòng nhập đầy đủ thông tin người nhận.');
                    return;
                }
            }
            const payload = { ...data, orderDetails: [] };
            await orderApi.createOrder(payload);

            toast.success('Đặt hàng thành công.');
            setTimeout(() => {
                navigate('/product');
            }, 2000);
        } catch (err) {
            console.log(err);
            toast.error('Đặt hàng thất bại.');
        }
    };

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
                        <div className="d-flex flex-wrap gap-3">
                            <div>
                                <Buttons
                                    outline={payType === true}
                                    primary={payType === false}
                                    onClick={() => setPayType(false)}
                                >
                                    Chuyển khoản
                                </Buttons>
                                <div className={payType ? 'd-none' : 'd-block'}>
                                    <p>
                                        ***Chú ý: Nếu các bạn chọn thanh toán bằng chuyển khoản, hãy làm theo hướng dẫn
                                        sau:
                                    </p>
                                    <p>
                                        Số tài khoản: <strong>123712412648</strong> VietCombank
                                    </p>
                                    <p>
                                        Thời hạn thanh toán : <strong>1 tuần kể từ ngày đặt hàng</strong>.
                                    </p>
                                    <p>
                                        Nội dung chuyển khoản: <strong>Myshop + Số điện thoại bạn dùng đặt hàng</strong>
                                        .
                                    </p>
                                    <p>
                                        <strong>Ghi chú:</strong> Nếu quá hạn bạn không thanh toán, đơn hàng sẽ bị hủy.
                                        Và nếu bạn không thanh toán quá nhiều lần, chúng tôi sẽ khóa tài khoản của
                                        bạn.Khi chuyển khoản hãy chụp lại màn hình hóa đơn chuyển khoản để làm chứng.
                                    </p>
                                </div>
                            </div>

                            <Buttons
                                outline={payType === false}
                                primary={payType === true}
                                onClick={() => setPayType(true)}
                            >
                                Trực tiếp
                            </Buttons>
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
                        <Row className="mt-4 " xs={1}>
                            <Col className="mb-4">
                                <div className="order-receive-ip">
                                    <input id="receiver-name" onChange={handleSetData} type="text" />
                                    <span>Tên người nhận</span>
                                </div>
                            </Col>
                            <Col className="mb-4">
                                <div className="order-receive-ip">
                                    <input id="receiver-phone" onChange={handleSetData} type="number" />
                                    <span>Sđt người nhận</span>
                                </div>
                            </Col>
                            <Col className="mb-4">
                                <div className="order-receive-ip">
                                    <input id="receiver-address" onChange={handleSetData} type="text" />
                                    <span>Địa chỉ nhận hàng</span>
                                </div>
                            </Col>
                            <Col className="mb-4">
                                <div className="order-receive-ip">
                                    <input id="receiver-note" onChange={handleSetData} type="text" />
                                    <span>Ghi chú</span>
                                </div>
                            </Col>
                        </Row>
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
                                        return total + (num.product.price * num.quantity * num.product.discount) / 100;
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
                                <span>{payType ? 'Trực tiếp' : 'Chuyển khoản'}</span>
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
                            <Buttons primary onClick={handleOrder}>
                                Đặt mua
                            </Buttons>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Order;
