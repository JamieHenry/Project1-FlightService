import axios from 'axios';
import { DateTimeInput, NumberInput, StringInput, FormButton, FormError } from '../components/Form';

/**
 * takes in user defined flight input fields and checks if it is valid
 * 
 * then the input fields are converted to match Flight schema and sent
 *      back for database insertion
 * 
 * @param {Object} inputs - contains flight input fields
 * @returns - object containing valid boolean value and flight object/msg
 */
export const validateInputs = inputs => {
    // first check if any input fields are missing ('')
    for (let field in inputs) {
        if (inputs[field] === '') return {valid: false, msg: 'Missing Input'};
    }

    // converting date-time input fields to seperate fields for Flight schema
    const [departureDate, departureTime] = convertFromDateTime(inputs.departureDateTime);
    const [arrivalDate, arrivalTime] = convertFromDateTime(inputs.arrivalDateTime);

    // split up arrival/departure date into corresponding month, day, year values
    const [departureMonth, departureDay, departureYear] = departureDate.split('/');
    const [arrivalMonth, arrivalDay, arrivalYear] = arrivalDate.split('/');

    // checking for valid dates, times, passengers, airports
    //      - arrival date must be after departure date
    //      - arrival time must be after departure time unless dates are different
    //      - current passenger count must be below or equal to passenger limit
    //      - arrival/departure airport must be not equal and be 3 letters in length
    if (arrivalYear < departureYear) return { valid: false, msg: 'Invalid Date' };
    if (arrivalMonth < departureMonth && arrivalYear === departureYear) return { valid: false, msg: 'Invalid Date' };
    if (arrivalDay < departureDay && arrivalMonth === departureMonth && arrivalYear === departureYear) return { valid: false, msg: 'Invalid Date' };
    if (arrivalTime <= departureTime && arrivalDate === departureDate) return { valid: false, msg: 'Invalid Time' };
    if (parseInt(inputs.currPassengers) > parseInt(inputs.passengerLimit)) return { valid: false, msg: 'Invalid Passenger Count' };
    if (inputs.departureAirport === inputs.arrivalAirport || inputs.departureAirport.length < 3 || inputs.arrivalAirport.length < 3) return { valid: false, msg: 'Invalid Airport' };

    // creating new Flight object with correct fields for schema
    const newFlight = {
        flightNumber: parseInt(inputs.flightNumber),
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        departureAirport: inputs.departureAirport.toUpperCase(),
        arrivalAirport: inputs.arrivalAirport.toUpperCase(),
        currPassengers: parseInt(inputs.currPassengers),
        passengerLimit: parseInt(inputs.passengerLimit)
    };

    return {valid: true, newFlight};
}

/**
 * convert from JavaScript date-time input to seperate date and time formats
 * 
 * @param {String} dateTime - date-time input string ('yyyy-mm-ddThh:mm')
 * @returns - both converted date (format: 'mm/dd/yyyy') and time (format: 'hh:mm (A|P)M')
 */
export const convertFromDateTime = dateTime => {
    // split parameter into its corresponding year, month, day, time values
    let [date, time] = dateTime.split('T');
    let [year, month, day] = date.split('-');

    // re-format date and split time into corresponding hour and min values
    date = `${month}/${day}/${year}`;
    let [hour, min] = time.split(':');

    // convert hour to 12-hour format, adding in lost 0 if needed
    // catching edge case of 12 being 12PM
    // catching edge case of 00 being 12AM
    // then re-format time
    if (hour > '12') {
        hour = parseInt(hour) - 12;
        time = hour >= 10 ? `${hour}:${min} PM` : `0${hour}:${min} PM`;
    } else if (hour === '12') {
        time = `12:${min} PM`;
    } else if (hour === '00') {
        time = `12:${min} AM`;
    } else {
        time = `${hour}:${min} AM`;
    }

    return [date, time];
}

/**
 * create a form that handles adding new flights to the database
 * 
 * @param {function} updateFlights - updateFlights function 
 * @returns - AppNewFlightForm component
 */
export const AppNewFlightForm = ({ updateFlights }) => {

    /**
     * save user input and post new flight to database if input is valid
     * 
     * @param {event} e - used to prevent default (refresh page)
     */
    const saveNewFlight = e => {
        // prevent page refresh and reset error div
        e.preventDefault();
        document.getElementById('error').innerText = null;

        // get user input values
        const inputs = {
            flightNumber: document.getElementById('flight-num').value,
            departureDateTime: document.getElementById('departure-date').value,
            arrivalDateTime: document.getElementById('arrival-date').value,
            departureAirport: document.getElementById('departure-airport').value,
            arrivalAirport: document.getElementById('arrival-airport').value,
            currPassengers: document.getElementById('current-passengers').value,
            passengerLimit: document.getElementById('passenger-limit').value
        };

        // validate user input and store result
        const validationResult = validateInputs(inputs);

        // if validation is false, display error message and exit function
        if (validationResult.valid === false) {
            document.getElementById('error').innerText = validationResult.msg;
            return;
        }

        // validation passed, send post request with validated flight object
        axios.post('http://localhost:8080/flights', validationResult.newFlight)
            .then(() => {
                // after successful post, update current flight list
                updateFlights();

                // reset user input fields
                document.getElementById('flight-num').value = null;
                document.getElementById('departure-date').value = null;
                document.getElementById('arrival-date').value = null;
                document.getElementById('departure-airport').value = null;
                document.getElementById('arrival-airport').value = null;
                document.getElementById('current-passengers').value = null;
                document.getElementById('passenger-limit').value = null;
            })
            .catch(err => {
                console.log(err);
                document.getElementById('error').innerText = err.response.data.message;
            });
    }   

    return(
        <form onSubmit={() => false}>
            <NumberInput id='flight-num' minValue={1}>Flight Number: </NumberInput>
            <DateTimeInput id='departure-date'>Departure Date: </DateTimeInput>
            <DateTimeInput id='arrival-date'>Arrival Date: </DateTimeInput>
            <StringInput id='departure-airport'>Departure Airport: </StringInput>
            <StringInput id='arrival-airport'>Arrival Airport: </StringInput>
            <NumberInput id='current-passengers' minValue={0}>Current Passengers: </NumberInput>
            <NumberInput id='passenger-limit' minValue={1}>Passenger Limit: </NumberInput>
            <FormButton onClick={saveNewFlight} text='Save' />
            <FormError id='error'></FormError>
        </form>
    );
}