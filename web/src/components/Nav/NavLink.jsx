import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * custom reactLink for Nav funcitonality
 */
export const NavLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    transition: color 0.25s;

    &:hover {
        color: ${({transitionColor}) => transitionColor ?? 'lightgray'};
    }
`;