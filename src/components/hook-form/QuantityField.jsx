import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import './QuantityField.scss';

function QuantityField(props) {
    const ref = useRef();

    const { field, form, type, label, placeholder, max } = props;

    const { name, value } = field;
    const { errors, touched } = form;

    const showError = errors[name] && touched[name];

    const handleChangeQuantity = (e) => {
        let numbers = e.target.value;

        changeEv(numbers);
    };

    const handleDecreaseQuantity = () => {
        let numbers = ref.current.value - 1;

        if (numbers < 0) {
            return;
        } else {
            changeEv(numbers);
        }
    };
    const handleAdd = () => {
        let numbers = parseInt(ref.current.value) + 1;
        changeEv(numbers);
    };

    const changeEv = (numbers) => {
        const changeEvent = {
            target: {
                name: name,
                value: parseInt(numbers),
            },
        };
        field.onChange(changeEvent);
    };

    return (
        <FormGroup className="mb-3 d-flex product-quantity">
            <FormLabel style={{ margin: '0', minWidth: '90px' }}>{label}</FormLabel>

            <div className="decrease-btn" onClick={handleDecreaseQuantity}>
                <FontAwesomeIcon icon={faMinus} />
            </div>
            <FormControl
                id={name}
                {...field}
                value={value || 0}
                type={type}
                onChange={handleChangeQuantity}
                ref={ref}
                placeholder={placeholder}
                disabled={true}
                className="quantity-input"
                max={max}
                min={0}
                isInvalid={showError}
            />
            <div className="add-btn" onClick={handleAdd}>
                <FontAwesomeIcon icon={faPlus} />
            </div>

            <Feedback style={{ marginLeft: '20px' }} type={'invalid'}>
                {errors[name]}
            </Feedback>
        </FormGroup>
    );
}

export default QuantityField;
