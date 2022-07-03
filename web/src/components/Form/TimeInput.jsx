import { Form } from 'react-bootstrap';

/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - TimeInput component
 */
 export const TimeInput = ({ id, innerRef, defaultValue, children }) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={id}>{children}</Form.Label>
            <Form.Control type='time' id={id} ref={innerRef} name='time' defaultValue={defaultValue} placeholder={defaultValue} />
        </Form.Group>
    );
}