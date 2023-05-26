import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthApi } from '~/api';
import { useDispatch } from 'react-redux';
import { loginSuccess, startLogin, loginFailed } from '~/redux/slices/authSlice';
import { toast } from 'react-toastify';
function AdminLoginForm(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locate = useLocation();
    const initialValues = {
        phone: '',
        password: '',
    };
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const validationSchema = yup.object().shape({
        phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Vui lòng nhập số điện thoại'),
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
            if (res.user.role === 'admin') {
                navigate(locate?.state?.from ? locate?.state?.from?.pathname : '/admin');
            } else if (res.user.role === 'employee') {
                navigate('/admin/employee');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại.');
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

export default AdminLoginForm;
