import styled from 'styled-components';

/**
 * styled div for holding the two buttons on the flight card
 */
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