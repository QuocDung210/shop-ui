import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '~/layouts/components/ProductCard';
import './ProductsContainer.scss';

function ProductsContainer() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const allProducts = async () => {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/photos');
                setProducts(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        const searchProduct = async () => {
            try {
                const res = await axios.get(`https://tiktok.fullstack.edu.vn/api/users/search?q=${query}&type=more`);
                setProducts(res.data.data);
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
        <Container fluid className="products-container">
            <Row>
                <h3>Kết quả tìm kiếm cho: {query}</h3>
            </Row>
            <Row className="products-nav">
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
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
                            <Form className="d-flex">
                                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
            {products !== [] ? (
                <Row className="products-list">
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
                    <h2>Không có kết quả phù hợp</h2>
                </Row>
            )}
        </Container>
    );
}

export default ProductsContainer;
