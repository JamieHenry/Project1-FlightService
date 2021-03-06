import { Item } from './Item';

/**
 * styling for 'TotalTime Item' on flight card
 */
export const TotalTime = ({ children }) => {
    return (
        <Item jc='right' fSize='20px' fStyle='oblique'>
            {children}
        </Item>
    );
}