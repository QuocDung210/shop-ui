import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ProductApi } from '~/api';
import ProductsContainer from '~/components/ProductsContainer';
import Slider from '~/layouts/components/Slider';

const BANNER = ['Mới nhất', 'Bán chạy nhất', 'Gaming', 'Văn phòng', 'Đồ họa'];

const payload = (cate) => {
    return {
        query: '',
        pageIndex: 1,
        pageSize: 8,
        totalRow: 0,
        sort: 0,
        products: [],
        brandId: 0,
        categoryId: cate,
        seriesId: 0,
        minPrice: 0,
        maxPrice: 0,
    };
};

function Home() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const resShow = await ProductApi.getProductBanner();
                const resGaming = await ProductApi.getAll(payload(5));
                const resGraphic = await ProductApi.getAll(payload(4));
                const resOffice = await ProductApi.getAll(payload(3));

                setData({
                    ...resShow,
                    Gaming: resGaming.products,
                    Graphic: resGraphic.products,
                    Office: resOffice.products,
                });
                setLoading(false);
            } catch (err) {
                toast.error('Có lỗi xảy ra.');
            }
        };

        fetchApi();
    }, []);
    return (
        <Container fluid style={{ backgroundColor: 'var(--background-color)' }}>
            <Row>
                <Slider />
            </Row>
            <Row>
                <ProductsContainer title={BANNER[0]} products={data && data['Newest Product']} isLoading={loading} />
            </Row>
            <Row>
                <ProductsContainer title={BANNER[1]} products={data && data['Best Seller']} isLoading={loading} />
            </Row>
            <Row>
                <ProductsContainer title={BANNER[2]} products={data && data['Gaming']} isLoading={loading} />
            </Row>
            <Row>
                <ProductsContainer title={BANNER[4]} products={data && data['Graphic']} isLoading={loading} />
            </Row>
            <Row>
                <ProductsContainer title={BANNER[3]} products={data && data['Office']} isLoading={loading} />
            </Row>
        </Container>
    );
}

export default Home;
