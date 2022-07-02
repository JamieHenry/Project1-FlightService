/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - TimeInput component
 */
 export const TimeInput = ({ id, innerRef, defaultValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='time' id={id} ref={innerRef} name='time' defaultValue={defaultValue} placeholder={defaultValue} />
        </>
    );
}