import {
    faBan,
    faCheck,
    faChevronLeft,
    faChevronRight,
    faClock,
    faEllipsisV,
    faLayerGroup,
    faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Stack, Tab, Tabs } from 'react-bootstrap';
import Tippy from '@tippyjs/react/headless';
import './AdminOrder.scss';
import { useState } from 'react';

const STATISTICAL_ITEM = [
    {
        name: 'Tống',
        color: 'total',
        icon: faLayerGroup,
    },
    {
        name: 'Thành công',
        color: 'success',
        icon: faCheck,
    },
    {
        name: 'Đang giao hàng',
        color: 'delivery',
        icon: faTruck,
    },
    {
        name: 'Chờ xác thực',
        color: 'waiting',
        icon: faClock,
    },
    {
        name: 'Đã hủy',
        color: 'cancel',
        icon: faBan,
    },
];

const data = [
    {
        name: 'Asus',
        uv: 31.47,
        pv: 2400,
        fill: '#8884d8',
    },
    {
        name: 'Macbook',
        uv: 26.69,
        pv: 4567,
        fill: '#83a6ed',
    },
    {
        name: 'HP',
        uv: 15.69,
        pv: 1398,
        fill: '#8dd1e1',
    },
    {
        name: 'Dell',
        uv: 8.22,
        pv: 9800,
        fill: '#82ca9d',
    },
    {
        name: 'MSI',
        uv: 8.63,
        pv: 3908,
        fill: '#a4de6c',
    },
    {
        name: 'Lenovo',
        uv: 2.63,
        pv: 4800,
        fill: '#d0ed57',
    },
    {
        name: 'Acer',
        uv: 6.67,
        pv: 4800,
        fill: '#ffc658',
    },
];

function AdminOrder() {
    const [currentType, setCurrentType] = useState(data[0].name);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSetType = (e) => {
        setCurrentType(e);
        setCurrentPage(1);
    };

    const handleNext = () => {
        if (currentPage < 10) {
            setCurrentPage(currentPage + 1);
        }
        console.log(currentType);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Container fluid>
            <Row>
                <h2>Danh sách đơn hàng</h2>
            </Row>
            <Row className="mb-4">
                <div className="content-box">
                    <h2>Thống kê</h2>
                    <Row className="g-4 mt-0" lg={5} md={4} sm={3} xs={1}>
                        {STATISTICAL_ITEM.map((item, idx) => (
                            <Col key={idx} className="statistical-wrapper">
                                <div className={`statistical-icon bg-${item.color}`}>
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                                <div className="statistical-describe ms-4">
                                    <h4>{item.name}</h4>
                                    <p>
                                        <strong style={{ color: '#000000' }}>X</strong> đơn hàng
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Row>
            <Row>
                <div className="content-box">
                    <Tabs
                        defaultActiveKey={STATISTICAL_ITEM[0].name}
                        id="justify-tab-example"
                        className="statistical-tabs"
                        onSelect={handleSetType}
                    >
                        {STATISTICAL_ITEM.map((item, idx) => (
                            <Tab key={idx} eventKey={item.name} title={item.name}>
                                <Row className="admin-order-list px-5 py-3">
                                    <Row className="mb-3 fw-bold">
                                        <Col xs={3}>Mã đơn hàng</Col>
                                        <Col xs={2}>Ngày mua hàng</Col>
                                        <Col xs={2}>Người nhận hàng</Col>
                                        <Col xs={2}>Trạng thái</Col>
                                        <Col xs={2}>Tổng tiền</Col>
                                        <Col xs={1}></Col>
                                    </Row>
                                    <hr />
                                    {data.map((member, idx) => (
                                        <Row key={idx} className="py-3 order-list-item">
                                            <Col xs={3} className="d-flex align-items-center">
                                                {member.name}
                                            </Col>
                                            <Col xs={2} className="d-flex align-items-center">
                                                {idx + 1}
                                            </Col>
                                            <Col xs={2} className="d-flex align-items-center">
                                                {member.uv}
                                            </Col>
                                            <Col xs={2} className="d-flex align-items-center">
                                                {member.pv}
                                            </Col>
                                            <Col xs={2} className="d-flex align-items-center">
                                                {member.pv}
                                            </Col>
                                            <Col xs={1} className="d-flex align-items-center justify-content-end">
                                                <Tippy
                                                    delay={[0, 200]}
                                                    placement="bottom-end"
                                                    interactive
                                                    arrow
                                                    render={(attrs) => (
                                                        <Stack className="order-menu content-box p-3" {...attrs}>
                                                            <div className="order-menu-option">option 1</div>
                                                            <div className="order-menu-option">option 2</div>
                                                            <div className="order-menu-option">option 3</div>
                                                            <div className="order-menu-option">option 4</div>
                                                        </Stack>
                                                    )}
                                                >
                                                    <FontAwesomeIcon icon={faEllipsisV} className="order-menu-icon" />
                                                </Tippy>
                                            </Col>
                                        </Row>
                                    ))}
                                </Row>
                                <Row>
                                    <div className="page-pagination d-flex justify-content-end pt-4">
                                        <p className="mb-0 me-5">{`${currentPage}/${10} trang`}</p>
                                        <div className="page-pagination-btn d-flex align-items-center  ">
                                            <FontAwesomeIcon
                                                icon={faChevronLeft}
                                                className="pagination-btn-prev"
                                                onClick={handlePrev}
                                            />

                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                                className="pagination-btn-next"
                                                onClick={handleNext}
                                            />
                                        </div>
                                    </div>
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
