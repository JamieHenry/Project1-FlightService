import styled from 'styled-components';

export const Item = styled.div`
    display: flex;
    padding-top: 1%;
    padding-left: 3%;
    padding-right: 3%;
    justify-content: ${({jc}) => jc ?? 'center'};
    color: ${({color}) => color ?? 'black'};
    font-size: ${({fSize}) => fSize ?? 'none'};
    font-weight: ${({fWeight}) => fWeight ?? 'none'};
    font-style: ${({fStyle}) => fStyle ?? 'none'};
    opacity: ${({opacity}) => opacity ?? '100%'};
`;