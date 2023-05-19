import { FastField, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';
import { FormGroup } from 'react-bootstrap';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { registerFailed, registerSuccess, startRegister } from '~/redux/slices/authSlice';
import { AuthApi } from '~/api';
function OtpForm(props) {
    const { info } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        otp: '',
    };
    const validationSchema = yup.object().shape({
        otp: yup.string().required('Vui lòng nhập OTP'),
    });

    const handleSubmitForm = async (values) => {
        const { otp } = values;
        dispatch(startRegister());
        try {
            const res = await AuthApi.register(info, otp);
            dispatch(registerSuccess(res));
            toast.success('Đăng ký thành công');
            setTimeout(() => {
                if (res.user.role === 'admin' || res.user.role === 'employee') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }, 3000);
        } catch (error) {
            console.log('Error: ', error);
            toast.error('Đăng ký thất bại');
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
                        <FastField name="otp" component={InputField} type="text" placeholder="Otp..." />
                        <FormGroup>
                            <Buttons primary lager className="button-login">
                                Xác nhận
                            </Buttons>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default OtpForm;
