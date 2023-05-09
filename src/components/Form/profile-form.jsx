import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { AuthApi } from '~/api';

function ProfileForm(props) {
    const initialValues = {
        name: '',
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên'),
    });

    const handleSubmitForm = async (values) => {
        console.log('check value :', values);
        try {
            await AuthApi.updateName(values.name);
            toast.success('Cập nhật thành công.');
        } catch (err) {
            toast.error('Cập nhật thất bại.');
        }
        props.handleClose();
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
                        <FastField name="name" label="Họ tên :" component={InputField} type="text" placeholder="Name" />
                        <FormGroup style={{ textAlign: 'end' }}>
                            <Buttons primary>Cập nhật</Buttons>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default ProfileForm;
