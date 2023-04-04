import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductsContainer from '~/components/ProductsContainer';
import Slider from '~/layouts/components/Slider';
import * as searchService from '~/services/searchService';

const BANNER = ['Mới nhất', 'Bán chạy nhất', 'Gaming', 'Văn phòng', 'Đồ họa'];

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const newProducts = await searchService.search('linh');
            const bestSeller = await searchService.search('hoa');
            const gaming = await searchService.search('hai');
            const office = await searchService.search('ly');
            const graphic = await searchService.search('minh');
            setData([newProducts, bestSeller, gaming, office, graphic]);
            setLoading(false);
        };

        fetchApi();
    }, []);
    return (
        <Container fluid style={{ backgroundColor: 'var(--background-color)' }}>
            <Row>
                <Slider />
            </Row>

            {!loading
                ? data.map((item, idx) => (
                      <Row key={idx}>
                          <ProductsContainer title={BANNER[idx]} products={item} isLoading={loading} />
                      </Row>
                  ))
                : BANNER.map((item, idx) => (
                      <Row key={idx}>
                          <ProductsContainer title={item} isLoading={loading} />
                      </Row>
                  ))}
        </Container>
    );
}

export default Home;
