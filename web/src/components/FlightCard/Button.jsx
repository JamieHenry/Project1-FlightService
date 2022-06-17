import styled from 'styled-components';

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