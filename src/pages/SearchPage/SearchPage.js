import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductsContainer from '~/components/ProductsContainer';
function SearchPage() {
    const params = useParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const allProducts = async () => {
            try {
                const res = await axios.get(
                    `https://tiktok.fullstack.edu.vn/api/users/search?q=${params.name}&type=more`,
                );
                setProducts(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        allProducts();
    }, [params]);
    return (
        <Container fluid className="search-result-container">
            <Row className="search-result-title">
                <h1>KẾT QUẢ TÌM KIẾM CHO : "{params.name}"</h1>
            </Row>
            <Row className="search-result-products">
                <ProductsContainer products={products} />
            </Row>
        </Container>
    );
}

export default SearchPage;
