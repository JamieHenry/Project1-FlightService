import { DateInput, NumberInput, StringInput, FormButton, TimeInput } from '../components/Form';
import { useState } from 'react';
import { XButton } from '../components/XButton';

export const AppFlightFilter = ({ filterFlights, updateFlights }) => {
    
    const [currFilters, setCurrFilters] = useState({});
    const [filtersActive, setFiltersActive] = useState(false);
    const [startDateFilter, setStartDateFilter] = useState('');
    const [startTimeFilter, setStartTimeFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [endTimeFilter, setEndTimeFilter] = useState('');
    const [departureAirportFilter, setDepartureAirportFilter] = useState('');
    const [arrivalAirportFilter, setArrivalAirportFilter] = useState('');
    const [availableSeatsFilter, setAvailableSeatsFilter] = useState('');

    const applyFilters = e => {
        e.preventDefault();
        let startDate = (startDateFilter !== '') ? startDateFilter : document.getElementById('start-date-filter').value;
        let endDate = (endDateFilter !== '') ? endDateFilter : document.getElementById('end-date-filter').value;
        let startTime = (startTimeFilter !== '') ? startTimeFilter : document.getElementById('start-time-filter').value;
        let endTime = (endTimeFilter !== '') ? endTimeFilter : document.getElementById('end-time-filter').value;
        
        if (startDate !== '' && startDate.includes('-')) {
            startDate = convertDate(startDate);
        }
        if (endDate !== '' && endDate.includes('-')) {
            endDate = convertDate(endDate);
        }
        if (startTime !== '' && !startTime.includes('M')) {
            startTime = convertTime(startTime);
        }
        if (endTime !== '' && !endTime.includes('M')) {
            endTime = convertTime(endTime);
        }
        
        const filters = {
            startDate,
            startTime,
            endDate,
            endTime,
            departureAirport: (departureAirportFilter !== '') ? departureAirportFilter : document.getElementById('departure-airport-filter').value,
            arrivalAirport: (arrivalAirportFilter !== '') ? arrivalAirportFilter : document.getElementById('arrival-airport-filter').value,
            availableSeats: (availableSeatsFilter !== '') ? availableSeatsFilter : document.getElementById('available-seats-filter').value
        };

        for (let prop in filters) {
            if (filters[prop] !== '') setFiltersActive(true);
        }

        filterFlights(filters);
        setCurrFilters(filters);

        setStartDateFilter(filters.startDate);
        setStartTimeFilter(filters.startTime);
        setEndDateFilter(filters.endDate);
        setEndTimeFilter(filters.endTime);
        setDepartureAirportFilter(filters.departureAirport);
        setArrivalAirportFilter(filters.arrivalAirport);
        setAvailableSeatsFilter(filters.availableSeats);
        document.getElementById('start-date-filter').value = null;
        document.getElementById('end-date-filter').value = null;
        document.getElementById('start-time-filter').value = null;
        document.getElementById('end-time-filter').value = null;
        document.getElementById('departure-airport-filter').value = null;
        document.getElementById('arrival-airport-filter').value = null;
        document.getElementById('available-seats-filter').value = null;
    }

    const clearAllFilters = e => {
        e.preventDefault();
        updateFlights();
        setFiltersActive(false);
        setStartDateFilter('');
        setStartTimeFilter('');
        setEndDateFilter('');
        setEndTimeFilter('');
        setDepartureAirportFilter('');
        setArrivalAirportFilter('');
        setAvailableSeatsFilter('');
    }

    const clearOneFilter = filterCleared => {
        let filters = currFilters;

        filters[filterCleared] = '';
        setCurrFilters(filters);
        filterFlights(filters);

        switch (filterCleared) {
            case 'startDate':
                setStartDateFilter('');
                break;
            case 'startTime':
                setStartTimeFilter('');
                break;
            case 'endDate':
                setEndDateFilter('');
                break;
            case 'endTime':
                setEndTimeFilter('');
                break;
            case 'departureAirport':
                setDepartureAirportFilter('');
                break;
            case 'arrivalAirport':
                setArrivalAirportFilter('');
                break;
            case 'availableSeats':
                setAvailableSeatsFilter('');
                break;
        }

        for (let prop in filters) {
            if (filters[prop] !== '') return;
        }

        setFiltersActive(false);
    }

    const convertDate = date => {
        let [year, month, day] = date.split('-');

        return `${month}/${day}/${year}`;
    }

    const convertTime = time => {
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

        return time;
    }

    return(
        <>
            <form onSubmit={() => false}>
                <DateInput id='start-date-filter'>Start Date: </DateInput>
                <TimeInput id='start-time-filter'>Departure Time: </TimeInput>
                <DateInput id='end-date-filter'>End Date: </DateInput>
                <TimeInput id='end-time-filter'>Arrival Time: </TimeInput>
                <StringInput id='departure-airport-filter'>Departure Airport: </StringInput>
                <StringInput id='arrival-airport-filter'>Arrival Airport: </StringInput>
                <NumberInput id='available-seats-filter' minValue={1}>Available Seats: </NumberInput>
                <FormButton onClick={applyFilters} text='Apply' />
                <FormButton onClick={clearAllFilters} text='Clear' />
            </form>
            <div>
                {filtersActive && <h3>Active Filters: </h3>}
                {startDateFilter && 
                    <h6>
                        Start Date: {startDateFilter}
                        <XButton onClick={e => {e.preventDefault(); clearOneFilter('startDate')}} />
                    </h6>    
                }
                {startTimeFilter && 
                    <h6>
                        Start Time: {startTimeFilter}
                        <XButton onClick={e => {e.preventDefault(); clearOneFilter('startTime')}} />
                    </h6>
                }
                {endDateFilter && 
                    <h6>
                        End Date: {endDateFilter}
                        <XButton onClick={e => {e.preventDefault(); clearOneFilter('endDate')}} />
                    </h6>
                }
                {endTimeFilter && 
                    <h6>
                        End Time: {endTimeFilter}
                        <XButton onClick={e => {e.preventDefault(); clearOneFilter('endTime')}} />
                    </h6>
                }
                {departureAirportFilter && 
                    <h6>
                        Departure Airport: {departureAirportFilter}
                        <XButton onClick={e => {e.preventDefault(); clearOneFilter('departureAirport')}} />
                    </h6>
                }
                {arrivalAirportFilter && 
                    <h6>
                        Arrival Airport: {arrivalAirportFilter}
                        <XButton onClick={e => {e.preventDefault(); clearOneFilter('arrivalAirport')}} />
                    </h6>
                }
                {availableSeatsFilter && 
                    <h6>
                        Available Seats: {availableSeatsFilter}
                        <XButton onClick={e => {e.preventDefault(); clearOneFilter('availableSeats')}} />
                    </h6>
                }
            </div>
        </>
    );
}