import { faEllipsisV, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Modal, Row, Stack } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import Tippy from '@tippyjs/react/headless';
import './Account.scss';
import Images from '~/components/Images';
import { userApi } from '~/api';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { ROLE_ARR } from '~/const/roleArr';
import { toast } from 'react-toastify';
import config from '~/config';
import useAuth from '~/hooks/useAuth';

function Account() {
    let arr = ['Customer', 'Employee', 'Admin'];
    const [type, setType] = useState('All');
    const [userList, setUserList] = useState([]);

    const [isChecked, setIsChecked] = useState(false);
    const [showDeleteMember, setShowDeleteMember] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState([]);
    const [render, setRender] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();
    useEffect(() => {
        if (auth.user.role === 'employee') {
            navigate('/admin/order');
            return;
        }
        const fetch = async () => {
            const res = await userApi.getAll();
            if (type === 'All') {
                setUserList(res);
            }
            if (type === arr[0]) {
                setUserList(res.filter((item) => item?.role === arr[0]));
            }
            if (type === arr[1]) {
                setUserList(res.filter((item) => item?.role === arr[1]));
            }
            if (type === arr[2]) {
                setUserList(res.filter((item) => item?.role === arr[2]));
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [render, type]);

    const handleCheckAll = (e) => {
        const checkboxItem = document.querySelectorAll('.checkbox-item');
        if (e.target.checked === true) {
            setIsChecked(true);
            setDeleteTarget(userList);
            checkboxItem.forEach((item) => {
                item.checked = true;
            });
        } else if (e.target.checked === false) {
            setIsChecked(false);
            setDeleteTarget([]);
            checkboxItem.forEach((item) => {
                item.checked = false;
            });
        }
    };

    const renderDeleteBtn = (e, user) => {
        const checked = document.querySelectorAll('input[name="memberIds[]"]:checked');
        if (checked.length > 0) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
        if (e.target.checked === true) {
            setDeleteTarget([...deleteTarget, user]);
        } else {
            setDeleteTarget(deleteTarget.filter((member) => member?.phone !== user.phone));
        }
    };

    const handleViewDetail = (user) => {
        navigate(`/admin/${config.routes.accountDetail}?${createSearchParams({ acc: `${user.name}%${user.phone}` })}`);
    };

    const handleShowDeleteUser = (user) => {
        setShowDeleteMember(true);
        setDeleteTarget([user]);
    };

    const handleDeleteUser = async () => {
        try {
            for (let i of deleteTarget) {
                await userApi.deleteUser({
                    id: '',
                    name: '',
                    email: '',
                    phone: i.phone,
                    password: '',
                    img: '',
                    roleId: 0,
                });
            }
            setShowDeleteMember(!showDeleteMember);
            setDeleteTarget([]);
            setRender(!render);
            setIsChecked(false);
            toast.success('Xóa thành công.');
        } catch (err) {
            console.log(err);
            setShowDeleteMember(!showDeleteMember);
            setDeleteTarget([]);
            toast.error('Có lỗi xảy ra. Xóa không thành công.');
        }
    };

    const handleCancel = () => {
        setShowDeleteMember(false);
        setDeleteTarget([]);
    };
    return (
        <Container fluid className="acc-wrapper">
            <Row className="mb-4">
                <h2>Danh sách thành viên</h2>
            </Row>
            <Row className="acc-tools mb-4 content-box">
                <div className="d-flex align-items-center  p-0">
                    <h2 className="my-0 me-5">Công cụ</h2>
                    <Buttons
                        primary
                        to={`/admin/${config.routes.addAccount}`}
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                    >
                        Thêm tài khoản
                    </Buttons>
                    <Buttons
                        primary
                        disabled={!isChecked}
                        leftIcon={<FontAwesomeIcon icon={faMinus} />}
                        onClick={() => setShowDeleteMember(true)}
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
                            <Dropdown.Item onClick={() => setType('All')}>All</Dropdown.Item>
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
                <Row className="mb-3 admin-acc-list-header">
                    <Col xs={6} md={3}>
                        <div className="d-flex align-items-center">
                            <input
                                type={'checkbox'}
                                size={60}
                                className="acc-checkbox checkbox-all d-none d-sm-block"
                                onChange={handleCheckAll}
                            />
                            <span className="ms-3">Name</span>
                        </div>
                    </Col>
                    <Col xs={2} className="d-none d-md-block">
                        Phone
                    </Col>
                    <Col xs={4} className="d-none d-md-block">
                        Email
                    </Col>
                    <Col xs={5} md={2}>
                        Role
                    </Col>
                    <Col xs={1}></Col>
                </Row>
                <hr />
                <div style={{ maxHeight: '300px', overflow: 'overlay' }}>
                    {userList.length > 0 &&
                        userList.map((user, idx) => (
                            <Row key={idx} className="py-3 acc-list-item">
                                <Col xs={6} md={3}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <input
                                                type={'checkbox'}
                                                size={60}
                                                className="acc-checkbox checkbox-item d-none d-sm-block"
                                                value={user?.phone}
                                                name={'memberIds[]'}
                                                onChange={(e) => renderDeleteBtn(e, user)}
                                            />
                                            <Images
                                                src={user?.img}
                                                alt="user"
                                                className="current-user d-none d-md-block"
                                                fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                                style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                                            />
                                        </div>
                                        <span className="ms-3">{user?.name}</span>
                                    </div>
                                </Col>
                                <Col xs={2} className="d-none d-md-flex align-items-center">
                                    {user?.phone}
                                </Col>
                                <Col xs={4} className="d-none d-md-flex align-items-center">
                                    {user?.email}
                                </Col>
                                <Col xs={5} md={2} className="d-flex align-items-center">
                                    {ROLE_ARR.map(
                                        (item, idx) =>
                                            user?.role === item.role && (
                                                <p key={idx} className={`m-0 role  ${item.color}`}>
                                                    {user?.role}
                                                </p>
                                            ),
                                    )}
                                </Col>
                                <Col xs={1} className="d-flex align-items-center justify-content-end">
                                    <Tippy
                                        delay={[0, 200]}
                                        placement="bottom-end"
                                        interactive
                                        arrow
                                        render={(attrs) => (
                                            <Stack className="acc-menu content-box p-3" {...attrs}>
                                                <div
                                                    className="acc-menu-option"
                                                    onClick={() => handleShowDeleteUser(user)}
                                                >
                                                    <p className="my-2 mx-3">Xóa</p>
                                                </div>
                                                <div className="acc-menu-option">
                                                    <p className="my-2 mx-3" onClick={() => handleViewDetail(user)}>
                                                        Xem chi tiết
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
                </div>
            </Row>

            <Modal show={showDeleteMember} onHide={() => setShowDeleteMember(false)} className="delete-member">
                <Modal.Body>Xác nhận xóa tài khoản thành viên.</Modal.Body>
                <Modal.Footer>
                    <Buttons onClick={handleCancel} outline small>
                        Cancel
                    </Buttons>
                    <Buttons variant="primary" onClick={handleDeleteUser} primary small>
                        OK
                    </Buttons>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Account;
