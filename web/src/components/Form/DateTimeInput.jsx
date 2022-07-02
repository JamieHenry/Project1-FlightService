/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - DateTimeInput component
 */
export const DateTimeInput = ({ id, innerRef, defaultValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='datetime-local' id={id} ref={innerRef} name='datetime-input' defaultValue={defaultValue} placeholder={defaultValue} />
        </>
    );
}