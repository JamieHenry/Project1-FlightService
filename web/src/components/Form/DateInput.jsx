/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - DateInput component
 */
 export const DateInput = ({ id, defaultValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='date' id={id} name='date' defaultValue={defaultValue} placeholder={defaultValue} />
        </>
    );
}