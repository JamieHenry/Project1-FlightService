import axios from 'axios';
import { DateTimeInput, NumberInput, StringInput, FormButton, FormError } from '../components/Form';
import { validateInputs } from './AppNewFlightForm';
import { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';

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
    
    // state for error message
    const [error, setError] = useState('');

    // references for data input
    const departureDateTimeInput = useRef();
    const arrivalDateTimeInput = useRef();
    const departureAirportInput = useRef();
    const arrivalAirportInput = useRef();
    const currPassengersInput = useRef();
    const passengerLimitInput = useRef();

    /**
     * save user input and update flight to database if input is valid
     * 
     * @param {event} e - used to prevent default (refresh page)
     */
    const submitEdit = e => {
        // prevent page refresh and reset error div
        e.preventDefault();
        setError('');

        // get user input values
        const inputs = {
            flightNumber: flight.flightNumber,
            departureDateTime: departureDateTimeInput.current.value,
            arrivalDateTime: arrivalDateTimeInput.current.value,
            departureAirport: departureAirportInput.current.value,
            arrivalAirport: arrivalAirportInput.current.value,
            currPassengers: currPassengersInput.current.value,
            passengerLimit: passengerLimitInput.current.value
        };

        // validate user input and store result
        const validationResult = validateInputs(inputs);

        // if validation is false, display error message and exit function
        if (validationResult.valid === false) {
            setError(validationResult.msg);
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
                setError(err.response.data.message);
            });
    }

    /**
     * clear user input in form to original flight values
     * 
     * @param {event} e - used to prevent default (refresh page)
     */
    const clearInputs = e => {
        e.preventDefault();
        setError('');

        // reset user input fields to original values
        departureDateTimeInput.current.value = convertToDateTime(flight.departureDate, flight.departureTime);
        arrivalDateTimeInput.current.value = convertToDateTime(flight.arrivalDate, flight.arrivalTime);
        departureAirportInput.current.value = flight.departureAirport;
        arrivalAirportInput.current.value = flight.arrivalAirport;
        currPassengersInput.current.value = flight.currPassengers;
        passengerLimitInput.current.value = flight.passengerLimit;
    }

    return(
        <Form onSubmit={() => false}>
            <DateTimeInput id='departure-date-edit' innerRef={departureDateTimeInput} defaultValue={convertToDateTime(flight.departureDate, flight.departureTime)}>Departure Date: </DateTimeInput>
            <DateTimeInput id='arrival-date-edit' innerRef={arrivalDateTimeInput} defaultValue={convertToDateTime(flight.arrivalDate, flight.arrivalTime)}>Arrival Date: </DateTimeInput>
            <StringInput id='departure-airport-edit' innerRef={departureAirportInput} defaultValue={flight.departureAirport}>Departure Airport: </StringInput>
            <StringInput id='arrival-airport-edit' innerRef={arrivalAirportInput} defaultValue={flight.arrivalAirport}>Arrival Airport: </StringInput>
            <NumberInput id='current-passengers-edit' innerRef={currPassengersInput} minValue={0} defaultValue={flight.currPassengers}>Current Passengers: </NumberInput>
            <NumberInput id='passenger-limit-edit' innerRef={passengerLimitInput} minValue={1} defaultValue={flight.passengerLimit}>Passenger Limit: </NumberInput>
            <FormError id='error-edit'>{error}</FormError>
            <div style={{gap: '20px', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <FormButton onClick={submitEdit} text='Save' />
                <FormButton onClick={clearInputs} text='Clear' />
            </div>
        </Form>
    );
}