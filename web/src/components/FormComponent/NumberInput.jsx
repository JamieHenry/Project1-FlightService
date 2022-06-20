export const NumberInput = ({ id, minValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='number' id={id} name='number-input' min={minValue} style={{width: '50px'}} />
        </>
    );
}