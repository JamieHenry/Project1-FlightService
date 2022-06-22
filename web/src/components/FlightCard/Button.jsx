import styled from 'styled-components';

/**
 * allows for specified 'color', 'hover color', and 'on click event'
 * styling for 'Button Item' on flight card (trash or edit)
 */
const Btn = styled.button`
        margin: 3%;
        border: none;
        border-radius: 3px;
        font-size: 25px;
        color: white;
        background-color: ${({bc}) => bc ?? 'black'};
        &:hover {
            background-color: ${({bcHover}) => bcHover ?? 'none'};
        }
    `;

export const Button = ({ bc, bcHover, name, onClick }) => {
    return (
        <Btn bc={bc} bcHover={bcHover} onClick={onClick}><i className={name}/></Btn>
    );
}