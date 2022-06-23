import { AppFlightCard } from './AppFlightCard';
import 'font-awesome/css/font-awesome.min.css';

/**
 * creates list mapping all passed in flights to individual FlightCard components
 * 
 * @params - destructured current flight list and updateFlights function 
 * @returns - list of mapped flight cards
 */
export const AppFlightList = ({ flights, updateFlights }) => {
    return (
        <>
            {flights.map(flight => {
                return (
                    <AppFlightCard key={flight._id} flight={flight} margin='15px' updateFlights={updateFlights} />
                );
            })}
        </>
    );
}