import { faCancel, faClock, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { dateFormat } from '~/Date';
import { orderApi } from '~/api';
import { STATUS_ARR } from '~/const/statusArr';
import { splitNumber } from '~/numberSplit';

function History() {
    const [history, setHistory] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(0);
    const [currentOrder, setCurrentOrder] = useState({});

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await orderApi.getOrderUser();
                setHistory(res);
                setSelectedOrder(res[0]?.id || 0);
            } catch (err) {
                console.log(err);
                toast.error('Cố lỗi xảy ra.');
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (selectedOrder !== 0) {
                try {
                    const res = await orderApi.getOrderDetailById(selectedOrder);
                    console.log(res);
                    setCurrentOrder(res);
                } catch (err) {
                    console.log(err);
                    toast.error('Cố lỗi xảy ra.');
                }
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder]);

    const handleCancel = async (item) => {
        try {
            console.log('check order id: ', item.id);
            const res = await orderApi.cancelOrder(item.id);
            console.log(res);
            toast.success('Đã gửi yêu cầu.');
        } catch (err) {
            console.log(err);
            toast.error('Có lỗi xảy ra.');
        }
    };
    return (
        <Container fluid>
            <Stack gap={3}>
                <div className={`content-box ${history.length > 0 && 'd-none'}`}>
                    <h2>Lịch sử trống.</h2>
                </div>
                <Stack gap={3} className={`${history.length === 0 && 'd-none'}`}>
                    <div className="d-flex gap-3 align-items-center ">
                        <FontAwesomeIcon icon={faClock} />
                        <h2 className="m-0">Lịch sử mua hàng</h2>
                    </div>
                    <div className="content-box">
                        <Row className="history-order-header">
                            <Col xs={5}>Ngày đặt hàng</Col>
                            <Col xs={3}>Trạng thái</Col>
                            <Col xs={3}>Tổng tiền</Col>
                            <Col xs={1}>Hủy</Col>
                        </Row>
                        {history?.map((item, idx) => {
                            return (
                                <div key={idx}>
                                    <Row
                                        key={idx}
                                        className={`history-order-item ${selectedOrder === item?.id && 'selected'}`}
                                    >
                                        <Col
                                            xs={5}
                                            className="history-order-item-date d-flex align-items-center"
                                            onClick={() => setSelectedOrder(item.id)}
                                        >
                                            <p className="text-split m-0">{dateFormat(item?.orderDate)}</p>
                                        </Col>
                                        <Col xs={3} className="d-flex align-items-center">
                                            {STATUS_ARR.map(
                                                (color, index) =>
                                                    index === item?.status && (
                                                        <p key={index} className={`${color.type}`}>
                                                            {color.name}
                                                        </p>
                                                    ),
                                            )}
                                        </Col>
                                        <Col xs={3} className="d-flex align-items-center">
                                            <p className="m-0">{`${splitNumber(item?.orderValue)} đ`}</p>
                                        </Col>
                                        <Col xs={1} className="d-flex align-items-center">
                                            <div
                                                className="text-center history-order-item-cancel "
                                                onClick={() => handleCancel(item)}
                                            >
                                                <FontAwesomeIcon className="order-cancel-icon" icon={faCancel} />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })}
                    </div>
                </Stack>
                <Stack gap={3} className={`${selectedOrder === 0 && 'd-none'}`}>
                    <div className="d-flex align-items-center gap-3">
                        <FontAwesomeIcon icon={faFileInvoice} />
                        <h2 className="m-0">Chi tiết đơn hàng</h2>
                    </div>
                    <Stack gap={5} className="content-box">
                        <Row className="order-info-header">
                            <h3 className="mb-4">THÔNG TIN ĐƠN HÀNG</h3>
                            <Col>
                                <p>
                                    Người đặt hàng: <strong>{currentOrder?.orderer}</strong>
                                </p>
                                <p>
                                    Người nhận hàng: <strong>{currentOrder?.shipName}</strong>
                                </p>
                                <p>
                                    Số điện thoại: <strong>{currentOrder?.shipPhone}</strong>
                                </p>
                                <p>
                                    Địa chỉ nhận hàng: <strong>{currentOrder?.shipAddress}</strong>
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    Phương thức vận chuyển:{' '}
                                    <strong>{currentOrder?.shipMethod === 1 ? 'Tốc hành' : 'Thông thường'}</strong>
                                </p>
                                <p>
                                    Phương thức thanh toán:{' '}
                                    <strong>
                                        {currentOrder?.transMethod === 1 ? 'Thanh toán trực tiếp' : 'Thanh toán Momo'}
                                    </strong>
                                </p>
                                <p>
                                    Ngày đặt hàng: <strong>{dateFormat(currentOrder?.orderDate)}</strong>
                                </p>
                                <p>
                                    Trạng thái thanh toán :{' '}
                                    <strong>{currentOrder?.isPay ? 'Đã thanh toán' : 'Chưa thanh toán'}</strong>
                                </p>
                            </Col>
                            <div className="order-value d-flex flex-wrap align-items-center">
                                <h3 className="m-4">TỔNG TIỀN HÓA ĐƠN</h3>
                                <p className="m-4">{`${splitNumber(currentOrder?.orderValue)} đ`}</p>
                            </div>
                        </Row>

                        <Row className="history-order-header">
                            <Col xs={1}>#</Col>
                            <Col xs={4}>Tên sản phẩm</Col>
                            <Col xs={2}>Số lượng</Col>
                            <Col xs={3}>Đơn giá</Col>
                            <Col xs={2}>Thành tiền</Col>
                        </Row>
                        {currentOrder?.orderDetails?.map((item, idx) => {
                            return (
                                <div key={idx}>
                                    <Row key={idx} className="history-order-item">
                                        <Col xs={1} className="text-start d-flex align-items-center">
                                            <p>{idx + 1}</p>
                                        </Col>
                                        <Col xs={4} className="history-order-item-name d-flex align-items-center">
                                            <p className="text-split m-0">{item?.product?.name}</p>
                                        </Col>
                                        <Col xs={2} className="d-flex align-items-center justify-content-center">
                                            {item?.quantity}
                                        </Col>
                                        <Col xs={3} className="d-flex align-items-center">
                                            <p className="m-0">{`${splitNumber(item?.product?.price)} đ`}</p>
                                        </Col>
                                        <Col xs={2} className="d-flex align-items-center ">
                                            <p className="m-0">{`${splitNumber(item?.amount)} đ`}</p>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })}
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
}

export default History;
