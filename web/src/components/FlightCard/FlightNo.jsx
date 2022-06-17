import { Item } from './Item';

export const FlightNo = ({ children }) => {
    return (
        <Item jc='left' color='blue' fSize='20px' fWeight='bold' opacity='40%'>
            {children}
        </Item>
    );
}