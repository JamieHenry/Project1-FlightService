import styled from 'styled-components';

export const NavSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: ${({jc}) => jc ?? 'baseline'};
    width: 100%;
`;