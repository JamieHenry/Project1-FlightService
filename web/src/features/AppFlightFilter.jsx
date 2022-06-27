import { convertFromDateTime } from './AppNewFlightForm';
import { DateTimeInput, NumberInput, StringInput, FormButton, FormError } from '../components/Form';
import { useState } from 'react';

export const AppFlightFilter = ({ filterFlights, updateFlights }) => {
    
    const [activeFilters, setActiveFilters] = useState();

    const applyFilters = e => {
        e.preventDefault();
        let startDateTime = document.getElementById('start-date-filter').value;
        let endDateTime = document.getElementById('end-date-filter').value;
        let startDate = '', startTime = '', endDate = '', endTime = '';
        
        if (startDateTime !== '') {
            [startDate, startTime] = convertFromDateTime(startDateTime);
        }
        if (endDateTime !== '') {
            [endDate, endTime] = convertFromDateTime(endDateTime);
        }
        
        const filters = {
            startDate,
            startTime,
            endDate,
            endTime,
            departureAirport: document.getElementById('departure-airport-filter').value,
            arrivalAirport: document.getElementById('arrival-airport-filter').value,
            availableSeats: document.getElementById('available-seats-filter').value
        };

        filterFlights(filters);
        setActiveFilters(filters);

        document.getElementById('start-date-filter').value = null;
        document.getElementById('end-date-filter').value = null;
        document.getElementById('departure-airport-filter').value = null;
        document.getElementById('arrival-airport-filter').value = null;
        document.getElementById('available-seats-filter').value = null;
    }

    const clearFilters = e => {
        e.preventDefault();
        updateFlights();
    }

    return(
        <form onSubmit={() => false}>
            <DateTimeInput id='start-date-filter'>Start Date: </DateTimeInput>
            <DateTimeInput id='end-date-filter'>End Date: </DateTimeInput>
            <StringInput id='departure-airport-filter'>Departure Airport: </StringInput>
            <StringInput id='arrival-airport-filter'>Arrival Airport: </StringInput>
            <NumberInput id='available-seats-filter' minValue={1}>Available Seats: </NumberInput>
            <FormButton onClick={applyFilters} text='Apply' />
            <FormButton onClick={clearFilters} text='Clear' />
        </form>
    );
}