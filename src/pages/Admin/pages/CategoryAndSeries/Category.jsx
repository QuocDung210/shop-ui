import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { categoryApi } from '~/api/categoryApi';
import Buttons from '~/components/Buttons';
import Check from './Check';
import useAuth from '~/hooks/useAuth';

function Category() {
    const [categoryList, setCategoryList] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryType, setCategoryType] = useState(null);
    const [data, setData] = useState(null);

    const nameRef = useRef(null);
    const desRef = useRef(null);
    const auth = useAuth();
    const configHeader = {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
    };
    useEffect(() => {
        const fetch = async () => {
            try {
                const resCategory = await categoryApi.getAll();

                setCategoryList(resCategory);

                setSelectedCategory(resCategory[0]);
            } catch (err) {
                toast.error(err);
            }
        };
        fetch();
    }, []);

    const handleAddCategory = async () => {
        if (data === null || data.name === '' || data.description === '') {
            toast.warning('Bạn chưa nhập đủ thông tin.');
            return;
        }
        try {
            const res = await toast.promise(categoryApi.addCategory(data, configHeader), {
                pending: 'Đang thêm danh mục.',
                success: 'Thêm thành công.',
                error: 'Thêm thất bại.',
            });
            setCategoryList([...categoryList, res]);
            nameRef.current.value = null;
            desRef.current.value = null;
            setData(null);
            setCategoryType(null);
        } catch (err) {
            toast.error(err);
        }
    };

    const handleUpdateCategory = async () => {
        if (!selectedCategory) {
            return;
        }

        let dt;
        if (data === null || data?.name === '') {
            dt = {
                ...dt,
                name: selectedCategory.name,
            };
        } else {
            dt = {
                ...dt,
                name: data.name,
            };
        }
        if (data?.description) {
            dt = {
                ...dt,
                description: data.description,
            };
        } else {
            dt = {
                ...dt,
                description: '',
            };
        }
        try {
            const res = await categoryApi.updateCategory(selectedCategory.id, dt, configHeader);
            console.log(res);
            toast.success('Cập nhật thành công.');
            setCategoryList([...categoryList.filter((item) => item.id !== selectedCategory.id), res]);
            setSelectedCategory(res.result);
            setDefaultData();
            setCategoryType(null);
        } catch (err) {
            toast.error(err);
        }
    };

    const handleSetData = (e) => {
        let id;
        if (e.target.id.includes('name')) {
            id = 'name';
        } else {
            id = 'description';
        }
        const value = e.target.value.trim();

        setData({ ...data, [id]: value });
    };

    const handleCancel = () => {
        setDefaultData();
        setCategoryType(null);
    };

    const handleDeleteCategory = async () => {
        setDefaultData();
        if (!selectedCategory) {
            return;
        }
        window.confirm(`Xóa danh mục : ${selectedCategory?.name}`);
        try {
            await categoryApi.deleteCategory(selectedCategory.id, configHeader);
            toast.success('Xóa thành công.');
            setCategoryList(categoryList.filter((item) => item.id !== selectedCategory.id));
            setSelectedCategory(categoryList[0]);
        } catch (err) {
            toast.error(err);
        }
    };

    const setPlaceHolder = (name = 'Name...', description = 'Description...') => {
        nameRef.current.placeholder = name;
        desRef.current.placeholder = description;
    };

    const setDefaultData = () => {
        nameRef.current.value = null;
        desRef.current.value = null;
        setData(null);
    };
    return (
        <Container fluid>
            <Row className="mb-4 gap-3">
                <Row>
                    <Col className="d-flex justify-content-between">
                        <h2>Quản lý danh mục</h2>
                        <Buttons
                            primary
                            small
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={() => {
                                setDefaultData();
                                setCategoryType(false);
                            }}
                        >
                            Tạo mới
                        </Buttons>
                    </Col>
                </Row>
                <Row className="gap-3">
                    <Col sm={3} xs={12} className="content-box">
                        <h3>Danh sách</h3>
                        <Stack gap={3} className="category-show-list">
                            {categoryList ? (
                                categoryList.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`category-item ${selectedCategory?.id === item?.id && 'selected'}`}
                                        onClick={() => {
                                            setSelectedCategory(item);
                                        }}
                                    >
                                        <p>{item?.name}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Danh mục rỗng</p>
                            )}
                        </Stack>
                    </Col>
                    <Col className="content-box">
                        {selectedCategory ? (
                            <>
                                <h3>Chi tiết</h3>
                                <Stack gap={3}>
                                    <div>
                                        <h4>Tên mục</h4>
                                        <p>{selectedCategory?.name}</p>
                                    </div>
                                    <div>
                                        <h4>Mô tả</h4>
                                        <p>{selectedCategory?.description}</p>
                                    </div>
                                    <div>
                                        <Buttons
                                            primary
                                            small
                                            onClick={() => {
                                                setPlaceHolder(selectedCategory?.name, selectedCategory?.description);
                                                setDefaultData();
                                                setCategoryType(true);
                                            }}
                                        >
                                            Cập nhật
                                        </Buttons>
                                        <Buttons outline small onClick={handleDeleteCategory}>
                                            Xóa
                                        </Buttons>
                                    </div>
                                </Stack>
                            </>
                        ) : (
                            <p>Không có danh mục</p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col className={`content-box ${categoryType === null && 'd-none'}`}>
                        <Check
                            type={categoryType}
                            cancel={handleCancel}
                            add={handleAddCategory}
                            setData={handleSetData}
                            nameRef={nameRef}
                            desRef={desRef}
                            update={handleUpdateCategory}
                        />
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}

export default Category;
