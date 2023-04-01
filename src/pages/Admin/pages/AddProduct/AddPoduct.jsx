import { faCirclePlus, faCircleXmark, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, Row } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './AddProduct.scss';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '~/firebase/configFirebase';
import { FirebaseService } from '~/firebase/firebaseService';
const PRODUCT_SPECIFICATIONS = [
    'CPU',
    'RAM',
    'Ổ cứng',
    'Card đồ họa ',
    'Màng hình',
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

function AddProduct() {
    const inputFileRef = useRef(null);
    const inputSpecificationRef = useRef(null);
    const brandRef = useRef(null);
    const categoryRef = useRef(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [specificationInput, setSpecificationInput] = useState('');
    const [specificationsList, setSpecificationsList] = useState([]);
    const [images, setImages] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [selected, setSelected] = useState(0);
    const dt = new DataTransfer();
    //Set name
    const handleSetName = (e) => {
        setName(e.target.value);
    };

    //Add-Delete product images
    const handleAddImg = (e) => {
        let intersection = [];
        if (images) {
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
        if (images) {
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
        // setData({ ...data, images: [...dt.files] });
    };

    //Set-delete Specification
    const handleSetSpecification = (e) => {
        setSpecificationInput(e.target.value);
    };

    const handleAddSpecification = () => {
        for (let item of specificationsList) {
            if (item.name === PRODUCT_SPECIFICATIONS[selected]) {
                return;
            }
        }
        setSpecificationsList([
            ...specificationsList,
            { name: PRODUCT_SPECIFICATIONS[selected], value: specificationInput || 'Đang cập nhật' },
        ]);

        setSpecificationInput('');
        if (selected < PRODUCT_SPECIFICATIONS.length) {
            setSelected(selected + 1);
        }
        inputSpecificationRef.current.focus();
    };

    const handleDeleteSpecification = (specification) => {
        setSpecificationsList(
            specificationsList.filter((value, idx, arr) => {
                return value.name !== specification.name;
            }),
        );
    };

    const handleEnter = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            handleAddSpecification();
        }
    };

    //Set quantity
    const handleSetQuantity = (e) => {
        let quantity = e.target.value;

        if (quantity < 0) {
            setQuantity(0);
        } else {
            setQuantity(e.target.value);
        }
    };

    //Set price
    const handleSetPrice = (e) => {
        let pr = e.target.value;

        if (pr < 0) {
            setPrice(0);
        } else {
            setPrice(e.target.value);
        }
    };

    //Set discount
    const handleSetDiscount = (e) => {
        let dc = e.target.value;

        if (dc < 0 || dc > 100) {
            setDiscount(0);
        } else {
            setDiscount(e.target.value);
        }
    };

    //Create product
    const handleCreate = async () => {
        const urls = await FirebaseService.uploadImg(images);

        const data = {
            name: name,
            description: description,
            specificationsList: specificationsList,
            quantity: quantity,
            price: price,
            discount: discount,
            productImages: urls,
        };
        try {
            await setDoc(doc(db, 'a', name), data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container fluid className="add-product-container">
            <Row className="mb-4">
                <h2>Thêm sản phẩm</h2>
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
                                            disabled={selected >= PRODUCT_SPECIFICATIONS.length}
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
                                                onClick={() => handleDeleteSpecification(specification)}
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
                                <select ref={brandRef} name="brand" id="brand" required defaultValue={''}>
                                    <option hidden value={''}>
                                        --Chọn thương hiệu--
                                    </option>
                                    <option value={'Asus'}>hahahah</option>
                                    <option value={'MSI'}>hahahah</option>
                                    <option value={'Lenovo'}>hahahah</option>
                                    <option value={'Mac'}>hahahah</option>
                                </select>
                            </div>
                            <div className="pd-category mb-4">
                                <h3>Danh mục</h3>
                                <select ref={categoryRef} name="category" id="category" defaultValue={''}>
                                    <option value={''} hidden>
                                        --Chọn danh mục--
                                    </option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
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
                            <Buttons primary onClick={handleCreate}>
                                Tạo
                            </Buttons>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default AddProduct;

// () => {
//     // console.log('name : ', name);
//     console.log('inages', images);
//     // console.log('description: ', test);
//     console.log(discount);
//     console.log(brandRef.current.value);
//     console.log(specificationInput);
//     console.log(specificationsList);
//     // editorTestFeild.current.innerHTML = test;
// }
