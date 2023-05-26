import { Col, Container, Row, Stack } from 'react-bootstrap';
import './Employee.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faBoxOpen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { orderApi } from '~/api';
import { dateFormat } from '~/Date';
import { STATUS_ARR } from '~/const/statusArr';
import { splitNumber } from '~/numberSplit';
import { createSearchParams, useNavigate } from 'react-router-dom';

function Employee() {
    // const [listOrder, setListOrder] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState([]);
    const [orderShipping, setOrderShipping] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await orderApi.getOrdersShipper();
                // setListOrder(res);
                if (res && res.length >= 0) {
                    setOrderShipping(res.filter((item) => item?.status === 2));
                    setOrderSuccess(res.filter((item) => item?.status !== 2));
                }
            } catch (err) {
                console.log(err);
                toast.error('Có lỗi xảy ra.');
            }
        };
        fetch();
    }, []);

    const handleClickOrder = (order) => {
        navigate(`/admin/employee/order-detail?${createSearchParams({ d: `${order.id}` })}`);
    };
    return (
        <Container fluid className="employee-container">
            <Stack gap={4}>
                <Row className="gap-3">
                    <Col xs={12} sm={6} className="content-box ">
                        <Stack className="delivery-statistics" gap={3}>
                            <FontAwesomeIcon className="delivery-statistics-icon yes" icon={faCheck} />
                            <span>{orderSuccess.length}</span>
                            <p>Đơn hàng đã giao</p>
                        </Stack>
                    </Col>
                    <Col className="content-box ">
                        <Stack className="delivery-statistics" gap={3}>
                            <FontAwesomeIcon className="delivery-statistics-icon no" icon={faBan} />
                            <span>{orderShipping.length}</span>
                            <p>Đơn hàng chưa giao</p>
                        </Stack>
                    </Col>
                </Row>
                <Row style={{ opacity: 0.5 }}>
                    <div className="content-box">
                        <h2>Thống kế đơn hàng trong tháng</h2>
                        <div>
                            <p>Coming soon</p>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="content-box">
                        <h2 className="mb-3">Danh sách đơn hàng chưa giao</h2>
                        <div>
                            <Row className="mb-3 admin-order-list-title">
                                <Col className="d-none d-md-block" xs={3}>
                                    Người nhận hàng
                                </Col>
                                <Col className="d-none d-md-block" xs={2}>
                                    Sđt mua hàng
                                </Col>
                                <Col xs={3}>Thanh toán</Col>
                                <Col xs={4} md={2}>
                                    Trạng thái
                                </Col>
                                <Col xs={5} md={2}>
                                    Tổng tiền
                                </Col>
                            </Row>
                            <hr />
                            {orderShipping.length > 0 ? (
                                orderShipping.map((order, idx) => (
                                    <Row
                                        key={idx}
                                        className="py-3 order-shipping-item"
                                        onClick={() => handleClickOrder(order)}
                                    >
                                        <Col xs={3} className="d-none d-md-flex align-items-center">
                                            {order?.shipName}
                                        </Col>
                                        <Col xs={2} className="d-none d-md-flex align-items-center">
                                            {order?.shipPhone}
                                        </Col>
                                        <Col xs={3} className="d-flex align-items-center">
                                            {order?.transMethod === 1 ? 'Trực tiếp' : 'Momo'}
                                        </Col>
                                        <Col xs={4} md={2} className="d-flex align-items-center">
                                            {STATUS_ARR.map(
                                                (item, idx) =>
                                                    idx === order?.status && (
                                                        <p key={idx} className={`${item.type}`}>
                                                            {item.name}
                                                        </p>
                                                    ),
                                            )}
                                        </Col>
                                        <Col xs={5} md={2} className="d-flex align-items-center">
                                            {`${splitNumber(order?.orderValue)} đ`}
                                        </Col>
                                    </Row>
                                ))
                            ) : (
                                <Row className="py-4">
                                    <div className="d-flex flex-column align-items-center" style={{ opacity: 0.5 }}>
                                        <FontAwesomeIcon style={{ fontSize: '5rem' }} icon={faBoxOpen} />
                                        <p style={{ fontWeight: '500' }}>Chưa có đơn hàng nào</p>
                                    </div>
                                </Row>
                            )}
                        </div>
                    </div>
                </Row>
                <Row>
                    <div className="content-box">
                        <h2 className="mb-3">Danh sách đơn hàng đã giao</h2>
                        <div>
                            <Row className="mb-3 admin-order-list-title">
                                <Col className="d-none d-md-block" xs={3}>
                                    Người nhận hàng
                                </Col>
                                <Col className="d-none d-md-block" xs={2}>
                                    Sđt mua hàng
                                </Col>
                                <Col xs={3} md={3}>
                                    Hạn giao hàng
                                </Col>
                                <Col xs={4} md={2}>
                                    Trạng thái
                                </Col>
                                <Col xs={5} md={2}>
                                    địa chỉ
                                </Col>
                            </Row>
                            <hr />
                            {orderSuccess.length > 0 ? (
                                orderSuccess.map((order, idx) => (
                                    <Row
                                        key={idx}
                                        className="py-3 order-shipping-item"
                                        onClick={() => handleClickOrder(order)}
                                    >
                                        <Col xs={3} className="d-none d-md-flex align-items-center">
                                            {order?.shipName}
                                        </Col>
                                        <Col xs={2} className="d-none d-md-flex align-items-center">
                                            {order?.shipPhone}
                                        </Col>
                                        <Col xs={5} md={3} className="d-flex align-items-center">
                                            {dateFormat(order?.orderDate)}
                                        </Col>
                                        <Col xs={3} md={2} className="d-flex align-items-center">
                                            {STATUS_ARR.map(
                                                (item, idx) =>
                                                    idx === order?.status && (
                                                        <p key={idx} className={`${item.type}`}>
                                                            {item.name}
                                                        </p>
                                                    ),
                                            )}
                                        </Col>
                                        <Col xs={4} md={2} className="d-flex align-items-center">
                                            {`${splitNumber(order?.orderValue)} đ`}
                                        </Col>
                                    </Row>
                                ))
                            ) : (
                                <Row className="py-4">
                                    <div className="d-flex flex-column align-items-center" style={{ opacity: 0.5 }}>
                                        <FontAwesomeIcon style={{ fontSize: '5rem' }} icon={faBoxOpen} />
                                        <p style={{ fontWeight: '500' }}>Chưa có đơn hàng nào</p>
                                    </div>
                                </Row>
                            )}
                        </div>
                    </div>
                </Row>
            </Stack>
        </Container>
    );
}

export default Employee;
