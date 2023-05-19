import { FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';

function SelectField(props) {
    const { field, form, options, label, placeholder, disable, division } = props;
    console.log('check', division);
    const { name } = field;

    const { errors, touched } = form;

    const showError = errors[name] && touched[name];

    const handleChangeOption = (e) => {
        const selectedValue = e.target.value;
        console.log([e.target]);
        const changEvent = {
            target: {
                name: name,
                value: selectedValue,
            },
        };
        field.onChange(changEvent);
    };

    return (
        <FormGroup className="mb-3 d-flex align-items-center">
            {label && <FormLabel style={{ margin: '0', minWidth: '90px' }}>{label}</FormLabel>}

            <FormSelect
                id={name}
                {...field}
                onChange={handleChangeOption}
                style={{ lineHeight: '3rem', fontSize: '1.6rem', maxWidth: '200px', textAlign: 'center' }}
                disabled={disable}
                isInvalid={showError}
            >
                <option hidden>{placeholder}</option>
                {options.map((color, idx) => (
                    <option key={idx} value={color.province_id}>
                        {division === 'province_name' && color.province_name}
                    </option>
                ))}
            </FormSelect>
            <Feedback style={{ marginLeft: '20px' }} type="invalid">
                {errors[name]}
            </Feedback>
        </FormGroup>
    );
}

export default SelectField;
