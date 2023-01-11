import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';
function RegisterForm(props) {
    const initialValues = {
        name: '',
        email: '',
        phoneNum: '',
        password: '',
        confirmPassword: '',
    };

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên'),
        email: yup.string().email('Email không hợp lệ').required('vui lòng nhập email'),
        phoneNum: yup
            .string()
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
            .required('Vui lòng nhập số điện thoại'),
        password: yup.string().required('Vui lòng nhập mật khẩu'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Vui lòng nhập mật khẩu'),
    });

    const handleSubmitForm = (values) => {
        console.log('Submkt: ', values);
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
                        <FastField name="name" component={InputField} type="text" placeholder="Name..." />
                        <FastField name="email" component={InputField} type="email" placeholder="Email..." />
                        <FastField name="phoneNum" component={InputField} type="text" placeholder="Phone number..." />
                        <FastField name="password" component={InputField} type="password" placeholder="Password..." />
                        <FastField
                            name="confirmPassword"
                            component={InputField}
                            type="password"
                            placeholder="Confirm password..."
                        />

                        <FormGroup>
                            <Buttons primary lager className="button-login">
                                Đăng ký
                            </Buttons>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default RegisterForm;
