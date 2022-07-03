import { Form } from 'react-bootstrap'

/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - DateTimeInput component
 */
export const DateTimeInput = ({ id, innerRef, defaultValue, children }) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{children}</Form.Label>
            <Form.Control type='datetime-local' id={id} ref={innerRef} name='datetime-input' defaultValue={defaultValue} placeholder={defaultValue} />
        </Form.Group>
    );
}