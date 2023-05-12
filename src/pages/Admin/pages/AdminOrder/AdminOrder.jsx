import {
    faBan,
    faBoxOpen,
    faCheck,
    faCheckDouble,
    faClock,
    faLayerGroup,
    faTruck,
    faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

import './AdminOrder.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { orderApi } from '~/api';
import { dateFormat } from '~/Date';
import { splitNumber } from '~/numberSplit';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { STATUS_ARR } from '~/const/statusArr';
import config from '~/config';

const STATISTICAL_ITEM = [
    {
        name: 'Tống',
        color: 'total',
        icon: faLayerGroup,
        id: 6,
    },
    {
        name: 'Chờ xác thực',
        color: 'status-waiting',
        icon: faClock,
        id: 0,
    },
    {
        name: 'Đã xác thực',
        color: 'status-comfirmed',
        icon: faCheck,
        id: 1,
    },
    {
        name: 'Đang giao hàng',
        color: 'status-shipping',
        icon: faTruck,
        id: 2,
    },
    {
        name: 'Thành công',
        color: 'status-success',
        icon: faCheckDouble,
        id: 3,
    },
    {
        name: 'Chờ hủy',
        color: 'status-waiting-cancel',
        icon: faUserClock,
        id: 4,
    },
    {
        name: 'Đã hủy',
        color: 'status-cancel',
        icon: faBan,
        id: 5,
    },
];

function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await orderApi.getOrderAdmin();

                setOrders(res);
                setOrderList(res);
            } catch (err) {
                toast.error('Đã xảy ra lỗi.');
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSetType = (e) => {
        if (parseInt(e) === 6) {
            setOrderList(orders);
        } else {
            setOrderList(orders.filter((item) => item?.status === parseInt(e)));
        }
    };

    const setNumber = (status) => {
        if (status === 6) {
            return orders.length;
        }
        const a = orders.filter((item) => item?.status === status);
        return a.length;
    };

    const handleClickOrder = (item) => {
        navigate(`/admin/${config.routes.adminOrderDetail}?${createSearchParams({ d: `${item.id}` })}`);
    };

    return (
        <Container fluid className="admin-manage-order-container">
            <Row>
                <h2>Danh sách đơn hàng</h2>
            </Row>
            <Row className="mb-4">
                <div className="content-box">
                    <h3>Thống kê</h3>
                    <Row className="g-4 mt-0" lg={5} md={4} sm={3} xs={1}>
                        {STATISTICAL_ITEM.map((item, idx) => (
                            <Col key={idx} className="statistical-wrapper">
                                <div className={`statistical-icon   ${item.color}`}>
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <div className="statistical-describe ms-4">
                                    <h4>{item.name}</h4>
                                    <p>
                                        <strong style={{ color: '#000000' }}>{setNumber(item.id)}</strong> đơn hàng
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Row>
            <Row>
                <div className="content-box">
                    <h3 className="mb-4">Danh sách</h3>
                    <Tabs
                        defaultActiveKey={STATISTICAL_ITEM[0].id}
                        id="justify-tab-example"
                        className="statistical-tabs"
                        onSelect={handleSetType}
                    >
                        {STATISTICAL_ITEM.map((item, idx) => (
                            <Tab key={idx} eventKey={item.id} title={item.name}>
                                <Row className={`no-order ${orderList.length > 0 ? 'd-none' : 'd-block'}`}>
                                    <div className="d-flex flex-column ">
                                        <FontAwesomeIcon className="no-order-icon" icon={faBoxOpen} />
                                        <p>Chưa có đơn hàng nào</p>
                                    </div>
                                </Row>
                                <Row
                                    className={`admin-order-list px-5 py-3 ${
                                        orderList.length <= 0 ? 'd-none' : 'd-block'
                                    }`}
                                >
                                    <Row className="mb-3 admin-order-list-title">
                                        <Col className="d-none d-md-block" xs={3}>
                                            Người nhận hàng
                                        </Col>
                                        <Col className="d-none d-md-block" xs={2}>
                                            Sđt mua hàng
                                        </Col>
                                        <Col xs={5} md={3}>
                                            Ngày mua hàng
                                        </Col>
                                        <Col xs={3} md={2}>
                                            Trạng thái
                                        </Col>
                                        <Col xs={4} md={2}>
                                            Tổng tiền
                                        </Col>
                                    </Row>
                                    <hr />
                                    {orderList.length > 0 &&
                                        orderList.map((order, idx) => (
                                            <Row
                                                key={idx}
                                                className="py-3 order-list-item"
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
                                        ))}
                                </Row>
                            </Tab>
                        ))}
                    </Tabs>
                </div>
            </Row>
        </Container>
    );
}

export default AdminOrder;
