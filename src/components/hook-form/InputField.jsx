import { FormGroup, FormControl, FormLabel, InputGroup } from 'react-bootstrap';

function InputField(props) {
    const { field, form, type, label, placeholder, disable } = props;

    const { name } = field;
    const { errors, touched } = form;

    const showError = errors[name] && touched[name];

    return (
        <FormGroup className="mb-3">
            <InputGroup hasValidation style={{ alignItems: 'center' }}>
                {label && (
                    <FormLabel
                        style={{ minWidth: '100px', textAlign: 'end', marginRight: '30px', marginBottom: '0px' }}
                    >
                        {label}
                    </FormLabel>
                )}
                <FormControl
                    id={name}
                    type={type}
                    {...field}
                    style={{ lineHeight: '3rem', fontSize: '1.6rem' }}
                    placeholder={placeholder}
                    disabled={disable}
                    isInvalid={showError}
                />
                <FormControl.Feedback type="invalid">{errors[name]}</FormControl.Feedback>
            </InputGroup>
        </FormGroup>
    );
}

export default InputField;
