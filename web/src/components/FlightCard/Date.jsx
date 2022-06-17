import { Item } from './Item';

export const Date = ({ jc, children }) => {
    return (
        <Item jc={jc} fSize='30px' fWeight='bold'>
            {children}
        </Item>
    );
}