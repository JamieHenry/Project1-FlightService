import styled from "styled-components";

export const ErrorDiv = styled.div`
    color: red;
    text-align: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
`;

export const FormError = ({ id, children }) => {
    return (
        <ErrorDiv id={id}>{children}</ErrorDiv>
    );
}