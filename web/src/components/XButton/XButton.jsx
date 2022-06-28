import xbutton from '../../assets/xbutton.png';
import styled from 'styled-components';

const CustomButton = styled.button`
    background-color: transparent;
    border: none;
    &:hover {
        background-color: darkgray;
    }
`;

export const XButton = ({ onClick }) => {
    return (
        <CustomButton onClick={onClick}><img style={{width: '10px'}} src={xbutton} alt='x button' /></CustomButton>
    );    
}