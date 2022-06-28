import styled from 'styled-components';

/**
 * custom section for Nav item grouping on Navbar
 */
export const NavSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: ${({jc}) => jc ?? 'baseline'};
    width: 100%;
`;