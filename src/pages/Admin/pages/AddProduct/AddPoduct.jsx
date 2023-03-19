import { faCircleXmark, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Buttons from '~/components/Buttons';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './AddProduct.scss';
function AddProduct() {
    const inputFileRef = useRef(null);
    const editorTestFeild = useRef(null);
    const [name, setName] = useState('');
    const [test, setTest] = useState('');
    const [images, setImages] = useState(null);
    const [discount, setDiscount] = useState(0);
    const dt = new DataTransfer();

    const handleSetName = (e) => {
        setName(e.target.value);
    };

    //Add-Delete product images
    const handleAddImg = (e) => {
        setImages([...e.target.files]);
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

    const handleSetDiscount = (e) => {
        let dc = e.target.value;

        if (dc < 0 || dc > 100) {
            setDiscount(0);
        } else {
            setDiscount(e.target.value);
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
                                        data={test}
                                        onReady={(editor) => {
                                            // You can store the "editor" and use when it is needed.
                                            // console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setTest(data);
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
                            <div className="pd-specifications content-box">
                                <h3>Thông số kỹ thuật</h3>
                            </div>
                        </Row>
                    </Container>
                </Col>
                <Col md={4} sx={12}>
                    <Container fluid>
                        <Row className="content-box mb-4">
                            <div className="pd-quantity mb-4">
                                <h3 className="mb-4">Số lượng</h3>
                                <input type={'number'} min={0} />
                            </div>
                            <div className="pd-brand mb-4">
                                <h3 className="mb-4">Thương hiệu</h3>
                                <select>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                </select>
                            </div>
                            <div className="pd-category mb-4">
                                <h3 className="mb-4">Danh mục</h3>
                                <select>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                    <option>hahahah</option>
                                </select>
                            </div>
                            <div className="pd-tag mb-4">
                                <h3 className="mb-4">Tag</h3>
                            </div>
                        </Row>
                        <Row className="content-box mb-4">
                            <div className="pd-regular-price mb-4">
                                <h3>Giá</h3>
                                <input type={'number'} min={0} />
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
                            <Buttons
                                primary
                                onClick={() => {
                                    // console.log('name : ', name);
                                    // console.log('inages', images);
                                    // console.log('description: ', test);
                                    console.log(discount);
                                    editorTestFeild.current.innerHTML = test;
                                    setName('hahaha');
                                }}
                            >
                                Check
                            </Buttons>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default AddProduct;
