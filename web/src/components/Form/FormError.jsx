import styled from 'styled-components';

/**
 * creates styled error div with passed in props
 * 
 * @params - destructured props
 * @returns - FormError component
 */

 const ErrorDiv = styled.div`
    color: red;
    text-align: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    margin-top: 15px;
`;

export const FormError = ({ id, children }) => {
    return (
        <ErrorDiv id={id}>{children}</ErrorDiv>
    );
}