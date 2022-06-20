export const StringInput = ({ id, children }) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type='text' id={id} name='string-input' maxLength={3} style={{width: '30px'}} />
        </>
    );
}