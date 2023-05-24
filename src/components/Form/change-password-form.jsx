import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';
import { AuthApi } from '~/api';
import { toast } from 'react-toastify';

function ChangePasswordForm({ handleClose }) {
    const initialValues = {
        oldPw: '',
        newPw: '',
        reEnterPw: '',
    };

    const validationSchema = yup.object().shape({
        oldPw: yup.string().required('Vui lòng nhập...'),
        newPw: yup.string().required('Vui lòng nhập...'),
        reEnterPw: yup
            .string()
            .oneOf([yup.ref('newPw'), null], 'Mật khẩu không khớp')
            .required('Vui lòng nhập mật khẩu'),
    });

    const handleSubmitForm = async (values) => {
        const data = {
            oldPassword: values.oldPw,
            newPassword: values.newPw,
        };

        try {
            await AuthApi.changePassword(data);

            if (handleClose) {
                handleClose();
            }
            toast.success('Thay đổi mật khẩu thành công.');
        } catch (err) {
            toast.error('Thay đổi mật khẩu thất bại.');
            console.log(err);
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
                        <FastField
                            name="oldPw"
                            label="Mật khẩu cũ:"
                            component={InputField}
                            type="password"
                            placeholder="Old password..."
                        />
                        <FastField
                            name="newPw"
                            label="Mật khẩu mới:"
                            type="password"
                            component={InputField}
                            placeholder="New password..."
                        />
                        <FastField
                            name="reEnterPw"
                            label="Nhập lại:"
                            component={InputField}
                            type="password"
                            placeholder="Retype..."
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
