import { faCircleXmark, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Container, Row, Stack } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import Buttons from '~/components/Buttons';
import { db } from '~/firebase/configFirebase';
import { FirebaseService } from '~/firebase/firebaseService';
import './Ad.scss';
function Ad() {
    const inputFileRef = useRef(null);
    const [images, setImages] = useState(null);
    const [currentAdImgs, setCurrentAddImgs] = useState([]);
    const [urls, setUrls] = useState([]);
    const [test, setTest] = useState([]);
    const [deleteImgs, setDeleteImgs] = useState([]);
    const dt = new DataTransfer();

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
        } else {
            setImages([...e.target.files]);
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

    const handleAdd = async () => {
        const urls = await FirebaseService.uploadImg(images, 'AdsImg');
        setUrls(urls);
        // let check = {};
        // for (let i = 0; i < urls.length; i++) {
        //     check = { ...check, [i]: urls[i] };
        // }
        const data = {
            listImg: [...urls, ...test],
        };

        try {
            await setDoc(doc(db, 'AdImgs', 'img'), data);
            toast.success('Thêm thành công.');
        } catch (err) {
            toast.error('Thêm thất bại.');
            console.log(err);
        }
    };
    const handleDeleteAddImg = async (img) => {
        if (window.confirm('Bạn có muốn xóa ảnh này?')) {
            setDeleteImgs([
                ...deleteImgs,
                currentAdImgs.find((item) => {
                    return item === img;
                }),
            ]);
            setCurrentAddImgs(
                currentAdImgs.filter((item) => {
                    return item !== img;
                }),
            );
        }
    };

    const handleUpdateAd = async () => {
        const data = {
            listImg: currentAdImgs,
        };
        try {
            await setDoc(doc(db, 'AdImgs', 'img'), data);
            let res;
            for (let i of deleteImgs) {
                res = await FirebaseService.deleteImg(i, 'AdImgs', 'img');
            }
            if (res) {
                toast.success('Cập nhật thành công.');
            }
        } catch (err) {
            toast.error('Cập nhật thất bại.');
            console.log(err);
        }
        setDeleteImgs([]);
    };

    useEffect(() => {
        const getImgs = async () => {
            const res = await FirebaseService.getImgs('AdImgs', 'img');
            setTest(res?.listImg || []);
            // let arr = [];
            // for (const key in res) {
            //     arr.push(res[key]);
            // }
            setCurrentAddImgs(res?.listImg || []);
        };
        getImgs();
    }, [urls]);
    return (
        <>
            <Container fluid className="ad-manage-container">
                <Row className="mb-4">
                    <h2>Quảng cáo</h2>
                </Row>
                <Row className="mb-4 ">
                    <Stack gap={3} className="px-4 ad-img  ">
                        <Stack className=" content-box">
                            <h3>Ảnh quảng cáo hiện có : {currentAdImgs?.length || 0}</h3>
                            <div className="current-ad-imgs d-flex">
                                {currentAdImgs.length > 0 &&
                                    currentAdImgs.map((img, idx) => (
                                        <div key={idx} className="ad-img me-4">
                                            <FontAwesomeIcon
                                                className="ad-img-delete"
                                                icon={faCircleXmark}
                                                onClick={() => handleDeleteAddImg(img)}
                                            />
                                            <img src={`${img}}`} alt="img" />
                                        </div>
                                    ))}
                            </div>
                            <div className="d-flex justify-content-end">
                                <div style={{ maxWidth: '100px' }} className={test.length === 0 ? 'd-none' : 'd-block'}>
                                    <Buttons
                                        outline
                                        disabled={currentAdImgs.length >= test.length}
                                        onClick={handleUpdateAd}
                                    >
                                        Cập nhật
                                    </Buttons>
                                </div>
                            </div>
                        </Stack>
                        <div className="content-box">
                            <h3>Thêm ảnh quảng cáo</h3>
                            <div className=" ad-input-container mb-4 ">
                                <input
                                    ref={inputFileRef}
                                    type={'file'}
                                    id="ad-file-input"
                                    accept="image/*"
                                    multiple={true}
                                    className="ad-img-input"
                                    onChange={handleAddImg}
                                />
                                <label htmlFor="ad-file-input" className="ad-file-label">
                                    <FontAwesomeIcon icon={faUpload} className="ad-file-label-icon" />
                                    <p>Nhấp vào đây để chọn ảnh</p>
                                </label>
                            </div>
                            <div className="ad-img-list d-flex">
                                {images &&
                                    images.map((img, idx) => (
                                        <div key={idx} className="ad-img me-4">
                                            <FontAwesomeIcon
                                                className="ad-img-delete"
                                                icon={faCircleXmark}
                                                onClick={() => handleDeleteImg(idx)}
                                            />
                                            <img src={`${URL.createObjectURL(img)}`} alt="img" />
                                        </div>
                                    ))}
                            </div>
                            <div>
                                <Buttons primary onClick={handleAdd}>
                                    Cập nhật
                                </Buttons>
                            </div>
                        </div>
                    </Stack>
                </Row>
            </Container>
            <ToastContainer />
        </>
    );
}

export default Ad;
