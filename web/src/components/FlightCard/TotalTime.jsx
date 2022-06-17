import { Item } from './Item';

export const TotalTime = ({ children }) => {
    return (
        <Item jc='right' fSize='20px' fStyle='oblique'>
            {children}
        </Item>
    );
}