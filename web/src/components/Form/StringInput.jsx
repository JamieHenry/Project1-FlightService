import { Form } from 'react-bootstrap';

/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - StringInput component
 */
export const StringInput = ({ id, innerRef, defaultValue, children }) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{children}</Form.Label>
            <Form.Control type='text' id={id} ref={innerRef} name='string-input' minLength ={3} maxLength={3} defaultValue={defaultValue} placeholder={defaultValue} />
        </Form.Group>
    );
}