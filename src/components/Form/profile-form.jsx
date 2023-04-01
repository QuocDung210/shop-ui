import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
// import QuantityField from '../hook-form/QuantityField';
// import SelectField from '../hook-form/SelectField';
import InputField from '../hook-form/InputField';
import * as yup from 'yup';

function ProfileForm(props) {
    const initialValues = {
        name: '',
        // birthday: '',
        phoneNum: '',
        email: '',
        // city: '',
        // address: '',
    };

    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        // birthday: yup.string().required('Vui lòng chọn kích thước'),
        name: yup.string().required('Vui lòng nhập tên'),
        email: yup.string().email('Email không hợp lệ').required('vui lòng nhập email'),
        phoneNum: yup
            .string()
            .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
            .required('Vui lòng nhập số điện thoại'),
        // city: yup.string(),
        // address: yup.string(),
    });

    const handleSubmitForm = (values) => {
        console.log('check value :', values);
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
                        {/* <FastField
                            name="birthday"
                            label="Ngày sinh :"
                            type="date"
                            component={InputField}
                            placeholder="birthday"
                        /> */}
                        <FastField
                            name="phoneNum"
                            label="Sđt :"
                            component={InputField}
                            type="text"
                            placeholder="Phone number..."
                        />
                        <FastField
                            name="email"
                            label="Email :"
                            component={InputField}
                            type="email"
                            placeholder="Email..."
                        />
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
