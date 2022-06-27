import styled from 'styled-components';

export const NavBar = styled.nav`
    background-color: ${({backgroundColor}) => backgroundColor ?? '#000080'};
    color: ${({color}) => color ?? 'white'};
    font-size: 25px;
    padding: 0.5em 0.5em;
    display: flex;
    justify-content: space-between;
`;