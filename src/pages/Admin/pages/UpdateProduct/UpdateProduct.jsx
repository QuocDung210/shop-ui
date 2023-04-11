import './UpdateProduct.scss';
import { faCirclePlus, faCircleXmark, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Row } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
import { BrandApi, ProductApi } from '~/api';
import { seriesApi } from '~/api/seriesApi';
import { categoryApi } from '~/api/categoryApi';
import { FirebaseService } from '~/firebase/firebaseService';
import { toast } from 'react-toastify';
import useAuth from '~/hooks/useAuth';

const PRODUCT_SPECIFICATIONS = [
    'CPU',
    'RAM',
    'Ổ cứng',
    'Card đồ họa ',
    'màng hình',
    'Cỗng giao tiếp',
    'Âm thanh',
    'Bàn phím',
    'Chuẩn LAN',
    'Chuẩn WIFI',
    'Bluetooth',
    'Webcam',
    'Hệ điều hành',
    'Pin',
    'Trọng lượng',
    'Màu sắc',
    'Kích thước',
];

function UpdateProduct() {
    const params = useParams();
    const inputFileRef = useRef(null);
    const inputSpecificationRef = useRef(null);
    const brandRef = useRef(null);
    const categoryRef = useRef(null);
    const seriesRef = useRef(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [specificationInput, setSpecificationInput] = useState('');
    const [specificationsList, setSpecificationsList] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [selected, setSelected] = useState(PRODUCT_SPECIFICATIONS[0]);

    const [images, setImages] = useState([]);
    const [currentImgs, setCurrentImgs] = useState([]);
    const [imgsDel, setImgsDel] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [seriesList, setSeriesList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [categorySelected, setCategorySelected] = useState(0);
    const [brandSelected, setBrandSelected] = useState(0);
    const [seriesSelected, setSeriesSelected] = useState(0);
    const [currentProduct, setCurrentProduct] = useState({});
    const dt = new DataTransfer();
    const auth = useAuth();
    const configHeader = {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
    };

    useEffect(() => {
        const fetch = async () => {
            const resProduct = await ProductApi.getByIdProduct(params.id);
            setCurrentProduct(resProduct);
            const resBrand = await BrandApi.getAll();
            const resSeries = await seriesApi.getAll();
            const resCategory = await categoryApi.getAll();
            setSeriesList(resSeries);
            setCategoryList(resCategory);
            setBrandList(resBrand);
            setName(resProduct.name);
            setPrice(resProduct.price);
            setQuantity(resProduct.available);
            setDiscount(resProduct.discount);
            setDescription(resProduct.description);
            setCurrentImgs(resProduct.images);
            setSeriesSelected(resProduct.seriesId);
            setCategorySelected(resProduct.categoryId);
            setBrandSelected(resProduct.brandId);
            let temp = [];
            for (let i = 0; i < PRODUCT_SPECIFICATIONS.length; i++) {
                temp.push({
                    name: PRODUCT_SPECIFICATIONS[i],
                    value: resProduct.tags[i],
                });
            }
            setSpecificationsList(temp);
            setSelected(temp.length);
        };
        fetch();
    }, [params.id]);

    const handleSetName = (e) => {
        setName(e.target.value);
    };

    //Add-Delete product images
    const handleAddImg = (e) => {
        let intersection = [];
        if (images.length > 0) {
            for (let i = 0; i < [...e.target.files].length; i++) {
                var check = false;
                for (let j = 0; j < images.length; j++) {
                    if ([...e.target.files][i].name === images[j].name) {
                        check = true;
                    }
                }
                if (!check) {
                    intersection.push([...e.target.files][i]);
                }
            }
        }
        if (images.length > 0) {
            setImages([...images, ...intersection]);
            // setData({ ...data, images: [...images, ...intersection] });
        } else {
            setImages([...e.target.files]);
            // setData({ ...data, images: [...e.target.files] });
        }
    };
    const handleDeleteImg = (idx) => {
        for (let image of images) {
            dt.items.add(image);
        }
        for (let i = 0; i < dt.items.length; i++) {
            if (images[idx].name === dt.items[i].getAsFile().name) {
                dt.items.remove(i);
                continue;
            }
        }
        inputFileRef.current.files = dt.files;
        setImages([...dt.files]);
    };

    const handleSetSpecification = (e) => {
        setSpecificationInput(e.target.value);
    };

    const handleAddSpecification = () => {
        for (let item of specificationsList) {
            if (item.name === selected) {
                return;
            }
        }
        setSpecificationsList([
            ...specificationsList,
            { name: selected, value: specificationInput || 'Đang cập nhật' },
        ]);
        setSpecificationInput('');
        if (selected < PRODUCT_SPECIFICATIONS.length) {
            setSelected(selected + 1);
        }
        inputSpecificationRef.current.focus();
    };

    const handleEnter = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            handleAddSpecification();
        }
    };

    const handleSetQuantity = (e) => {
        let quantity = e.target.value;

        if (quantity < 0) {
            setQuantity(0);
        } else {
            setQuantity(e.target.value);
        }
    };

    const handleSetPrice = (e) => {
        let pr = e.target.value;

        if (pr < 0) {
            setPrice(0);
        } else {
            setPrice(e.target.value);
        }
    };

    const handleSetDiscount = (e) => {
        let dc = e.target.value;

        if (dc < 0 || dc > 100) {
            setDiscount(0);
        } else {
            setDiscount(e.target.value);
        }
    };

    const handleDeleteSpecification = (specification, idx) => {
        setSpecificationsList(
            specificationsList.filter((value, idx, arr) => {
                return value.name !== specification.name;
            }),
        );
        setSelected(idx);
    };

    const handleDeleteCurrentImg = (img) => {
        setCurrentImgs(currentImgs.filter((item) => item !== img));
        setImgsDel([...imgsDel, img]);
    };

    const handleSelectCategory = (e) => {
        setCategorySelected(e.target.value);
    };
    const handleSelectSeries = (e) => {
        setSeriesSelected(e.target.value);
    };
    const handleSelectBrand = (e) => {
        setBrandSelected(e.target.value);
    };
    const handleUpdate = async () => {
        try {
            let newImgs = [];
            if (images?.length > 0) {
                const urls = await FirebaseService.uploadImg(images, 'ProductImgs');
                newImgs = [...urls, ...currentImgs];
            }
            let spList = [];
            for (let key in specificationsList) {
                spList.push(specificationsList[key].value);
            }
            if (imgsDel?.length > 0) {
                for (let img of imgsDel) {
                    await FirebaseService.deleteImg(img);
                }
            }
            console.log('check mang: ', [...newImgs, ...currentImgs]);
            const data = {
                id: currentProduct.id,
                name: name || 'Chưa cập nhật tên',
                brandId: brandSelected,
                categoryId: categorySelected,
                seriesId: seriesSelected,
                price: price || 0,
                discount: discount || 0,
                description: description,
                tags: spList,
                images: newImgs,
                available: quantity || 0,
            };

            await ProductApi.updateProduct(data, configHeader);
            toast.success('Cập nhật thành công.');
            setImgsDel([]);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container fluid className="add-product-container">
            <Row className="mb-4">
                <h2>Cập nhật sản phẩm</h2>
            </Row>

            <Row className="g-4">
                <Col md={8} xs={12}>
                    <Container fluid>
                        <Row className="mb-4">
                            <div className="px-4 pd-name content-box ">
                                <h3>Tên sản phẩm</h3>
                                <input
                                    type={'text'}
                                    spellCheck="false"
                                    className="pd-name-input"
                                    value={name}
                                    onChange={handleSetName}
                                />
                            </div>
                        </Row>
                        <Row className="mb-4">
                            <div className="px-4 pd-description content-box ">
                                <h3>Mô tả sản phẩm</h3>
                                <div>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={description}
                                        onReady={(editor) => {
                                            // You can store the "editor" and use when it is needed.
                                            // console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data);
                                        }}
                                        onBlur={(event, editor) => {
                                            // console.log('Blur.', editor);
                                        }}
                                        onFocus={(event, editor) => {
                                            // console.log('Focus.', editor);
                                        }}
                                    />
                                </div>
                            </div>
                        </Row>
                        <Row className="mb-4">
                            <div className="px-4 pd-img content-box ">
                                <h3>Ảnh sản phẩm</h3>
                                <div className="my-4">
                                    <h4>{`Ảnh hiện có:  ${currentImgs.length}`}</h4>
                                    <div className="pd-img-list d-flex">
                                        {currentImgs !== [] &&
                                            currentImgs.map((img, idx) => {
                                                return (
                                                    <div key={idx} className="item-img me-4">
                                                        <FontAwesomeIcon
                                                            className="item-img-delete"
                                                            icon={faCircleXmark}
                                                            onClick={() => handleDeleteCurrentImg(img)}
                                                        />
                                                        <img src={`${img}`} alt="img" />
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                                <div className="file-input-container mb-4">
                                    <input
                                        ref={inputFileRef}
                                        type={'file'}
                                        id="file-input"
                                        accept="image/*"
                                        multiple={true}
                                        className="pd-img-input"
                                        onChange={handleAddImg}
                                    />
                                    <label htmlFor="file-input" className="file-label">
                                        <FontAwesomeIcon icon={faUpload} className="file-label-icon" />
                                        <p>Nhấp vào đây để chọn ảnh</p>
                                    </label>
                                </div>
                                <div className="pd-img-list d-flex">
                                    {images &&
                                        images.map((img, idx) => (
                                            <div key={idx} className="item-img me-4">
                                                <FontAwesomeIcon
                                                    className="item-img-delete"
                                                    icon={faCircleXmark}
                                                    onClick={() => handleDeleteImg(idx)}
                                                />
                                                <img src={`${URL.createObjectURL(img)}`} alt="img" />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="content-box px-4">
                                <h3>Thông số kỹ thuật</h3>
                                <div className="d-flex">
                                    <div className="pd-specifications-option">
                                        <Dropdown className="specifications-dropdown-wrapper" as={ButtonGroup}>
                                            <Button className="specifications-btn-dropdown" variant="success">
                                                {PRODUCT_SPECIFICATIONS[selected]}
                                            </Button>

                                            <Dropdown.Toggle
                                                className="specifications-toggle"
                                                split
                                                variant="success"
                                                id="dropdown-split-basic"
                                            />

                                            <Dropdown.Menu className="specifications-menu">
                                                {PRODUCT_SPECIFICATIONS.map((item, idx) => (
                                                    <Dropdown.Item key={idx} onClick={() => setSelected(idx)}>
                                                        {item}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="pd-specifications-input mb-4">
                                        <input
                                            disabled={specificationsList.length === PRODUCT_SPECIFICATIONS.length}
                                            ref={inputSpecificationRef}
                                            type={'text'}
                                            spellCheck="false"
                                            value={specificationInput}
                                            onChange={handleSetSpecification}
                                            onKeyDown={handleEnter}
                                        />
                                        <div className="pd-specifications-input-icon">
                                            <FontAwesomeIcon icon={faCirclePlus} onClick={handleAddSpecification} />
                                        </div>
                                    </div>
                                </div>
                                <div className="pd-specifications-list">
                                    {specificationsList.map((specification, idx) => (
                                        <div key={idx} className="pd-specifications-item me-3 mb-3">
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                                className="pd-specification-delete-icon"
                                                onClick={() => handleDeleteSpecification(specification, idx)}
                                            />
                                            <p className="mb-0 ms-3">{specification.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Row>
                    </Container>
                </Col>
                <Col md={4} sx={12}>
                    <Container fluid>
                        <Row className="content-box mb-4">
                            <div className="pd-quantity mb-4">
                                <h3>Số lượng</h3>
                                <input type={'number'} min={0} value={quantity} onChange={handleSetQuantity} />
                            </div>
                            <div className="pd-brand mb-4">
                                <h3>Thương hiệu</h3>
                                <select
                                    ref={brandRef}
                                    name="brand"
                                    id="brand"
                                    required
                                    value={brandSelected}
                                    onChange={handleSelectBrand}
                                >
                                    <option hidden value={''}>
                                        --Chọn thương hiệu--
                                    </option>
                                    {brandList?.map((item, idx) => (
                                        <option key={idx} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="pd-category mb-4">
                                <h3>Danh mục</h3>
                                <select
                                    ref={categoryRef}
                                    name="category"
                                    id="category"
                                    value={categorySelected}
                                    onChange={handleSelectCategory}
                                >
                                    <option value={''} hidden>
                                        --Chọn danh mục--
                                    </option>
                                    {categoryList?.map((item, idx) => (
                                        <option key={idx} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="pd-series mb-4">
                                <h3>Series</h3>
                                <select
                                    ref={seriesRef}
                                    name="series"
                                    id="series"
                                    value={seriesSelected}
                                    onChange={handleSelectSeries}
                                >
                                    <option value={''} hidden>
                                        --Chọn Series--
                                    </option>
                                    {seriesList?.map((item, idx) => (
                                        <option key={idx} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Row>
                        <Row className="content-box mb-4">
                            <div className="pd-regular-price mb-4">
                                <h3>Giá</h3>
                                <input type={'number'} min={0} value={price} onChange={handleSetPrice} />
                            </div>
                            <div className="pd-discout mb-4">
                                <h3>Khuyến mãi</h3>
                                <input
                                    type={'number'}
                                    min={0}
                                    max={100}
                                    value={discount}
                                    onChange={handleSetDiscount}
                                />
                            </div>
                        </Row>
                        <Row className="content-box">
                            <Buttons primary onClick={handleUpdate}>
                                Tạo
                            </Buttons>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default UpdateProduct;
