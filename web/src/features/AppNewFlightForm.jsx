import axios from 'axios';
import { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
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

    // state for error message
    const [error, setError] = useState('');

    // references for data input
    const flightNumInput = useRef();
    const departureDateTimeInput = useRef();
    const arrivalDateTimeInput = useRef();
    const departureAirportInput = useRef();
    const arrivalAirportInput = useRef();
    const currPassengersInput = useRef();
    const passengerLimitInput = useRef();

    /**
     * save user input and post new flight to database if input is valid
     * 
     * @param {event} e - used to prevent default (refresh page)
     */
    const saveNewFlight = e => {
        // prevent page refresh and reset error div
        e.preventDefault();
        setError('');

        // get user input values
        const inputs = {
            flightNumber: flightNumInput.current.value,
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

        // validation passed, send post request with validated flight object
        axios.post('http://localhost:8080/flights', validationResult.newFlight)
            .then(() => {
                // after successful post, update current flight list
                updateFlights();

                // reset user input fields
                flightNumInput.current.value = null;
                departureDateTimeInput.current.value = null;
                arrivalDateTimeInput.current.value = null;
                departureAirportInput.current.value = null;
                arrivalAirportInput.current.value = null;
                currPassengersInput.current.value = null;
                passengerLimitInput.current.value = null;
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.message);
            });
    }
    
    /**
     * clear user input in form
     * 
     * @param {event} e - used to prevent default (refresh page)
     */
    const clearInputs = e => {
        e.preventDefault();
        setError('');

        // reset user input fields
        flightNumInput.current.value = null;
        departureDateTimeInput.current.value = null;
        arrivalDateTimeInput.current.value = null;
        departureAirportInput.current.value = null;
        arrivalAirportInput.current.value = null;
        currPassengersInput.current.value = null;
        passengerLimitInput.current.value = null;
    }

    return(
        <Form className='form-horizontal' onSubmit={() => false}>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm'>
                        <NumberInput id='flight-num' innerRef={flightNumInput} minValue={1}>Flight Number: </NumberInput>
                    </div>
                    <div className='col-sm'>
                        <DateTimeInput id='departure-date' innerRef={departureDateTimeInput}>Departure Date: </DateTimeInput>
                    </div>
                    <div className='col-sm'>
                    <DateTimeInput id='arrival-date' innerRef={arrivalDateTimeInput}>Arrival Date: </DateTimeInput>
                    </div>
                    <div className='col-sm'>
                    <StringInput id='departure-airport' innerRef={departureAirportInput}>Departure Airport: </StringInput>
                    </div>
                    <div className='col-sm'>
                    <StringInput id='arrival-airport' innerRef={arrivalAirportInput}>Arrival Airport: </StringInput>
                    </div>
                    <div className='col-sm'>
                    <NumberInput id='current-passengers' innerRef={currPassengersInput} minValue={0}>Curr Passengers: </NumberInput>
                    </div>
                    <div className='col-sm'>
                    <NumberInput id='passenger-limit' innerRef={passengerLimitInput} minValue={1}>Passenger Limit: </NumberInput>
                    </div>
                </div>
                <div className='col-sm'>
                    <FormError id='error'>{error}</FormError>
                </div>
                <div style={{gap: '20px', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FormButton onClick={saveNewFlight} text='Save' />
                    <FormButton onClick={clearInputs} text='Clear' />
                </div>
            </div>
        </Form>
    );
}