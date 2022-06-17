import { Item } from './Item';

export const PassengerInfo = ({ passengerCount, passengerLimit }) => {
    return (
        <Item color='blue' fSize='18px' fstyle='italic'>
            Current Passengers: {passengerCount}/{passengerLimit}
        </Item>
    );
}