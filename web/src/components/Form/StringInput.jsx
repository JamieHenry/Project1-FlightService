export const StringInput = ({ id, defaultValue, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='text' id={id} name='string-input' minLength ={3} maxLength={3} style={{width: '50px'}} defaultValue={defaultValue} placeholder={defaultValue} />
        </>
    );
}