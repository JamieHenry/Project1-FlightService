export const NumberInput = ({ id, minValue, defaultValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='number' id={id} name='number-input' min={minValue} style={{width: '50px'}} defaultValue={defaultValue} placeholder={defaultValue} />
        </>
    );
}