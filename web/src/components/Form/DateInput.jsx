import { Form } from 'react-bootstrap';

/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - DateInput component
 */
 export const DateInput = ({ id, innerRef, defaultValue, children }) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{children}</Form.Label>
            <Form.Control type='date' id={id} ref={innerRef} name='date' defaultValue={defaultValue} placeholder={defaultValue} />
        </Form.Group>
    );
}