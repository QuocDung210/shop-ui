import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { AuthApi } from '~/api';
import { useDispatch } from 'react-redux';
import { loginSuccess, startLogin, loginFailed } from '~/redux/slices/authSlice';
import config from '~/config';
function LoginForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        phone: '',
        password: '',
    };
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const validationSchema = yup.object().shape({
        // email: yup.string().email('Email không hợp lệ').required('vui lòng nhập email'),
        phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Vui lòng nhập số điện thoại'),
        // phone: yup.string().required('Vui lòng nhập số điện thoại'),
        password: yup.string().required('Vui lòng nhập mật khẩu'),
    });

    const handleSubmitForm = async (values) => {
        const { phone, password } = values;
        dispatch(startLogin());
        try {
            const res = await AuthApi.login({
                phone: phone,
                password: password,
            });
            dispatch(loginSuccess(res));
            if (res.user.role === 'admin' || res.user.role === 'employee') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log('Error: ', error);
            dispatch(loginFailed());
        }
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
                        <FastField name="phone" component={InputField} type="text" placeholder="Phone..." />
                        <FastField name="password" component={InputField} type="password" placeholder="Password..." />
                        <div className="d-flex justify-content-end mb-2">
                            <Link to={config.routes.forgot_pw}>
                                <span style={{ color: 'var(--color-6)' }}>Quên mật khẩu ?</span>
                            </Link>
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
