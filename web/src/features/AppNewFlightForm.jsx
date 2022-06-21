import axios from 'axios';
import { DateTimeInput, NumberInput, StringInput, FormButton, FormError } from '../components/Form'

export const validateInputs = inputs => {
    for (let field in inputs) {
        if (inputs[field] === '') return {valid: false, msg: 'Missing Input'};
    }

    const [departureDate, departureTime] = convertDateTime(inputs.departureDateTime);
    const [arrivalDate, arrivalTime] = convertDateTime(inputs.arrivalDateTime);

    if (arrivalDate < departureDate) return { valid: false, msg: 'Invalid Date' };
    if (arrivalTime <= departureTime && arrivalDate === departureDate) return { valid: false, msg: 'Invalid Time' };
    if (parseInt(inputs.currPassengers) > parseInt(inputs.passengerLimit)) return { valid: false, msg: 'Invalid Passenger Count' };
    if (inputs.departureAirport === inputs.arrivalAirport || inputs.departureAirport.length < 3 || inputs.arrivalAirport.length < 3) return { valid: false, msg: 'Invalid Airports' };

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

export const convertDateTime = dateTime => {
    let [date, time] = dateTime.split('T');
    let [year, month, day] = date.split('-');

    date = `${month}/${day}/${year}`;
    let [hour, min] = time.split(':');

    if (hour > 12) {
        hour -= 12;
        time = hour >= 10 ? `${hour}:${min} PM` : `0${hour}:${min} PM`;
    } else {
        time = `${hour}:${min} AM`;
    }

    return [date, time];
}

export const AppNewFlightForm = ({ updateFlights }) => {

    const saveNewFlight = e => {
        e.preventDefault();
        document.getElementById('error').innerText = null;

        const inputs = {
            flightNumber: document.getElementById('flight-num').value,
            departureDateTime: document.getElementById('departure-date').value,
            arrivalDateTime: document.getElementById('arrival-date').value,
            departureAirport: document.getElementById('departure-airport').value,
            arrivalAirport: document.getElementById('arrival-airport').value,
            currPassengers: document.getElementById('current-passengers').value,
            passengerLimit: document.getElementById('passenger-limit').value
        };

        const validationResult = validateInputs(inputs);
        if (validationResult.valid === false) {
            document.getElementById('error').innerText = validationResult.msg;
            return;
        }

        axios.post('http://localhost:8080/flights', validationResult.newFlight)
            .then(() => {
                updateFlights();

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
            <FormButton onClick={saveNewFlight} />
            <FormError id='error'></FormError>
        </form>
    );
}