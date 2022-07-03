import { Form } from 'react-bootstrap';

/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - NumberInput component
 */
export const NumberInput = ({ id, innerRef, minValue, defaultValue, children }) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{children}</Form.Label>
            <Form.Control type='number' id={id} ref={innerRef} name='number-input' min={minValue} defaultValue={defaultValue} placeholder={defaultValue} />
        </Form.Group>
    );
}