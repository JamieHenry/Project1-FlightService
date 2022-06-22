import axios from 'axios';
import { DateTimeInput, NumberInput, StringInput, FormButton, FormError } from '../components/Form';
import { validateInputs } from './AppNewFlightForm';

export const convertToDateTime = (date, time) => {
    const [month, day, year] = date.split('/');
    const [hourMin, amPm] = time.split(' ');
    let [hour, min] = hourMin.split(':');

    if (amPm === 'PM') {
        hour = parseInt(hour) + 12;
    }

    return `${year}-${month}-${day}T${hour}:${min}`;
}

export const AppUpdateFlightForm = ({ flight, updateFlights, onClick }) => {
    
    const submitEdit = e => {
        e.preventDefault();
        document.getElementById('error-edit').innerText = null;

        const inputs = {
            flightNumber: flight.flightNumber,
            departureDateTime: document.getElementById('departure-date-edit').value,
            arrivalDateTime: document.getElementById('arrival-date-edit').value,
            departureAirport: document.getElementById('departure-airport-edit').value,
            arrivalAirport: document.getElementById('arrival-airport-edit').value,
            currPassengers: document.getElementById('current-passengers-edit').value,
            passengerLimit: document.getElementById('passenger-limit-edit').value
        };

        const validationResult = validateInputs(inputs);
        if (validationResult.valid === false) {
            document.getElementById('error-edit').innerText = validationResult.msg;
            return;
        }

        axios.put('http://localhost:8080/flights', validationResult.newFlight)
            .then(() => {
                updateFlights();
                onClick();
            })
            .catch(err => {
                console.log(err);
                document.getElementById('error-edit').innerText = err.response.data.message;
            });
    }

    return(
        <form onSubmit={() => false}>
            <div>
                <DateTimeInput id='departure-date-edit' defaultValue={convertToDateTime(flight.departureDate, flight.departureTime)}>Departure Date: </DateTimeInput>
            </div>
            <div>
                <DateTimeInput id='arrival-date-edit' defaultValue={convertToDateTime(flight.arrivalDate, flight.arrivalTime)}>Arrival Date: </DateTimeInput>
            </div>
            <div>
                <StringInput id='departure-airport-edit' defaultValue={flight.departureAirport}>Departure Airport: </StringInput>
            </div>
            <div>
                <StringInput id='arrival-airport-edit' defaultValue={flight.arrivalAirport}>Arrival Airport: </StringInput>
            </div>
            <div>
                <NumberInput id='current-passengers-edit' minValue={0} defaultValue={flight.currPassengers}>Current Passengers: </NumberInput>
            </div>
            <div>
                <NumberInput id='passenger-limit-edit' minValue={1} defaultValue={flight.passengerLimit}>Passenger Limit: </NumberInput>
            </div>
            <div>
                <FormError id='error-edit'></FormError>
            </div>
            <div>
                <FormButton onClick={submitEdit} />
            </div>
        </form>
    );
}