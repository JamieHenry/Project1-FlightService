import { Item } from './Item';

/**
 * styling for 'Passenger Item' on flight card
 */
export const PassengerInfo = ({ passengerCount, passengerLimit }) => {
    return (
        <Item color='blue' fSize='18px' fstyle='italic'>
            Passengers: {passengerCount}/{passengerLimit}
        </Item>
    );
}