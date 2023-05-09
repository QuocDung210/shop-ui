import { Col, Container, Row, Stack } from 'react-bootstrap';
import './AdminOrderDetail.scss';
import { dateFormat } from '~/Date';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { orderApi } from '~/api';
import { splitNumber } from '~/numberSplit';
import Buttons from '~/components/Buttons';
import { toast } from 'react-toastify';
import { STATUS_ARR } from '~/const/statusArr';

function AdminOrderDetail() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('d');
    const [orderTarget, setOrderTarget] = useState({});
    const [render, setRender] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const res = await orderApi.getOrderDetailById(query);
            setOrderTarget(res);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, render]);

    const handleUpdateStatus = async () => {
        try {
            await orderApi.updateOrder(orderTarget.id);
            toast.success('Cập nhật thành công.');
            setRender(!render);
        } catch (err) {
            toast.error('Có lỗi xảy ra.');
        }
    };

    const handleCancelOrder = async () => {
        try {
            if (orderTarget.status !== 3 || orderTarget.status !== 5) {
                await orderApi.cancelOrderAdmin(orderTarget.id);
                toast.success('Cập nhật thành công.');
                setRender(!render);
            }
        } catch (err) {
            toast.error('Có lỗi xảy ra.');
            console.log(err);
        }
    };

    return (
        <Container fluid>
            <Row className="mb-4">
                <h2>Trạng thái đơn hàng</h2>
                <div className="d-flex flex-wrap gap-4 justify-content-around content-box">
                    {STATUS_ARR.map(
                        (item, idx) =>
                            idx === orderTarget?.status && (
                                <p key={idx} className={`${item.type}`}>
                                    {item.name}
                                </p>
                            ),
                    )}
                    <div className="d-flex gap-3">
                        <div>
                            <Buttons
                                primary
                                disabled={orderTarget?.status === 3 || orderTarget?.status === 5 ? true : false}
                                onClick={handleUpdateStatus}
                            >
                                Cập nhật trạng thái
                            </Buttons>
                        </div>
                        <div
                            className={
                                orderTarget?.isPay ||
                                orderTarget?.status === 3 ||
                                orderTarget?.status === 5 ||
                                orderTarget?.status === 4
                                    ? 'd-none'
                                    : 'd-block'
                            }
                        >
                            <Buttons outline onClick={handleCancelOrder}>
                                Hủy
                            </Buttons>
                        </div>
                    </div>
                </div>
            </Row>
            <Row>
                <Stack gap={3}>
                    <div className="d-flex align-items-center gap-3">
                        <h2 className="m-0">Chi tiết đơn hàng</h2>
                    </div>
                    <Stack gap={5} className="content-box">
                        <Row className="order-info-header">
                            <h3 className="mb-4">THÔNG TIN ĐƠN HÀNG</h3>
                            <Col>
                                <p>
                                    Người đặt hàng: <strong>{orderTarget?.orderer}</strong>
                                </p>
                                <p>
                                    Người nhận hàng: <strong>{orderTarget?.shipName}</strong>
                                </p>
                                <p>
                                    Số điện thoại: <strong>{orderTarget?.shipPhone}</strong>
                                </p>
                                <p>
                                    Địa chỉ nhận hàng: <strong>{orderTarget?.shipAddress}</strong>
                                </p>
                            </Col>
                            <Col>
                                <p>
                                    Phương thức vận chuyển:{' '}
                                    <strong>{orderTarget?.shipMethod === 1 ? 'Siêu tốc' : 'Thông thường'}</strong>
                                </p>
                                <p>
                                    Phương thức thanh toán:{' '}
                                    <strong>
                                        {orderTarget?.transMethod === 1 ? 'Thanh toán trực tiếp' : 'Thanh toán Momo'}
                                    </strong>
                                </p>
                                <p>
                                    Ngày đặt hàng: <strong>{dateFormat(orderTarget?.orderDate)}</strong>
                                </p>
                                <p>
                                    Trạng thái thanh toán :{' '}
                                    <strong>{orderTarget?.isPay ? 'Đã thanh toán' : 'Chưa thanh toán'}</strong>
                                </p>
                            </Col>
                            <div className="order-value d-flex flex-wrap align-items-center">
                                <h3 className="m-4">TỔNG TIỀN HÓA ĐƠN</h3>
                                <p className="m-4">{`${splitNumber(orderTarget?.orderValue)} đ`}</p>
                            </div>
                        </Row>

                        <Row className="history-order-header">
                            <Col xs={1}>#</Col>
                            <Col xs={4}>Tên sản phẩm</Col>
                            <Col xs={2}>Số lượng</Col>
                            <Col xs={3}>Đơn giá</Col>
                            <Col xs={2}>Thành tiền</Col>
                        </Row>
                        {orderTarget?.orderDetails?.map((item, idx) => {
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
            </Row>
        </Container>
    );
}

export default AdminOrderDetail;
