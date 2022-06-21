import { AppFlightCard } from '../../features/AppFlightCard';
import 'font-awesome/css/font-awesome.min.css';

export const FlightList = ({ flights }) => {
    return (
        <>
            {flights.map(flight => {
                return (
                    <AppFlightCard key={flight._id} flight={flight} margin='15px' />
                );
            })}
        </>
    );
}