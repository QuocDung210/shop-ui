import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';

function ChangePasswordForm() {
    const initialValues = {
        oldPw: '',
        newPw: '',
        reEnterPw: '',
    };

    const validationSchema = yup.object().shape({
        oldPw: yup.string().required('Vui lòng chọn kích thước'),
        newPw: yup.string().required('Vui lòng nhập tên'),
        reEnterPw: yup.string().required('vui lòng nhập email'),
    });

    const handleSubmitForm = (values) => {
        console.log('check value :', values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmitForm(values)}
        >
            {(formikProps) => {
                // const { values, errors, touched } = formikProps;
                return (
                    <Form>
                        <FastField
                            name="oldPw"
                            label="Mat khau cu :"
                            component={InputField}
                            type="password"
                            placeholder="Mat khau cu"
                        />
                        <FastField
                            name="newPw"
                            label="Mat khau moi :"
                            type="password"
                            component={InputField}
                            placeholder="Mat khau moi"
                        />
                        <FastField
                            name="reEnterPw"
                            label="Nhap lai mat khau :"
                            component={InputField}
                            type="password"
                            placeholder="Phone number..."
                        />

                        <FormGroup>
                            <Buttons primary>Cập nhật</Buttons>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default ChangePasswordForm;
