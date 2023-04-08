import {
    faChevronLeft,
    faChevronRight,
    faEllipsisV,
    faMinus,
    faPlus,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Modal, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Buttons from '~/components/Buttons';
import Images from '~/components/Images';
import './AdminProducts.scss';
import { BrandApi, ProductApi } from '~/api';
import { toast } from 'react-toastify';
import { FirebaseService } from '~/firebase/firebaseService';
import { splitNumber } from '~/numberSplit';

function AdminProducts() {
    const [showDeleteMember, setShowDeleteMember] = useState(false);
    const [showDeleteMembers, setShowDeleteMembers] = useState(false);
    const [productList, setProductList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [deleteTarget, setDeleteTarget] = useState({});
    const [deleteMultiTarget, setDeleteMultiTarget] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [type, setType] = useState({});
    const [render, setRender] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const res = await ProductApi.getAll({
                query: '',
                pageIndex: currentPage,
                pageSize: 5,
                totalRow: 0,
                sort: 0,
                products: [],
                brandId: 0,
                categoryId: 0,
                seriesId: 0,
                minPrice: 0,
                maxPrice: 0,
            });
            const resCate = await BrandApi.getAll();
            setDataBrand(resCate);
            setProductList(res.products);
            setTotalPage(res.totalRow);
        };
        fetch();
    }, [currentPage, render]);
    const handleNext = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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
            setDeleteMultiTarget(productList);
            checkboxItem.forEach((item) => {
                item.checked = true;
            });
        } else if (e.target.checked === false) {
            setIsChecked(false);
            setDeleteMultiTarget([]);
            checkboxItem.forEach((item) => {
                item.checked = false;
            });
        }
    };

    const handleCloseDeleteProduct = () => setShowDeleteMember(false);
    const handleShowDeleteProduct = (item) => {
        setShowDeleteMember(true);
        setDeleteTarget(item);
    };
    const handleDeleteProduct = async () => {
        try {
            if (deleteTarget.images[0] !== '') {
                for (let img of deleteTarget.images) {
                    await FirebaseService.deleteImg(img);
                }
            }
            await ProductApi.deleteProduct(deleteTarget.id);
            setRender(!render);
            toast.success('Xóa thành công.');
        } catch (err) {
            toast.error(err);
        }
        setShowDeleteMember(false);
        setDeleteTarget({});
    };

    const handleCloseDeleteProducts = () => setShowDeleteMembers(false);
    const handleShowDeleteProducts = () => {
        setShowDeleteMembers(true);
    };
    const handleDeleteProducts = async () => {
        try {
            toast.warning('Đang xử lý, xin bạn hãy chờ.');
            for (let product of deleteMultiTarget) {
                if (product.images[0] !== '') {
                    for (let img of product.images) {
                        await FirebaseService.deleteImg(img);
                    }
                }
                await ProductApi.deleteProduct(product.id);
            }
            const checked = document.querySelectorAll('input[name="productIds"]:checked');

            checked.forEach((item) => {
                item.checked = false;
            });
            setIsChecked(false);
            setDeleteMultiTarget([]);
            setRender(!render);
            toast.success('Xóa thành công.');
        } catch (err) {
            toast.error('Xóa không thành công.');
        }
        setShowDeleteMembers(false);
    };
    const renderDeleteBtn = (e, item) => {
        const checked = document.querySelectorAll('input[name="productIds"]:checked');

        if (checked.length > 0) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
        if (e.target.checked === true) {
            setDeleteMultiTarget([...deleteMultiTarget, item]);
        } else {
            setDeleteMultiTarget(deleteMultiTarget.filter((pd) => pd.id !== item.id));
        }
    };
    const handleFilterBrand = (item) => {
        console.log(item);
    };
    return (
        <Container fluid className="acc-wrapper">
            <Row className="mb-4">
                <h2>Danh sách sản phẩm</h2>
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
                        onClick={handleShowDeleteProducts}
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
                            {type?.name || 'All'}
                        </Button>

                        <Dropdown.Toggle
                            className="propdown-filter-product"
                            split
                            variant="success"
                            id="dropdown-split-basic"
                        />

                        <Dropdown.Menu className="menu-filter-product">
                            <Dropdown.Item key={0} onClick={() => setType(0)}>
                                All
                            </Dropdown.Item>
                            {dataBrand.map((item, idx) => (
                                <Dropdown.Item key={idx} onClick={() => handleFilterBrand(item)}>
                                    {item?.name}
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
                    <Col xs={2}>Bán được</Col>
                    <Col xs={2}>Trạng thái</Col>
                    <Col xs={2}>{'Giá (đồng)'}</Col>
                    <Col xs={1}></Col>
                </Row>
                <hr />
                {productList?.map((item, idx) => (
                    <Row key={idx} className="py-3 acc-list-item">
                        <Col xs={5}>
                            <div className="d-flex align-items-center gap-3">
                                <input
                                    type={'checkbox'}
                                    size={60}
                                    className="acc-checkbox checkbox-item"
                                    value={item?.id}
                                    name="productIds"
                                    onChange={(e) => renderDeleteBtn(e, item)}
                                />
                                <Images
                                    src={item.images[0]}
                                    alt="user"
                                    className="current-user"
                                    fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                    style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                                />
                                <span className="pd-item-name ms-3">{item?.name}</span>
                            </div>
                        </Col>
                        <Col xs={2} className="d-flex align-items-center">
                            {item?.sold}
                        </Col>
                        <Col xs={2} className="d-flex align-items-center">
                            {item?.available > 0 ? <p className="m-0">Còn hàng</p> : <p className="m-0">Hết hàng</p>}
                        </Col>
                        <Col xs={2} className="d-flex align-items-center">
                            {splitNumber(item?.price)}
                        </Col>
                        <Col xs={1} className="d-flex align-items-center justify-content-end">
                            <Tippy
                                trigger="click"
                                delay={[0, 300]}
                                placement="bottom-end"
                                interactive
                                arrow
                                render={(attrs) => (
                                    <Stack className="acc-menu content-box p-3" {...attrs}>
                                        <div className="acc-menu-option">
                                            <Link to={`/admin/update-product/${item.id}`}>
                                                <p className="my-2 mx-3">Cập nhật</p>
                                            </Link>
                                        </div>
                                        <div className="acc-menu-option">
                                            <p className="my-2 mx-3" onClick={() => handleShowDeleteProduct(item)}>
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
                        <p className="mb-0 me-5">{`${currentPage}/${totalPage} trang`}</p>
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

            <Modal show={showDeleteMember} onHide={handleCloseDeleteProduct} className="delete-member">
                <Modal.Body>Xác nhận xóa sản phẩm!</Modal.Body>
                <Modal.Footer>
                    <Buttons onClick={handleCloseDeleteProduct} outline small>
                        Cancel
                    </Buttons>
                    <Buttons onClick={handleDeleteProduct} primary small>
                        OK
                    </Buttons>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteMembers} onHide={handleCloseDeleteProducts} className="delete-members">
                <Modal.Body>Xác nhận xóa danh sách sản phẩm đã chọn!</Modal.Body>
                <Modal.Footer>
                    <Buttons onClick={handleCloseDeleteProducts} outline small>
                        Cancel
                    </Buttons>
                    <Buttons onClick={handleDeleteProducts} primary small>
                        OK
                    </Buttons>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default AdminProducts;
