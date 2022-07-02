/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - DateInput component
 */
 export const DateInput = ({ id, innerRef, defaultValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='date' id={id} ref={innerRef} name='date' defaultValue={defaultValue} placeholder={defaultValue} />
        </>
    );
}