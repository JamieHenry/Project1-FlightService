import { Item } from './Item';

export const Time = ({ jc, children }) => {
    return (
        <Item jc={jc} fSize='30px'>
            {children}
        </Item>
    );
}