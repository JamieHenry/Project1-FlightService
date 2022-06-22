import { Item } from './Item';

/**
 * allows for specified 'justify-content'
 * styling for 'Time Item' on flight card
 */
export const Time = ({ jc, children }) => {
    return (
        <Item jc={jc} fSize='30px'>
            {children}
        </Item>
    );
}