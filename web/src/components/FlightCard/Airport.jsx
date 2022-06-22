import { Item } from './Item';

/**
 * allows for specified 'justify-content'
 * styling for 'Airport Item' on flight card
 */
export const Airport = ({ jc, children }) => {
    return (
        <Item jc={jc} fSize='30px' fWeight='bold'>
            {children}
        </Item>
    );
}