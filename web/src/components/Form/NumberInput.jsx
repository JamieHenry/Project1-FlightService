/**
 * creates input component with appropiate label with passed in props
 * 
 * @params - destructured props
 * @returns - NumberInput component
 */
export const NumberInput = ({ id, innerRef, minValue, defaultValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='number' id={id} ref={innerRef} name='number-input' min={minValue} style={{width: '50px'}} defaultValue={defaultValue} placeholder={defaultValue} />
        </>
    );
}