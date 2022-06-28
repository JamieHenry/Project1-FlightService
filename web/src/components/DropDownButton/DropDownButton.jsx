import dropdown from '../../assets/dropdown.png';
import styled from 'styled-components';

/**
 * 
 * @param {Function} onClick - onClick function for executing 
 * @returns - custom button with dropdown image
 */
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