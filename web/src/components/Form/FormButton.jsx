/**
 * creates input button with passed in props
 * 
 * @params - destructured props
 * @returns - FormButton component
 */
export const FormButton = ({ onClick }) => {
    return (
        <button onClick={onClick} type='submit' value='Save'>Save</button>
    );
}