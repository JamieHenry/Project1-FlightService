export const DateTimeInput = ({ id, defaultValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='datetime-local' id={id} name='datetime-input' defaultValue={defaultValue} placeholder={defaultValue} />
        </>
    );
}