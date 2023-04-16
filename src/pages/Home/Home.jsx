import { useEffect, useState } from 'react';
import { Col, Container, Placeholder, Row } from 'react-bootstrap';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BrandApi, ProductApi } from '~/api';
import Images from '~/components/Images';
import ProductsContainer from '~/components/ProductsContainer';
import Slider from '~/layouts/components/Slider';
import './Home.scss';
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
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [brandList, setBrandList] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const resShow = await ProductApi.getProductBanner();
                const resGaming = await ProductApi.getAll(payload(5));
                const resGraphic = await ProductApi.getAll(payload(4));
                const resOffice = await ProductApi.getAll(payload(1));
                const resBrand = await BrandApi.getAll();
                setBrandList(resBrand);
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

    const handleClickBrand = (item) => {
        navigate(`/product?${createSearchParams({ b: `${item.name}%${item.id}` })}`);
    };

    return (
        <Container fluid style={{ backgroundColor: 'var(--background-color)' }}>
            <Row>
                <Slider />
            </Row>
            <Row>
                <Container fluid>
                    <Container>
                        <Row className="brand-arr-header  py-2">
                            <h2 className="m-0">Thương hiệu</h2>
                        </Row>
                        <Row md={4} xs={3} lg={6} className="gap-3 mt-4 justify-content-center">
                            {brandList.length > 0
                                ? brandList?.map((brand, idx) => (
                                      <Col
                                          key={idx}
                                          className="content-box brand-card"
                                          onClick={() => handleClickBrand(brand)}
                                      >
                                          <Images
                                              src={brand?.logo || ''}
                                              alt="brand"
                                              className="brand-card-img"
                                              fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                          />
                                      </Col>
                                  ))
                                : Array.from({ length: 5 }).map((_, idx) => (
                                      <Col key={idx} className="content-box">
                                          <Placeholder animation="glow">
                                              <Placeholder style={{ width: '100%', height: '90px' }} />
                                          </Placeholder>
                                      </Col>
                                  ))}
                        </Row>
                    </Container>
                </Container>
            </Row>
            <Row>
                <ProductsContainer title={BANNER[0]} products={data && data['Newest Product']} isLoading={loading} />
            </Row>
            <Row>
                <ProductsContainer
                    title={BANNER[1]}
                    products={data && data['Best Seller']}
                    isLoading={loading}
                    type="sort"
                />
            </Row>
            <Row>
                <ProductsContainer
                    title={BANNER[2]}
                    products={data && data['Gaming']}
                    isLoading={loading}
                    type="cate"
                    id={5}
                />
            </Row>
            <Row>
                <ProductsContainer
                    title={BANNER[4]}
                    products={data && data['Graphic']}
                    isLoading={loading}
                    type="cate"
                    id={4}
                />
            </Row>
            <Row>
                <ProductsContainer
                    title={BANNER[3]}
                    products={data && data['Office']}
                    isLoading={loading}
                    type="cate"
                    id={1}
                />
            </Row>
        </Container>
    );
}

export default Home;
