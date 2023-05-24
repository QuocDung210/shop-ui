import { FastField, Form, Formik } from 'formik';
import { FormGroup } from 'react-bootstrap';
import Buttons from '../Buttons';
import QuantityField from '../hook-form/QuantityField';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function AddCartForm(props) {
    const { id, add, max, buy } = props;
    const [typeSubmit, setTypeSubmit] = useState(false);
    const initialValues = {
        quantity: null,
    };

    const validationSchema = yup.object().shape({
        quantity: yup.number().integer().min(1, 'Vui lòng chọn').required('Vui lòng chọn số lượng').nullable(),
    });

    const handleSubmitForm = (values) => {
        if (typeSubmit) {
            buy(id, values.quantity);
        } else {
            add(id, values.quantity);
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
                            name="quantity"
                            label="Số lượng  "
                            component={QuantityField}
                            type={'number'}
                            max={max}
                            placeholder="--"
                            disabled={true}
                        />
                        <FormGroup>
                            <div className="d-flex flex-wrap gap-3">
                                <div>
                                    <Buttons
                                        leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
                                        type={'submit'}
                                        outline
                                        lager
                                        onClick={() => setTypeSubmit(false)}
                                    >
                                        Thêm vào giỏ hàng
                                    </Buttons>
                                </div>
                                <div>
                                    <Buttons
                                        type={'submit'}
                                        primary
                                        leftIcon={<FontAwesomeIcon icon={faMoneyBill1Wave} />}
                                        onClick={() => setTypeSubmit(true)}
                                    >
                                        Mua ngay
                                    </Buttons>
                                </div>
                            </div>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default AddCartForm;
