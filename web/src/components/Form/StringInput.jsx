/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - StringInput component
 */
export const StringInput = ({ id, innerRef, defaultValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='text' id={id} ref={innerRef} name='string-input' minLength ={3} maxLength={3} style={{width: '50px'}} defaultValue={defaultValue} placeholder={defaultValue} />
        </>
    );
}