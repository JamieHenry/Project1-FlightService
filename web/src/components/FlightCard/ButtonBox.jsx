import styled from 'styled-components';

const Box = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

export const ButtonBox = ({ children }) => {
    return (
        <Box>
            {children}
        </Box>
    );
}