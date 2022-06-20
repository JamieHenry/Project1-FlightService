import axios from 'axios';
import { DateTimeInput, NumberInput, StringInput, FormButton, FormError } from '../components/FormComponent'

export const validInputs = inputs => {
    for (let inp in inputs) {
        if (inputs[inp] === '') return {valid: false, msg: 'Missing Input'};
    }

    const [departureDate, departureTime] = convertDateTime(inputs.departureDateTime);
    const [arrivalDate, arrivalTime] = convertDateTime(inputs.arrivalDateTime);

    if (!validDates(departureDate, arrivalDate)) return { valid: false, msg: 'Invalid Date' };
    if (!validTimes(departureDate, arrivalDate, departureTime, arrivalTime)) return { valid: false, msg: 'Invalid Time' };
    if (parseInt(inputs.currPassengers) > parseInt(inputs.passengerLimit)) return { valid: false, msg: 'Invalid Passenger Count' };
    if (inputs.departureAirport === inputs.arrivalAirport) return { valid: false, msg: 'Invalid Airports' };

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

export const validDates = (departureDate, arrivalDate) => {
    const [departureMonth, departureDay, departureYear] = departureDate.split('/');
    const [arrivalMonth, arrivalDay, arrivalYear] = arrivalDate.split('/');

    if (arrivalYear < departureYear) return false;
    if (arrivalMonth < departureMonth && arrivalYear === departureYear) return false;
    if (arrivalDay < departureDay && arrivalMonth === departureMonth) return false;

    return true;
}

export const validTimes = (departureDate, arrivalDate, departureTime, arrivalTime) => {
    const [departureMonth, departureDay, departureYear] = departureDate.split('/');
    const [arrivalMonth, arrivalDay, arrivalYear] = arrivalDate.split('/');
    const [departureTimeVal, departureAmPm] = departureTime.split(' ');
    const [arrivalTimeVal, arrivalAmPm] = arrivalTime.split(' ');
    const [departureHour, departureMin] = departureTimeVal.split(':');
    const [arrivalHour, arrivalMin] = arrivalTimeVal.split(':');

    if (departureMonth === arrivalMonth && departureDay === arrivalDay && departureYear === arrivalYear) {
        if (arrivalHour < departureHour && arrivalAmPm === departureAmPm) return false;
        if (arrivalMin <= departureMin && arrivalHour === departureHour) return false;
    }

    return true;
}

export const AppNewFlightForm = () => {

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

        const validInputObj = validInputs(inputs);
        if (validInputObj.valid === false) {
            document.getElementById('error').innerText = validInputObj.msg;
            return;
        }

        axios.post('http://localhost:8080/flights', validInputObj.newFlight)
            .then(() => {
                window.location.reload(false);

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
                document.getElementById('error').innerText = 'Database Error';
            });
    }   

    return(
        <form onSubmit={'return false'}>
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