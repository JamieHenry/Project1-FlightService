export const DateTimeInput = ({ id, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='datetime-local' id={id} name='datetime-input' />
        </>
    );
}