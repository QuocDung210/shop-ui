import { FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import './InputField.scss';
function InputField(props) {
    const { field, form, type, label, placeholder, disable } = props;

    const { name } = field;

    const { errors, touched } = form;

    const showError = errors[name] && touched[name];

    return (
        <FormGroup className="mb-3">
            <InputGroup hasValidation className="ipg-wrapper d-flex">
                {label && <FormLabel className="ipg-label mb-0 d-none d-sm-flex align-items-center">{label}</FormLabel>}
                <div className="flex-fill">
                    <FormControl
                        id={name}
                        type={type}
                        {...field}
                        style={{ lineHeight: '3rem', fontSize: '1.6rem' }}
                        placeholder={placeholder}
                        disabled={disable}
                        isInvalid={showError}
                        className="ipg-form-control"

                        // onChange={handleOnChange}
                    />
                    <FormControl.Feedback className="ipg-form-feedback" type="invalid">
                        {errors[name]}
                    </FormControl.Feedback>
                </div>
            </InputGroup>
        </FormGroup>
    );
}

export default InputField;
