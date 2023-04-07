import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import QuantityField from '../hook-form/QuantityField';
import * as yup from 'yup';

function AddCartForm(props) {
    const { id, add, max } = props;

    const initialValues = {
        quantity: null,
    };

    const validationSchema = yup.object().shape({
        quantity: yup.number().integer().min(1, 'Vui lòng chọn').required('Vui lòng chọn số lượng').nullable(),
    });

    const handleSubmitForm = (values) => {
        add(id, values.quantity);
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
                            name="quantity"
                            label="Số lượng  "
                            component={QuantityField}
                            type={'number'}
                            max={max}
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
