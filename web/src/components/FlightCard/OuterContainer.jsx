import styled from 'styled-components';

/**
 * styling for whole card flex grid
 *      holds button box and flight info div
 */
export const OuterContainer = styled.div`
    display: grid;
    background-color: lightgray;
    grid-template-columns: 75% 25%;
    gap: 10px;
    border: 4px solid black;
    border-radius: 4px;
    box-shadow: 5px 5px darkgray;
    margin: ${({margin}) => margin ?? 'none'};
`;