import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerFailed } from '~/redux/slices/authSlice';
import { AuthApi } from '~/api';
import { toast } from 'react-toastify';
function RegisterForm(props) {
    const { setInfo } = props;
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên'),
        email: yup.string().email('Email không hợp lệ').required('vui lòng nhập email'),
        phone: yup
            .string()
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
            .required('Vui lòng nhập số điện thoại')
            .min(10, 'Số điện thoại không hợp lệ'),
        password: yup.string().required('Vui lòng nhập mật khẩu'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Vui lòng nhập mật khẩu'),
    });

    const handleSubmitForm = async (values) => {
        const { name, email, phone, password } = values;
        try {
            let data = {
                name: name,
                email: email,
                phone: phone,
                password: password,
            };

            const res = await AuthApi.sendOtp(data);
            if (res.includes('sent succcessfully')) {
                toast.success(`Đã gửi OTP cho ${email} thành công. Vui lòng kiểm tra.`);
                setInfo(data);
            }
        } catch (error) {
            console.log('Error: ', error);
            toast.error(error);
            dispatch(registerFailed());
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
                        <FastField name="name" component={InputField} type="text" placeholder="Name..." />
                        <FastField name="email" component={InputField} type="email" placeholder="Email..." />
                        <FastField name="phone" component={InputField} type="text" placeholder="Phone number..." />
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
