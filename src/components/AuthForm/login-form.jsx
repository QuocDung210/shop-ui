import { FastField, Form, Formik } from 'formik';
import { FormCheck, FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
function LoginForm(props) {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email('Email không hợp lệ').required('vui lòng nhập email'),
        password: yup.string().required('Vui lòng nhập mật khẩu'),
    });

    const handleSubmitForm = (values) => {
        console.log('Submkt: ', values.password);
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
                        <FastField name="email" component={InputField} type="email" placeholder="Email..." />
                        <FastField name="password" component={InputField} type="password" placeholder="Password..." />
                        <div className="d-flex justify-content-between">
                            <FormGroup className="mb-3" controlId="formBasicCheckbox">
                                <FormCheck type="checkbox" label="Nhớ tài khoản" />
                            </FormGroup>
                            <div>
                                <Link to={'/'}>
                                    <span style={{ color: 'var(--color-6)' }}>Quên mật khẩu ?</span>
                                </Link>
                            </div>
                        </div>
                        <FormGroup>
                            <Buttons primary lager className="button-login">
                                Đăng nhập
                            </Buttons>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default LoginForm;
