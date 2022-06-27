/**
 * creates input button with passed in props
 * 
 * @params - destructured props
 * @returns - FormButton component
 */
export const FormButton = ({ text, onClick }) => {
    return (
        <button onClick={onClick} type='submit'>{text}</button>
    );
}