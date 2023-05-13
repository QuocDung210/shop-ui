import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import * as yup from 'yup';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import { toast } from 'react-toastify';
import { userApi } from '~/api';
function OrderForm({ submit }) {
    const initialValues = {
        shipName: '',
        shipPhone: '',
        shipAddress: '',
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
        shipAddress: yup.string().required('Vui lòng nhập địa chỉ nhận hàng'),
        note: yup.string().nullable(),
    });

    const handleSubmitForm = async (values) => {
        console.log('check values: ', values);
        submit(values);
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmitForm(values)}
            >
                {(formikProps) => {
                    // const { values, errors, touched } = formikProps;

                    return (
                        <Form>
                            <FastField name="shipName" component={InputField} type="text" placeholder="Name..." />
                            <FastField
                                name="shipPhone"
                                component={InputField}
                                type="text"
                                placeholder="Phone number..."
                            />

                            <FastField name="shipAddress" component={InputField} type="text" placeholder="Address..." />
                            <FastField name="note" component={InputField} type="text" placeholder="Note..." />

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
