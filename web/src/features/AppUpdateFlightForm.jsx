import axios from 'axios';
import { DateTimeInput, NumberInput, StringInput, FormButton, FormError } from '../components/Form';
import { validateInputs } from './AppNewFlightForm';

/**
 * takes in date and time and combines into a formatted string
 *      that date-time input and use
 * 
 * @param {String} date - date with format: 'mm/dd/yyyy'
 * @param {String} time - time with format: 'hh:mm (A|P)M'
 * @returns - formatted string for date-time input ('yyyy-mm-ddThh:mm')
 */
export const convertToDateTime = (date, time) => {
    // split into corresponding values
    const [month, day, year] = date.split('/');
    const [hourMin, amPm] = time.split(' ');
    let [hour, min] = hourMin.split(':');

    // convert time to 24-hour format based on AM|PM value
    // check for 12 AM|PM edge cases
    if (amPm === 'PM' && hour !== '12') {
        hour = parseInt(hour) + 12;
    }
    if (amPm === 'AM' && hour === '12') {
        hour = '00';
    }

    // format and return string
    return `${year}-${month}-${day}T${hour}:${min}`;
}

/**
 * create a form that handles updating an existing flight in the database
 * 
 * @params - destructured currentFlight for editing, updateFlights function, and submitEdit function 
 * @returns - AppUpdateFlightForm component
 */
export const AppUpdateFlightForm = ({ flight, updateFlights, closeEditModal }) => {
    
    /**
     * save user input and update flight to database if input is valid
     * 
     * @param {event} e - used to prevent default (refresh page)
     */
    const submitEdit = e => {
        // prevent page refresh and reset error div
        e.preventDefault();
        document.getElementById('error-edit').innerText = null;

        // get user input values
        const inputs = {
            flightNumber: flight.flightNumber,
            departureDateTime: document.getElementById('departure-date-edit').value,
            arrivalDateTime: document.getElementById('arrival-date-edit').value,
            departureAirport: document.getElementById('departure-airport-edit').value,
            arrivalAirport: document.getElementById('arrival-airport-edit').value,
            currPassengers: document.getElementById('current-passengers-edit').value,
            passengerLimit: document.getElementById('passenger-limit-edit').value
        };

        // validate user input and store result
        const validationResult = validateInputs(inputs);

        // if validation is false, display error message and exit function
        if (validationResult.valid === false) {
            document.getElementById('error-edit').innerText = validationResult.msg;
            return;
        }

        // validation passed, send put request with validated flight object
        axios.put('http://localhost:8080/flights', validationResult.newFlight)
            .then(() => {
                // after successful put, update current flight list and close edit modal
                updateFlights();
                closeEditModal();
            })
            .catch(err => {
                console.log(err);
                document.getElementById('error-edit').innerText = err.response.data.message;
            });
    }

    /**
     * clear user input in form to original flight values
     * 
     * @param {event} e - used to prevent default (refresh page)
     */
    const clearInputs = e => {
        e.preventDefault();

        // reset user input fields to original values
        document.getElementById('departure-date-edit').value = convertToDateTime(flight.departureDate, flight.departureTime);
        document.getElementById('arrival-date-edit').value = convertToDateTime(flight.arrivalDate, flight.arrivalTime);
        document.getElementById('departure-airport-edit').value = flight.departureAirport;
        document.getElementById('arrival-airport-edit').value = flight.arrivalAirport;
        document.getElementById('current-passengers-edit').value = flight.currPassengers;
        document.getElementById('passenger-limit-edit').value = flight.passengerLimit;
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
                <FormButton onClick={submitEdit} text='Save' />
            </div>
            <div>
                <FormButton onClick={clearInputs} text='Clear' />
            </div>
        </form>
    );
}