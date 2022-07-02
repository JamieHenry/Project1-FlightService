import { DateInput, NumberInput, StringInput, FormButton, TimeInput } from '../components/Form';
import { useState } from 'react';
import { XButton } from '../components/XButton';
import { useRef } from 'react';

/**
 * filter form for filtering out the flight list being displayed
 * 
 * @params - destructured functions for filtering and updating flight list
 * @returns - filter form component
 */
export const AppFlightFilter = ({ filterFlights, updateFlights }) => {
    
    // states for all filters
    const [currFilters, setCurrFilters] = useState({});
    const [filtersActive, setFiltersActive] = useState(false);
    const [startDateFilter, setStartDateFilter] = useState('');
    const [startTimeFilter, setStartTimeFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [endTimeFilter, setEndTimeFilter] = useState('');
    const [departureAirportFilter, setDepartureAirportFilter] = useState('');
    const [arrivalAirportFilter, setArrivalAirportFilter] = useState('');
    const [availableSeatsFilter, setAvailableSeatsFilter] = useState('');

    // references for filter input
    const startDateInput = useRef();
    const startTimeInput = useRef();
    const endDateInput = useRef();
    const endTimeInput = useRef();
    const departureAirportInput = useRef();
    const arrivalAirportInput = useRef();
    const availableSeatsInput = useRef();

    /**
     * convert filters where necessary (date and time) and
     *      sends the filters object to filter flights function
     * 
     * @param {event} e - used to prevent default (refresh page)
     */
    const applyFilters = e => {
        e.preventDefault();

        // populate values with their previous values if they are active still
        let startDate = (startDateFilter !== '') ? startDateFilter : startDateInput.current.value;
        let endDate = (endDateFilter !== '') ? endDateFilter : endDateInput.current.value;
        let startTime = (startTimeFilter !== '') ? startTimeFilter : startTimeInput.current.value;
        let endTime = (endTimeFilter !== '') ? endTimeFilter : endTimeInput.current.value;
        
        // convert date/time values if they are not already changed or not filled in
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
        
        // create filters object to send off
        const filters = {
            startDate,
            startTime,
            endDate,
            endTime,
            departureAirport: (departureAirportFilter !== '') ? departureAirportFilter : departureAirportInput.current.value,
            arrivalAirport: (arrivalAirportFilter !== '') ? arrivalAirportFilter : arrivalAirportInput.current.value,
            availableSeats: (availableSeatsFilter !== '') ? availableSeatsFilter : availableSeatsInput.current.value
        };

        // check if any filters are active and set boolean state
        for (let prop in filters) {
            if (filters[prop] !== '') setFiltersActive(true);
        }

        // set current active filters and send filter object to filter function
        filterFlights(filters);
        setCurrFilters(filters);

        // set filters to appropiate values and reset form inputs
        setStartDateFilter(filters.startDate);
        setStartTimeFilter(filters.startTime);
        setEndDateFilter(filters.endDate);
        setEndTimeFilter(filters.endTime);
        setDepartureAirportFilter(filters.departureAirport);
        setArrivalAirportFilter(filters.arrivalAirport);
        setAvailableSeatsFilter(filters.availableSeats);
        startDateInput.current.value = null;
        endDateInput.current.value = null;
        startDateInput.current.value = null;
        endTimeInput.current.value = null;
        departureAirportInput.current.value = null;
        arrivalAirportInput.current.value = null;
        availableSeatsInput.current.value = null;
    }

    /**
     * clear all active filters and reset flight list being displayed
     * 
     * @param {Event} e - used to prevent default (refresh page)
     */
    const clearAllFilters = e => {
        e.preventDefault();

        // update flight list to be full flight list with update function
        updateFlights();

        // clear all filters and set boolean state
        setFiltersActive(false);
        setStartDateFilter('');
        setStartTimeFilter('');
        setEndDateFilter('');
        setEndTimeFilter('');
        setDepartureAirportFilter('');
        setArrivalAirportFilter('');
        setAvailableSeatsFilter('');
    }

    /**
     * clear inputted filter and set active filters accordingly
     * 
     * @param {String} filterCleared - current filter being cleared
     */
    const clearOneFilter = filterCleared => {
        let filters = currFilters;

        // change current filters object based on passed in field
        filters[filterCleared] = '';
        setCurrFilters(filters);
        filterFlights(filters);

        // reset appropiate filter based on input
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
            default:
                break;
        }

        // check if any filters are null and set boolean state to false if so
        for (let prop in filters) {
            if (filters[prop] !== '') return;
        }

        setFiltersActive(false);
    }

    /**
     * converts JavaScript input date to date format
     *      used throughout the applicaiton
     * 
     * @param {String} date - format: 'yyyy-mm-dd'
     * @returns - new date String in format: 'mm/dd/yyyy'
     */
    const convertDate = date => {
        let [year, month, day] = date.split('-');

        return `${month}/${day}/${year}`;
    }

    /**
     * converts JavaScript input time to time format
     *      used throughout the applicaiton
     * 
     * @param {String} time - format: 'hh:mm'
     * @returns - new time String in format: 'hh:mm (A|P)M'
     */
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
                <DateInput id='start-date-filter' innerRef={startDateInput}>Start Date: </DateInput>
                <TimeInput id='start-time-filter' innerRef={startTimeInput}>Departure Time: </TimeInput>
                <DateInput id='end-date-filter' innerRef={endDateInput}>End Date: </DateInput>
                <TimeInput id='end-time-filter' innerRef={endTimeInput}>Arrival Time: </TimeInput>
                <StringInput id='departure-airport-filter' innerRef={departureAirportInput}>Departure Airport: </StringInput>
                <StringInput id='arrival-airport-filter' innerRef={arrivalAirportInput}>Arrival Airport: </StringInput>
                <NumberInput id='available-seats-filter' innerRef={availableSeatsInput} minValue={1}>Available Seats: </NumberInput>
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