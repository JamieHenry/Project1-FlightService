import styled from 'styled-components';

export const NavBar = styled.nav`
    background-color: ${({backgroundColor}) => backgroundColor ?? '#000080'};
    color: ${({color}) => color ?? 'white'};
    font-size: 25px;
    padding: 1em 1.5em;
    display: flex;
    justify-content: space-between;
`;