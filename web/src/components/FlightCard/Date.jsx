import { Item } from './Item';

/**
 * allows for specified 'justify-content'
 * styling for 'Date Item' on flight card
 */
export const Date = ({ jc, children }) => {
    return (
        <Item jc={jc} fSize='30px' fWeight='bold'>
            {children}
        </Item>
    );
}