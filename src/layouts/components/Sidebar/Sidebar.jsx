import { Collapse, Container, Nav, Row, Stack } from 'react-bootstrap';
import './Sidebar.scss';
import { useEffect, useState } from 'react';
import { categoryApi } from '~/api/categoryApi';
import { toast } from 'react-toastify';
import Buttons from '~/components/Buttons';
import { BrandApi } from '~/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function Sidebar(props) {
    const { priceFilter, categoryFilter, setClose, brandFilter, currentSelected } = props;
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [data, setData] = useState({ max: 0, min: 0 });
    const [brands, setBrands] = useState([]);
    const [selectedCate, setSelectedCate] = useState(currentSelected || 0);
    const [selectedBrand, setSelectedBrand] = useState(0);
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await categoryApi.getAll();
                const resBrand = await BrandApi.getAll();

                setBrands(resBrand);
                setCategory(res);
            } catch (err) {
                toast.error(err);
            }
        };
        fetch();
    }, []);

    const handleSetPriceRange = (e) => {
        if (e.target.id === 'max-price-ip') {
            if (e.target.value === '') {
                setData({ ...data, max: 0 });
            } else {
                setData({ ...data, max: e.target.value });
            }
        } else {
            if (e.target.value === '') {
                setData({ ...data, min: 0 });
            } else {
                setData({ ...data, min: e.target.value });
            }
        }
        if (setClose) {
            setClose();
        }
    };

    const handleFilter = () => {
        if (data.max > 0) {
            if (data.max <= data.min) {
                toast.warning('Lọc theo giá tiền không hợp lệ.');
                return;
            } else {
                priceFilter(data);
            }
        } else {
            priceFilter(data);
        }
        if (setClose) {
            setClose();
        }
    };
    return (
        <aside className="sidebar-wrapper">
            <Container fluid className="content-box">
                <Row className="justify-content-center align-items-center">
                    <p className="sidebar-title text-center mb-4">DANH MỤC</p>
                </Row>
                <Row>
                    <Nav as="ul" className=" header-offcanvas-nav">
                        <Nav.Item
                            as="li"
                            className="d-flex m-0 nav-item"
                            onClick={() => {
                                categoryFilter(0);
                                if (setClose) {
                                    setClose();
                                }
                                setSelectedCate(0);
                            }}
                        >
                            <p className={`m-0 w-100 ${selectedCate === 0 && 'nav-selected'}`}>Tất cả</p>
                        </Nav.Item>
                        <Nav.Item as="li" className={`d-flex flex-column m-0 nav-item `}>
                            <div className="nav-item-title d-flex align-items-center">
                                <p
                                    className={`m-0 w-100`}
                                    onClick={() => {
                                        setOpen(!open);
                                    }}
                                >
                                    Thương Hiệu
                                </p>
                                <FontAwesomeIcon className={`${open && 'nav-item-arrow '}`} icon={faChevronUp} />
                            </div>
                            <Collapse in={open}>
                                <div className="category-brand-collapse">
                                    <div
                                        onClick={() => {
                                            setSelectedBrand(0);

                                            brandFilter(0);
                                            if (setClose) {
                                                setClose();
                                            }
                                        }}
                                    >
                                        <p className={`m-0 w-100 ${selectedBrand === 0 && 'nav-selected'}`}>None</p>
                                    </div>
                                    {brands.length > 0 &&
                                        brands.map((brand, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedBrand(brand?.id);
                                                    brandFilter(brand?.id);
                                                    if (setClose) {
                                                        setClose();
                                                    }
                                                }}
                                            >
                                                <p
                                                    className={`m-0 w-100 ${
                                                        selectedBrand === brand?.id && 'nav-selected'
                                                    }`}
                                                >
                                                    {brand.name}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </Collapse>
                        </Nav.Item>
                        {category?.map((sidebarItem, idx) => (
                            <Nav.Item
                                as="li"
                                className={`d-flex m-0 nav-item `}
                                key={idx}
                                onClick={() => {
                                    if (setClose) {
                                        setClose();
                                    }
                                    setSelectedCate(sidebarItem?.id);
                                    categoryFilter(sidebarItem.id);
                                }}
                            >
                                <p
                                    className={`m-0 ${
                                        currentSelected
                                            ? parseInt(currentSelected) === sidebarItem?.id && 'nav-selected'
                                            : selectedCate === sidebarItem?.id && 'nav-selected'
                                    }`}
                                >
                                    {sidebarItem?.name}
                                </p>
                            </Nav.Item>
                        ))}
                    </Nav>
                </Row>
                <Row>
                    <Stack className="price-range-slider" gap={3}>
                        <div className="max-price">
                            <p>MAX</p>
                            <div>
                                <input id="max-price-ip" type="number" onChange={handleSetPriceRange} />
                            </div>
                        </div>
                        <div className="min-price">
                            <p>MIN</p>
                            <div>
                                <input id="min-price-ip" type="number" onChange={handleSetPriceRange} />
                            </div>
                        </div>
                        <Buttons primary onClick={handleFilter}>
                            Lọc
                        </Buttons>
                    </Stack>
                </Row>
            </Container>
        </aside>
    );
}

export default Sidebar;
