import dropdown from '../../assets/dropdown.png';
import styled from 'styled-components';

const CustomButton = styled.button`
    background-color: transparent;
    border: none;
    &:hover {
        background-color: darkgray;
    }
`;

export const DropDownButton = ({ onClick }) => {
    return (
        <CustomButton onClick={onClick}><img style={{width: '30px'}} src={dropdown} alt='drop down arrow' /></CustomButton>
    );    
}