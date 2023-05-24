import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';

function ForgotPwOtpForm(props) {
    const { handleGetPw } = props;

    const initialValues = {
        otp: '',
        newPass: '',
        reEnter: '',
    };

    const validationSchema = yup.object().shape({
        otp: yup.string().required('Vui lòng nhập OTP'),
        newPass: yup.string().required('Vui lòng nhập mật khẩu'),
        reEnter: yup
            .string()
            .oneOf([yup.ref('newPass'), null], 'Mật khẩu không khớp')
            .required('Vui lòng nhập mật khẩu'),
    });

    const handleSubmitForm = async (values) => {
        const { otp, newPass } = values;
        handleGetPw(otp, newPass);
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
                        <FastField name="otp" component={InputField} type="text" placeholder="Mã xác thực..." />

                        <FastField
                            name="newPass"
                            component={InputField}
                            type="password"
                            placeholder="Mật khẩu mới..."
                        />
                        <FastField
                            name="reEnter"
                            component={InputField}
                            type="password"
                            placeholder="Nhập lại mật khẩu..."
                        />
                        <FormGroup>
                            <Buttons primary lager className="button-login">
                                Gửi
                            </Buttons>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default ForgotPwOtpForm;
