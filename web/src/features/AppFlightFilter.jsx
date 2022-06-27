import { DateTimeInput, NumberInput, StringInput, FormButton, FormError } from '../components/Form';

export const AppFlightFilter = () => {
    return(
        <form onSubmit={() => false}>
            <NumberInput id='flight-num' minValue={1}>Flight Number: </NumberInput>
            <DateTimeInput id='departure-date'>Departure Date: </DateTimeInput>
            <DateTimeInput id='arrival-date'>Arrival Date: </DateTimeInput>
            <StringInput id='departure-airport'>Departure Airport: </StringInput>
            <StringInput id='arrival-airport'>Arrival Airport: </StringInput>
            <NumberInput id='current-passengers' minValue={0}>Current Passengers: </NumberInput>
            <NumberInput id='passenger-limit' minValue={1}>Passenger Limit: </NumberInput>
            <FormButton />
            <FormError id='error'></FormError>
        </form>
    );
}