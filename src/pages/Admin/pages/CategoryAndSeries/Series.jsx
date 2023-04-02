import { Col, Container, Row, Stack } from 'react-bootstrap';
import Check from './Check';
import Buttons from '~/components/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { seriesApi } from '~/api/seriesApi';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';

function Series() {
    const [seriesList, setSeriesList] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);

    const [seriesType, setSeriesType] = useState(null);
    const [data, setData] = useState(null);

    const nameRef = useRef(null);
    const desRef = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const resSeries = await seriesApi.getAll();

                setSeriesList(resSeries);

                setSelectedSeries(resSeries[0]);
            } catch (err) {
                toast.error(err);
            }
        };
        fetch();
    }, []);

    const handleAddSeries = async () => {
        if (data === null || data.name === '' || data.description === '') {
            toast.warning('Bạn chưa nhập đủ thông tin.');
            return;
        }
        try {
            const res = await toast.promise(seriesApi.addSeries(data), {
                pending: 'Đang thêm dòng máy.',
                success: 'Thêm thành công.',
                error: 'Thêm thất bại.',
            });
            setSeriesList([...seriesList, res]);
            nameRef.current.value = null;
            desRef.current.value = null;
            setData(null);
            setSeriesType(null);
        } catch (err) {
            toast.error(err);
        }
    };

    const handleUpdateSeries = async () => {
        if (!selectedSeries) {
            return;
        }

        let dt;
        if (data === null || data?.name === '') {
            dt = {
                ...dt,
                name: selectedSeries.name,
            };
        } else {
            dt = {
                ...dt,
                name: data.name,
            };
        }
        if (data === null || data?.description === '') {
            dt = {
                ...dt,
                description: selectedSeries.description,
            };
        } else {
            dt = {
                ...dt,
                description: data.description,
            };
        }
        try {
            const res = await toast.promise(seriesApi.updateSeries(selectedSeries.id, dt), {
                pending: 'Đang cập nhật.',
                success: 'Cập nhật thành công.',
                error: 'Cập nhật thất bại.',
            });
            setSeriesList([...seriesList.filter((item) => item.id !== selectedSeries.id), res.result]);
            setSelectedSeries(res.result);
            setDefaultData();
            setSeriesType(null);
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

        setData({ ...data, [id]: value || '' });
    };

    const handleCancel = () => {
        setDefaultData();
        setSeriesType(null);
    };

    const handleDeleteSeries = async () => {
        if (!selectedSeries) {
            return;
        }
        window.confirm(`Xóa dòng máy : ${selectedSeries?.name}`);
        try {
            await seriesApi.deleteSeries(selectedSeries.id);
            toast.success('Xóa thành công.');
            setSeriesList(seriesList.filter((item) => item.id !== selectedSeries.id));
            setSelectedSeries(seriesList[0]);
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
                        <h2>Quản lý dòng máy</h2>
                        <Buttons
                            primary
                            small
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={() => {
                                setDefaultData();
                                setSeriesType(false);
                                setPlaceHolder();
                            }}
                        >
                            Tạo mới
                        </Buttons>
                    </Col>
                </Row>
                <Row className="gap-3">
                    <Col sm={3} xs={12} className="content-box">
                        <h3>Danh sách</h3>
                        <Stack gap={3}>
                            {seriesList ? (
                                seriesList.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={`category-item ${selectedSeries?.id === item.id && 'selected'}`}
                                        onClick={() => {
                                            setSelectedSeries(item);
                                        }}
                                    >
                                        <p>{item.name}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Danh mục rỗng</p>
                            )}
                        </Stack>
                    </Col>
                    <Col className="content-box">
                        {selectedSeries ? (
                            <>
                                <h3>Chi tiết</h3>
                                <Stack gap={3}>
                                    <div>
                                        <h4>Tên mục</h4>
                                        <p>{selectedSeries?.name}</p>
                                    </div>
                                    <div>
                                        <h4>Mô tả</h4>
                                        <p>{selectedSeries?.description}</p>
                                    </div>
                                    <div>
                                        <Buttons
                                            primary
                                            small
                                            onClick={() => {
                                                setPlaceHolder(selectedSeries?.name, selectedSeries?.description);
                                                setDefaultData();
                                                setSeriesType(true);
                                            }}
                                        >
                                            Cập nhật
                                        </Buttons>
                                        <Buttons outline small onClick={handleDeleteSeries}>
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
                    <Col className={`content-box ${seriesType === null && 'd-none'}`}>
                        <Check
                            type={seriesType}
                            cancel={handleCancel}
                            add={handleAddSeries}
                            setData={handleSetData}
                            nameRef={nameRef}
                            desRef={desRef}
                            update={handleUpdateSeries}
                        />
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}

export default Series;
