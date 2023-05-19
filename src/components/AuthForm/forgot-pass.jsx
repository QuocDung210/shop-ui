import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';

function ForgotPwForm(props) {
    const { handleCheck } = props;
    const initialValues = {
        email: '',
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email('Email không hợp lệ').required('vui lòng nhập email'),
    });

    const handleSubmitForm = async (values) => {
        const { email } = values;
        handleCheck(email);
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

export default ForgotPwForm;
