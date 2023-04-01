import { faChevronLeft, faChevronRight, faEllipsisV, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Modal, Row, Stack } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import Tippy from '@tippyjs/react/headless';
import './Account.scss';
import Images from '~/components/Images';

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

function Account() {
    let arr = ['All', 'Employee', 'Admin'];
    const [type, setType] = useState(arr[0]);
    const [showSetRole, setShowSetRole] = useState(false);
    const [showDeleteMember, setShowDeleteMember] = useState(false);
    const [showDeleteMembers, setShowDeleteMembers] = useState(false);
    const [curentMember, setCurrentMember] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

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
    const handleCloseSetRole = () => setShowSetRole(false);
    const handleShowSetRole = (member) => {
        setCurrentMember(member);
        setShowSetRole(true);
    };
    const handleSetRole = () => {
        setShowSetRole(false);
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
        const checked = document.querySelectorAll('input[name="memberIds[]"]:checked');

        checked.forEach((item) => {
            console.log(item.value);
        });
        setShowDeleteMembers(false);
    };
    const renderDeleteBtn = () => {
        const checked = document.querySelectorAll('input[name="memberIds[]"]:checked');
        if (checked.length > 0) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    };
    const handleNext = () => {
        if (currentPage < 10) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
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
                    <Buttons primary to={'/admin/add-account'} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Thêm tài khoản
                    </Buttons>
                    <Buttons
                        primary
                        disabled={!isChecked}
                        onClick={handleShowDeleteMembers}
                        leftIcon={<FontAwesomeIcon icon={faMinus} />}
                    >
                        Xoá đã chọn
                    </Buttons>
                </div>
            </Row>
            <Row className="mb-4 admin-search-container content-box">
                <Col xs={3}>
                    <Dropdown className="filter-role" as={ButtonGroup}>
                        <Button className="btn-filter-role" variant="success">
                            {type}
                        </Button>

                        <Dropdown.Toggle
                            className="propdown-filter-role"
                            split
                            variant="success"
                            id="dropdown-split-basic"
                        />

                        <Dropdown.Menu className="menu-filter-role">
                            {arr.map((item, idx) => (
                                <Dropdown.Item key={idx} onClick={() => setType(item)}>
                                    {item}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
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
                            />
                            <span className="ms-3">Tên nhân viên</span>
                        </div>
                    </Col>
                    <Col xs={2}>Mã nhân viên</Col>
                    <Col xs={2}>Ngày tạo</Col>
                    <Col xs={2}>Chức vụ</Col>
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
                                    name={'memberIds[]'}
                                    onChange={renderDeleteBtn}
                                />
                                <Images
                                    src=""
                                    alt="user"
                                    className="current-user d-none d-md-block"
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
                                delay={[0, 200]}
                                placement="bottom-end"
                                interactive
                                arrow
                                render={(attrs) => (
                                    <Stack className="acc-menu content-box p-3" {...attrs}>
                                        <div className="acc-menu-option">
                                            <p className="my-2 mx-3 " onClick={() => handleShowSetRole(member)}>
                                                {member.pv <= 4000 ? 'Cấp quyên admin' : 'Bỏ quyền admin'}
                                            </p>
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
                <Row style={{ borderTop: '2px solid #ccc' }}>
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
            </Row>
            <Modal show={showSetRole} onHide={handleCloseSetRole} className="set-role">
                <Modal.Body>
                    {curentMember.pv >= 4000 ? (
                        <p>Xác nhận bỏ quyền admin của {curentMember.name}!</p>
                    ) : (
                        <p>Xác nhận cấp quyền admin cho {curentMember.name}!</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Buttons onClick={handleCloseSetRole} outline small>
                        Cancel
                    </Buttons>
                    <Buttons onClick={handleSetRole} primary small>
                        OK
                    </Buttons>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteMember} onHide={handleCloseDeleteMember} className="delete-member">
                <Modal.Body>Xác nhận xóa tài khoản thành viên {curentMember.name}!</Modal.Body>
                <Modal.Footer>
                    <Buttons onClick={handleCloseDeleteMember} outline small>
                        Cancel
                    </Buttons>
                    <Buttons variant="primary" onClick={handleDeleteMember} primary small>
                        OK
                    </Buttons>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteMembers} onHide={handleCloseDeleteMembers} className="delete-members">
                <Modal.Body>Xác nhận xóa tài khoản thành viên !</Modal.Body>
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

export default Account;
