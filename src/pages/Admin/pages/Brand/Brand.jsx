import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { BrandApi } from '~/api';
import Buttons from '~/components/Buttons';
import './Brand.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from '~/firebase/firebaseService';
import { ToastContainer, toast } from 'react-toastify';
import images from '~/assets/images';
import useAuth from '~/hooks/useAuth';
function Brand() {
    const [brandList, setBrandList] = useState([]);
    const [render, setRender] = useState(false);
    const [selected, setSelected] = useState({});
    const [data, setData] = useState(null);
    const [logo, setLogo] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [update, setUpdate] = useState(false);
    const nameIpRef = useRef(null);
    const logoIpRef = useRef();
    const descriptionIpRef = useRef(null);
    const updateNameIpRef = useRef(null);
    const updateLogoIpRef = useRef(null);
    const updateDescriptionIpRef = useRef(null);
    const auth = useAuth();
    const configHeader = {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
    };
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await BrandApi.getAll();

                setBrandList(res);
                setSelected(res[0]);
            } catch (err) {
                toast.error(err);
            }
        };
        fetchApi();
    }, [render]);

    const handleSetData = (e) => {
        let id;
        if (e.target.id.includes('name')) {
            id = 'name';
        } else if (e.target.id.includes('logo')) {
            id = 'logo';
        } else {
            id = 'description';
        }
        const value = e.target.value.trim();

        setData({ ...data, [id]: value });
    };

    const handleAddLogo = (e) => {
        const a = [...e.target.files];
        if (a.length > 0) {
            setLogo(URL.createObjectURL(a[0]));
            setLogoFile(a[0]);
        }
    };

    const handleAddBrand = async (e) => {
        if (!data?.name) {
            return;
        }
        let url = [];
        if (logoFile) {
            url = await FirebaseService.uploadImg([logoFile], 'Logo');
        } else {
            url = [''];
        }
        const dt = {
            ...data,
            logo: url[0],
        };

        try {
            const resbrand = await BrandApi.addBrand(dt, configHeader);
            toast.success('Thêm thành công.');
            setBrandList([...brandList, resbrand]);
            nameIpRef.current.value = null;
            descriptionIpRef.current.value = null;
            logoIpRef.current.value = null;
            setLogo(null);
            setData(null);
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi.');
        }
    };

    const handleDeleteBrand = async () => {
        try {
            await BrandApi.deleteBrand(selected.id, configHeader);
            await FirebaseService.deleteImg(selected.logo);
            setBrandList(brandList.filter((item) => item.id !== selected.id));
            toast.success('Xóa thành công.');
        } catch (err) {
            console.log(err);
            toast.error('Xóa thất bại.');
        }
    };

    const handleUpdateBrand = async () => {
        if (data === null && logoFile === null) {
            return;
        }
        let newUrl;
        if (logoFile !== null) {
            try {
                const res = await FirebaseService.uploadImg([logoFile], 'Logo');
                newUrl = res[0];
                await FirebaseService.deleteImg(selected.logo);
            } catch (err) {
                console.log(err);
            }
        } else {
            newUrl = selected.logo;
        }

        let newName;
        if (!data?.name) {
            newName = selected.name;
        } else {
            newName = data.name;
        }

        let newDescription;
        if (!data?.description) {
            newDescription = selected.description;
        } else {
            newDescription = data.description;
        }

        const dt = {
            name: newName,
            description: newDescription,
            logo: newUrl,
        };

        try {
            await BrandApi.updateBrand(selected.id, dt, configHeader);
            updateNameIpRef.current.value = null;
            updateDescriptionIpRef.current.value = null;
            updateLogoIpRef.current.value = null;
            setLogo(null);
            setData(null);
            setLogoFile(null);
            setRender(!render);
            toast.success('Cập nhật thành công.');
        } catch (error) {
            console.log(error);
            toast.error('Cập nhật thất bại.');
        }
    };

    return (
        <>
            <ToastContainer />
            <Container fluid className="brand-manage-container">
                <Row className="mb-4">
                    <h2>Thương hiệu</h2>
                </Row>

                <Row className="mb-4 gap-4">
                    <Col className="brand-list content-box" sm={12} md={4}>
                        <h3>Danh sách thương hiệu</h3>
                        <Row gap={3} direction="horizontal">
                            {brandList.length > 0 ? (
                                brandList.map((item, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className={`brand-name ${selected?.id === item.id && 'brand-selected'}`}
                                            onClick={() => setSelected(item)}
                                        >
                                            <p className="m-0">{item.name}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="m-0">Chưa có thương hiệu</p>
                            )}
                        </Row>
                    </Col>
                    <Col className={`content-box ${!selected && 'd-none'}`}>
                        <Row className="gap-3 mb-4 ">
                            <Col>
                                <div>
                                    <h3>Tên thương hiệu</h3>
                                    <p>{selected?.name}</p>
                                </div>

                                <div>
                                    <h3>Mô tả</h3>
                                    <p>{selected?.description}</p>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <h3>Logo</h3>
                                    <div className="d-flex">
                                        <div className="selected-brand-img  me-4">
                                            <img src={selected?.logo || images.errorImg} alt="img" />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="content-box mb-4">
                    <div className="d-flex gap-4 flex-wrap">
                        <div className="d-flex">
                            <Buttons
                                primary
                                onClick={() => {
                                    setUpdate(!update);
                                }}
                            >
                                {!update ? 'Cập nhật' : 'Thêm mới'}
                            </Buttons>
                        </div>
                        <div>
                            <Buttons outline onClick={handleDeleteBrand}>
                                Xóa thương hiệu
                            </Buttons>
                        </div>
                    </div>
                </Row>
                <Row className={`${!update && 'd-none'}`}>
                    <div className="add-brand-wrapper content-box">
                        <h3 className="mb-4">Cập nhật thương hiệu</h3>

                        <Stack className="brand-add-form">
                            <div className="mb-4">
                                <label htmlFor="brand-name">
                                    <h4>Tên thương hiệu</h4>
                                </label>
                                <input
                                    ref={updateNameIpRef}
                                    id="brand-name"
                                    className="brand-name-ip"
                                    type="text"
                                    placeholder="Brand name..."
                                    onChange={handleSetData}
                                />
                            </div>
                            <div>
                                <Row className="d-flex flex-wrap">
                                    <Col style={{ maxWidth: '200px' }} className="mb-4">
                                        <h4>Logo</h4>
                                    </Col>
                                    <Col md={'auto'} sm={12} className="d-flex flex-column flex-fill">
                                        <div className="mb-4 brand-logo ">
                                            <label htmlFor="logo" className="brand-logo-label">
                                                <FontAwesomeIcon icon={faUpload} className="brand-label-icon" />
                                                <p>Nhấp vào đây để chọn ảnh</p>
                                            </label>

                                            <input
                                                ref={updateLogoIpRef}
                                                type="file"
                                                id="logo"
                                                accept="image/*"
                                                className="brand-logo-ip "
                                                onChange={handleAddLogo}
                                            />
                                        </div>
                                        <div className="brand-img-container d-flex">
                                            <div className="brand-img me-4">
                                                <FontAwesomeIcon
                                                    className="brand-img-delete"
                                                    icon={faCircleXmark}
                                                    onClick={() => {
                                                        setLogo(null);
                                                        setLogoFile(null);
                                                        updateLogoIpRef.current.value = null;
                                                    }}
                                                />
                                                {logo && <img src={logo} alt="img" />}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className=" mb-4">
                                <label htmlFor="description">
                                    <h4>Mô tả</h4>
                                </label>
                                <input
                                    ref={updateDescriptionIpRef}
                                    id="description"
                                    className="brand-description-ip "
                                    placeholder="Description..."
                                    type="text"
                                    onChange={handleSetData}
                                />
                            </div>
                            <div>
                                <Buttons
                                    disabled={data === null && logoFile === null}
                                    primary
                                    className="brand-submit-btn"
                                    onClick={handleUpdateBrand}
                                >
                                    OK
                                </Buttons>
                                <Buttons
                                    disabled={!!!update}
                                    outline
                                    className="brand-submit-btn"
                                    onClick={() => setUpdate(false)}
                                >
                                    Cancel
                                </Buttons>
                            </div>
                        </Stack>
                    </div>
                </Row>
                <Row className={`${update && 'd-none'}`}>
                    <div className="add-brand-wrapper content-box">
                        <h3 className="mb-4">Thêm thương hiệu</h3>
                        <Stack className="brand-add-form">
                            <div className="mb-4">
                                <label htmlFor="update-brand-name">
                                    <h4>Tên thương hiệu</h4>
                                </label>
                                <input
                                    ref={nameIpRef}
                                    id="update-brand-name"
                                    className="brand-name-ip"
                                    type="text"
                                    placeholder="Brand name..."
                                    onChange={handleSetData}
                                />
                            </div>
                            <div>
                                <Row className="d-flex flex-wrap">
                                    <Col style={{ maxWidth: '200px' }} className="mb-4">
                                        <h4>Logo</h4>
                                    </Col>
                                    <Col md={'auto'} sm={12} className="d-flex flex-column flex-fill">
                                        <div className="mb-4 brand-logo ">
                                            <label htmlFor="update-logo" className="brand-logo-label">
                                                <FontAwesomeIcon icon={faUpload} className="brand-label-icon" />
                                                <p>Nhấp vào đây để chọn ảnh</p>
                                            </label>

                                            <input
                                                ref={logoIpRef}
                                                type="file"
                                                id="update-logo"
                                                accept="image/*"
                                                className="brand-logo-ip "
                                                onChange={handleAddLogo}
                                            />
                                        </div>
                                        <div className="brand-img-container d-flex">
                                            <div className="brand-img me-4">
                                                <FontAwesomeIcon
                                                    className="brand-img-delete"
                                                    icon={faCircleXmark}
                                                    onClick={() => {
                                                        logoIpRef.current.value = null;
                                                        setLogo(null);
                                                        setLogoFile(null);
                                                    }}
                                                />
                                                {logo && <img src={logo} alt="img" />}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className=" mb-4">
                                <label htmlFor="update-description">
                                    <h4>Mô tả</h4>
                                </label>
                                <input
                                    ref={descriptionIpRef}
                                    id="update-description"
                                    className="brand-description-ip "
                                    placeholder="Description..."
                                    type="text"
                                    onChange={handleSetData}
                                />
                            </div>
                            <div>
                                <Buttons primary className="brand-submit-btn" onClick={handleAddBrand}>
                                    Tạo thương hiệu
                                </Buttons>
                            </div>
                        </Stack>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default Brand;
