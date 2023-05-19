import { FormGroup, FormControl, FormLabel, InputGroup, Modal, Stack } from 'react-bootstrap';
import './InputLocateField.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Buttons from '../Buttons';
import { AuthApi, cityApi } from '~/api';
function InputLocateField(props) {
    const { field, form, type, label, placeholder, disable, readonly } = props;

    const { name } = field;

    const { errors, touched } = form;

    const showError = errors[name] && touched[name];

    const [show, setShow] = useState(false);
    const [province, setProvince] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [data, setData] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await AuthApi.getProfile();
                setData(res.address);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            // const test = await axios.get('https://vapi.vnappmob.com/api/province');
            const test = await cityApi.getProvince();
            setProvinces(test.data.results);
        };
        fetch();
    }, []);

    useEffect(() => {
        setSelectedDistrict(null);
        setSelectedWard(null);
        if (province) {
            const fetch = async () => {
                const res = await cityApi.getDistrict(province.value);
                setDistricts(res.data.results);
            };
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [province?.value]);

    useEffect(() => {
        setSelectedWard(null);
        if (selectedDistrict) {
            const fetch = async () => {
                const res = await cityApi.getWard(selectedDistrict.value);
                setWards(res.data.results);
            };
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDistrict?.value]);

    const handleShow = () => {
        setShow(!show);
    };

    const handleSetData = () => {
        const value = province?.text + ',' + selectedDistrict?.text + ',' + selectedWard?.text;

        const changEvent = {
            target: {
                name: name,
                value: value,
            },
        };
        setData(value);
        field.onChange(changEvent);
    };

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        const changEvent = {
            target: {
                name: name,
                value: selectedValue,
            },
        };
        setData(selectedValue);
        field.onChange(changEvent);
    };

    return (
        <>
            <FormGroup className="mb-3">
                <InputGroup hasValidation className="ipg-wrapper">
                    {label && (
                        <FormLabel className="ipg-label mb-0 d-none d-sm-flex align-items-center">{label}</FormLabel>
                    )}
                    <div className="d-flex gap-3 w-100">
                        <div className="flex-fill">
                            <FormControl
                                id={name}
                                type={type}
                                {...field}
                                style={{ lineHeight: '3rem', fontSize: '1.6rem' }}
                                placeholder={placeholder}
                                disabled={disable}
                                readOnly={readonly}
                                isInvalid={showError}
                                className="ipg-form-control"
                                value={data}
                                onChange={handleChange}
                            />
                            <FormControl.Feedback className="ipg-form-feedback" type="invalid">
                                {errors[name]}
                            </FormControl.Feedback>
                        </div>
                        <div
                            className="d-flex align-items-center justify-content-center gap-2 locate-field-change"
                            onClick={handleShow}
                        >
                            <FontAwesomeIcon icon={faPen} />
                            <p className="m-0">Chỉnh sửa</p>
                        </div>
                    </div>
                </InputGroup>
            </FormGroup>
            <Modal
                show={show}
                onHide={() => {
                    handleShow();
                    setProvince(null);
                    setDistricts([]);
                    setSelectedDistrict(null);
                    setWards([]);
                }}
                className="delete-members"
            >
                <Modal.Header>
                    <h3 className="m-0">Địa chỉ giao hàng</h3>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={3}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="m-0">Tỉnh/Thành phố</h4>

                            <select
                                name="province"
                                id="province"
                                defaultValue={''}
                                onChange={(e) =>
                                    setProvince({
                                        value: e.target.value,
                                        text: e.target.options[e.target.selectedIndex].text,
                                    })
                                }
                            >
                                <option value={''} hidden>
                                    --Tỉnh/Thành phố--
                                </option>
                                {provinces?.map((item, idx) => (
                                    <option key={idx} value={item.province_id}>
                                        {item.province_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="m-0">Quận/Huyện</h4>
                            <select
                                name="districts"
                                id="districts"
                                defaultValue={''}
                                onChange={(e) =>
                                    setSelectedDistrict({
                                        value: e.target.value,
                                        text: e.target.options[e.target.selectedIndex].text,
                                    })
                                }
                            >
                                <option value={''} hidden>
                                    --Quận/Huyện--
                                </option>
                                {districts.length > 0 ? (
                                    districts?.map((item, idx) => (
                                        <option key={idx} value={item.district_id}>
                                            {item.district_name}
                                        </option>
                                    ))
                                ) : (
                                    <option value={''} disabled>
                                        Chưa chọn Tỉnh/Thành
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="m-0">Phường/Xã</h4>
                            <select
                                name="ward"
                                id="ward"
                                defaultValue={''}
                                onChange={(e) =>
                                    setSelectedWard({
                                        value: e.target.value,
                                        text: e.target.options[e.target.selectedIndex].text,
                                    })
                                }
                            >
                                <option value={''} hidden>
                                    --Phường/Xã/Thị trấn--
                                </option>
                                {wards.length > 0 ? (
                                    wards?.map((item, idx) => (
                                        <option key={idx} value={item.ward_id}>
                                            {item.ward_name}
                                        </option>
                                    ))
                                ) : (
                                    <option value={''} disabled>
                                        Chưa chọn Quận/Huyện
                                    </option>
                                )}
                            </select>
                        </div>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Buttons
                        onClick={() => {
                            handleShow();
                            setProvince(null);
                            setDistricts([]);
                            setSelectedDistrict(null);
                            setWards([]);
                        }}
                        outline
                        small
                    >
                        Cancel
                    </Buttons>
                    <Buttons
                        onClick={() => {
                            handleSetData();
                            handleShow();
                        }}
                        primary
                        small
                    >
                        OK
                    </Buttons>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InputLocateField;
