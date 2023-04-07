import { faChevronLeft, faChevronRight, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Offcanvas, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { ProductApi } from '~/api';
import ProductCard from '~/layouts/components/ProductCard';
import Sidebar from '~/layouts/components/Sidebar/Sidebar';

import './Store.scss';
function Store() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q');
    const cate = searchParams.get('c')?.split('%');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState({ max: 0, min: 0 });
    const [categorySelected, setCategorySelected] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const allProducts = async () => {
            try {
                setIsLoading(true);

                const res = await ProductApi.getAll({
                    query: query || '',
                    pageIndex: currentPage,
                    pageSize: 12,
                    totalRow: 0,
                    sort: 0,
                    products: [],
                    brandId: 0,
                    categoryId: cate ? cate[1] : categorySelected,
                    seriesId: 0,
                    minPrice: priceRange.min,
                    maxPrice: priceRange.max,
                });
                setTotalPage(res.totalRow);
                setProducts(res.products);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        allProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, currentPage, priceRange, categorySelected]);

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

    const handlePriceFilter = (data) => {
        setPriceRange(data);
    };

    const handleFilter = (id) => {
        setCurrentPage(1);
        setCategorySelected(id);
        setSearchParams('');
    };
    const handleClose = () => {
        setShow(!show);
    };
    const handleShow = () => setShow(!show);
    return (
        <Container fluid className="store-wrapper">
            <div className="icon-filter-wrapper d-flex d-lg-none" onClick={handleShow}>
                <FontAwesomeIcon className="icon-filter" icon={faFilter} />
            </div>
            <Container>
                <Row>
                    <Col md={3} className="d-none d-lg-block">
                        <Sidebar priceFilter={handlePriceFilter} categoryFilter={handleFilter} />
                    </Col>
                    <Col xs={12} lg={9}>
                        <Container fluid className="shop-container d-flex flex-column gap-2 mb-4">
                            {query && (
                                <Row className="shop-header content-box">
                                    <h3 className="mt-2 mb-2">{`Kết quả tìm kiếm cho : "${query}"`}</h3>
                                </Row>
                            )}
                            <Row className="shop-products">
                                <Container fluid className="products-container content-box">
                                    <Row className="products-nav">
                                        <Navbar bg="light" expand="lg">
                                            <Container fluid>
                                                <Navbar.Brand href="#">Lọc sản phẩm</Navbar.Brand>
                                                <Navbar.Toggle aria-controls="navbarScroll" />
                                                <Navbar.Collapse id="navbarScroll">
                                                    <Nav
                                                        className="me-auto my-2 my-lg-0"
                                                        style={{ maxHeight: '100px' }}
                                                        navbarScroll
                                                    >
                                                        <Nav.Link href="#action1">Home</Nav.Link>
                                                        <Nav.Link href="#action2">Link</Nav.Link>
                                                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                                                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                                            <NavDropdown.Item href="#action4">
                                                                Another action
                                                            </NavDropdown.Item>
                                                            <NavDropdown.Divider />
                                                            <NavDropdown.Item href="#action5">
                                                                Something else here
                                                            </NavDropdown.Item>
                                                        </NavDropdown>
                                                        <Nav.Link href="#" disabled>
                                                            Link
                                                        </Nav.Link>
                                                    </Nav>
                                                </Navbar.Collapse>
                                            </Container>
                                        </Navbar>
                                    </Row>
                                    {!isLoading ? (
                                        <Row className="products-list m-1">
                                            <Container fluid className="p-0">
                                                <Row xs={2} sm={3} md={4} className="g-4">
                                                    {products.map((product, index) => {
                                                        return (
                                                            index <= 11 && (
                                                                <Col key={index}>
                                                                    <ProductCard product={product} />
                                                                </Col>
                                                            )
                                                        );
                                                    })}
                                                </Row>
                                            </Container>
                                        </Row>
                                    ) : (
                                        <Row>
                                            <Container fluid className="p-0">
                                                <Row xs={2} sm={3} md={4} className="g-4">
                                                    {Array.from({ length: 8 }).map((_, index) => {
                                                        return (
                                                            <Col key={index}>
                                                                <ProductCard.Loading />
                                                            </Col>
                                                        );
                                                    })}
                                                </Row>
                                            </Container>
                                        </Row>
                                    )}
                                </Container>
                            </Row>
                            <Row className="content-box">
                                <div className="page-pagination d-flex justify-content-end ">
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
                        </Container>
                    </Col>
                </Row>
            </Container>
            <div>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Body style={{ maxWidth: '400px' }}>
                        <Sidebar priceFilter={handlePriceFilter} categoryFilter={handleFilter} setClose={handleClose} />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </Container>
    );
}

export default Store;
