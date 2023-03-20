import { faEllipsisV, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Modal, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Buttons from '~/components/Buttons';
import Images from '~/components/Images';
import './AdminProducts.scss';

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
function AdminProducts() {
    const [type, setType] = useState(data[0].name);
    const [showDeleteMember, setShowDeleteMember] = useState(false);
    const [showDeleteMembers, setShowDeleteMembers] = useState(false);
    // const [curentMember, setCurrentMember] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSetInput = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim() !== '') {
            console.log(searchValue);
        }
    };

    const handleCheckAll = (e) => {
        const checkboxItem = document.querySelectorAll('.checkbox-item');
        if (e.target.checked === true) {
            setIsChecked(true);
            checkboxItem.forEach((item) => {
                item.checked = true;
            });
        } else if (e.target.checked === false) {
            setIsChecked(false);

            checkboxItem.forEach((item) => {
                item.checked = false;
            });
        }
    };

    const handleCloseDeleteMember = () => setShowDeleteMember(false);
    const handleShowDeleteMember = () => setShowDeleteMember(true);
    const handleDeleteMember = () => {
        setShowDeleteMember(false);
    };

    const handleCloseDeleteMembers = () => setShowDeleteMembers(false);
    const handleShowDeleteMembers = () => {
        setShowDeleteMembers(true);
    };
    const handleDeleteMembers = () => {
        const checked = document.querySelectorAll('input[name="productIds"]:checked');

        checked.forEach((item) => {
            console.log(item.value);
        });
        setShowDeleteMembers(false);
    };
    const renderDeleteBtn = () => {
        const checked = document.querySelectorAll('input[name="productIds"]:checked');
        if (checked.length > 0) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    };
    return (
        <Container fluid className="acc-wrapper">
            <Row className="mb-4">
                <h2>Danh sách thành viên</h2>
            </Row>
            <Row className="acc-tools mb-4 content-box">
                <div className="d-flex align-items-center  p-0">
                    <h2 className="my-0 me-5">Công cụ</h2>
                    <Buttons primary to={'/admin/add-product'} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Thêm sản phẩm
                    </Buttons>
                    <Buttons
                        disabled={!isChecked}
                        primary
                        onClick={handleShowDeleteMembers}
                        leftIcon={<FontAwesomeIcon icon={faMinus} />}
                    >
                        Xoá đã chọn
                    </Buttons>
                </div>
            </Row>
            <Row className="mb-4 admin-search-container content-box">
                <Col xs={3}>
                    <Dropdown className="filter-product" as={ButtonGroup}>
                        <Button className="btn-filter-product" variant="success">
                            {type}
                        </Button>

                        <Dropdown.Toggle
                            className="propdown-filter-product"
                            split
                            variant="success"
                            id="dropdown-split-basic"
                        />

                        <Dropdown.Menu className="menu-filter-product">
                            {data.map((item, idx) => (
                                <Dropdown.Item key={idx} onClick={() => setType(item.name)}>
                                    {item.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <form className="admin-pd-search">
                        <input
                            className="admin-pd-search-input"
                            value={searchValue}
                            placeholder="Search name, id"
                            onChange={handleSetInput}
                            spellCheck={false}
                            name="searchInput"
                        />
                        <button className="admin-pd-search-btn" type="submit" onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                </Col>
            </Row>
            <Row className="admin-acc-list content-box">
                <Row className="mb-3 fw-bold">
                    <Col xs={5}>
                        <div className="d-flex align-items-center">
                            <input
                                type={'checkbox'}
                                size={60}
                                className="acc-checkbox checkbox-all"
                                onChange={handleCheckAll}
                                value={searchValue}
                            />
                            <span className="ms-3">Tên sản phẩm</span>
                        </div>
                    </Col>
                    <Col xs={2}>Ngày tạo</Col>
                    <Col xs={2}>Trạng thái</Col>
                    <Col xs={2}>Giá</Col>
                    <Col xs={1}></Col>
                </Row>
                <hr />
                {data.map((member, idx) => (
                    <Row key={idx} className="py-3 acc-list-item">
                        <Col xs={5}>
                            <div className="d-flex align-items-center gap-3">
                                <input
                                    type={'checkbox'}
                                    size={60}
                                    className="acc-checkbox checkbox-item"
                                    value={member.name}
                                    name="productIds"
                                    onChange={renderDeleteBtn}
                                />
                                <Images
                                    src=""
                                    alt="user"
                                    className="current-user"
                                    fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                    style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                                />
                                <span className="ms-3">{member.name}</span>
                            </div>
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
                        <Col xs={1} className="d-flex align-items-center justify-content-end">
                            <Tippy
                                delay={[0, 300]}
                                placement="bottom-end"
                                interactive
                                arrow
                                render={(attrs) => (
                                    <Stack className="acc-menu content-box p-3" {...attrs}>
                                        <div className="acc-menu-option">
                                            <Link to={'/admin/update-product'}>
                                                <p className="my-2 mx-3">Cập nhật</p>
                                            </Link>
                                        </div>
                                        <div className="acc-menu-option">
                                            <p className="my-2 mx-3" onClick={() => handleShowDeleteMember()}>
                                                Xóa
                                            </p>
                                        </div>
                                    </Stack>
                                )}
                            >
                                <FontAwesomeIcon icon={faEllipsisV} className="acc-menu-icon" />
                            </Tippy>
                        </Col>
                    </Row>
                ))}
            </Row>

            <Modal show={showDeleteMember} onHide={handleCloseDeleteMember} className="delete-member">
                <Modal.Body>Xác nhận xóa sản phẩm!</Modal.Body>
                <Modal.Footer>
                    <Buttons onClick={handleCloseDeleteMember} outline small>
                        Cancel
                    </Buttons>
                    <Buttons onClick={handleDeleteMember} primary small>
                        OK
                    </Buttons>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteMembers} onHide={handleCloseDeleteMembers} className="delete-members">
                <Modal.Body>Xác nhận xóa danh sách sản phẩm đã chọn!</Modal.Body>
                <Modal.Footer>
                    <Buttons onClick={handleCloseDeleteMembers} outline small>
                        Cancel
                    </Buttons>
                    <Buttons onClick={handleDeleteMembers} primary small>
                        OK
                    </Buttons>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AdminProducts;