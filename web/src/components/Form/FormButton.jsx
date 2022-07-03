import { Button } from 'react-bootstrap';

/**
 * creates input button with passed in props
 * 
 * @params - destructured props
 * @returns - FormButton component
 */
export const FormButton = ({ text, onClick }) => {

    let variant = '';

    switch(text) {
        case 'Save':
            variant = 'outline-success';
            break;
        case 'Clear':
            variant = 'outline-secondary';
            break;
        case 'Apply':
            variant = 'outline-primary';
            break;
        default:
            break;
    }

    return (
        <Button variant={variant} onClick={onClick} type='submit'>{text}</Button>
    );
}