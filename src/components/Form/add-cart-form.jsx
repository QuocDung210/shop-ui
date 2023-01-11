import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import QuantityField from '../hook-form/QuantityField';
import SelectField from '../hook-form/SelectField';
import * as yup from 'yup';

function AddCartForm(props) {
    const { color, size } = props;

    const initialValues = {
        pdColor: '',
        pdSize: '',
        quantity: null,
    };

    const validationSchema = yup.object().shape({
        pdColor: yup.string().required('Vui lòng chọn màu'),
        pdSize: yup.string().required('Vui lòng chọn kích thước'),
        quantity: yup.number().integer().min(1, 'Vui lòng chọn').required('Vui lòng chọn số lượng').nullable(),
    });

    const handleSubmitForm = (values) => {
        console.log('check value :', values);
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
                            name="pdColor"
                            label="Color"
                            component={SelectField}
                            options={color}
                            placeholder="---Select Color---"
                        />
                        <FastField
                            name="pdSize"
                            label="Size"
                            component={SelectField}
                            options={size}
                            placeholder="---Select Size---"
                        />
                        <FastField
                            name="quantity"
                            label="Quantity"
                            component={QuantityField}
                            type={'number'}
                            placeholder="--"
                        />
                        <FormGroup>
                            <Buttons primary lager>
                                Thêm vào giỏ hàng
                            </Buttons>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default AddCartForm;
