import sadplane from '../assets/sadplane.png';
import styled from 'styled-components';

/**
 * 
 * @returns - Error component with centered items
 */
export const Center = styled.div`
    display: flex;
    justify-content: center;
`;


export const Error =() => {

    return (
        <>
            <Center><h1 style={{fontSize: '100px'}}>404</h1></Center>
            <Center><h3>That page seems to have been misplaced...</h3></Center>
            <Center><img src={sadplane} alt='sad plane' height='200px' /></Center>
        </>
    );
}