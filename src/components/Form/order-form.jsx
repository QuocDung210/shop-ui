import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import * as yup from 'yup';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';

import './order-form.scss';
import InputLocateField from '../hook-form/InputLocateField';
import { useEffect, useState } from 'react';
import { AuthApi } from '~/api';
import { toast } from 'react-toastify';
function OrderForm({ submit }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await AuthApi.getProfile();
                setUser(res);
            } catch (err) {
                console.log(err);
                toast.error('Lấy thông tin người dùng thất bại');
            }
        };
        fetch();
    }, []);
    const initialValues = {
        shipName: user?.name || '',
        shipPhone: user?.phone || '',
        shipAddress: user?.address || '',
        note: '',
    };
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        shipName: yup.string().required('Vui lòng nhập tên'),
        shipPhone: yup
            .string()
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
            .required('Vui lòng nhập số điện thoại')
            .min(10, 'Số điện thoại không hợp lệ'),
        shipAddress: yup.string().required('Vui lòng nhập địa chỉ nhận hàng').nullable(),
        note: yup.string().nullable(),
    });

    const handleSubmitForm = async (values) => {
        // submit(values);
        console.log(values);
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values) => handleSubmitForm(values)}
            >
                {(formikProps) => {
                    // const { values, errors, touched } = formikProps;

                    return (
                        <Form>
                            <FastField
                                name="shipName"
                                component={InputField}
                                type="text"
                                placeholder="Người nhận hàng..."
                            />
                            <FastField
                                name="shipPhone"
                                component={InputField}
                                type="text"
                                placeholder="Số điện thoại người nhận..."
                            />
                            {/* <div>
                                <h4>Địa chỉ giao hàng</h4>
                                <div>
                                    <FastField
                                        name="province"
                                        component={SelectField}
                                        type="text"
                                        options={provinces}
                                        placeholder="Tỉnh/Thành phố"
                                        division={'province_name'}
                                    />
                                </div>
                            </div> */}

                            {/* <FastField
                                name="shipAddress"
                                component={InputField}
                                type="text"
                                placeholder="Địa chỉ nhận hàng..."
                            /> */}
                            <FastField
                                name="shipAddress"
                                component={InputLocateField}
                                type="text"
                                placeholder="Địa chỉ nhận hàng..."
                                readonly={true}
                                value={user?.address}
                            />

                            <FastField name="note" component={InputField} type="text" placeholder="Ghi chú..." />

                            <FormGroup>
                                <Buttons primary lager className="button-login">
                                    Thanh toán
                                </Buttons>
                            </FormGroup>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}

export default OrderForm;
