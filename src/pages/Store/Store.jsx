import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Pagination from '~/components/Pagination';
import ProductCard from '~/layouts/components/ProductCard';
function Store() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const allProducts = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get('https://jsonplaceholder.typicode.com/photos');
                setProducts(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        const searchProduct = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`https://tiktok.fullstack.edu.vn/api/users/search?q=${query}&type=more`);
                setProducts(res.data.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        if (query) {
            searchProduct();
        } else {
            allProducts();
        }
    }, [query]);

    return (
        <Container fluid className="shop__container d-flex flex-column gap-2 mb-4">
            {query && (
                <Row
                    className="shop-header"
                    style={{ backgroundColor: '#ffffff', boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                >
                    <h3 className="mt-2 mb-2">{`Kết quả tìm kiếm cho : "${query}"`}</h3>
                </Row>
            )}
            <Row className="shop-products">
                <Container
                    fluid
                    className="products-container"
                    style={{ backgroundColor: '#ffffff', boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                >
                    <Row className="products-nav">
                        <Navbar bg="light" expand="lg">
                            <Container fluid>
                                <Navbar.Brand href="#">Lọc sản phẩm</Navbar.Brand>
                                <Navbar.Toggle aria-controls="navbarScroll" />
                                <Navbar.Collapse id="navbarScroll">
                                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                        <Nav.Link href="#action1">Home</Nav.Link>
                                        <Nav.Link href="#action2">Link</Nav.Link>
                                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
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
                                    {Array.from({ length: 12 }).map((_, index) => {
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
            <Row>
                <Pagination />
            </Row>
        </Container>
    );
}

export default Store;
