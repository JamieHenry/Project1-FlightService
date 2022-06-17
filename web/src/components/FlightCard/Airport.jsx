import { Item } from './Item';

export const Airport = ({ jc, children }) => {
    return (
        <Item jc={jc} fSize='30px' fWeight='bold'>
            {children}
        </Item>
    );
}