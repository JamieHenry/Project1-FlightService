import axios from 'axios';
import { useEffect, useState } from 'react';
import { Center } from '../pages/Error';
import { DropDownButton } from '../components/DropDownButton/DropDownButton';
import { AppFlightList, AppNewFlightForm, AppFlightFilter } from '../features';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * 
 * @returns - main component that holds flight list, new flight form, flight filter form
 */
export const Flights = () => {

    // state for current flights in database
    const [allFlights, setAllFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    /**
     * take in filters object and apply appropiate filters to flight list
     * 
     * @param {Object} filters - JSON of filters with their values
     */
    const filterFlights = filters => {
        // initialize flight list
        let currFilteredFlights = allFlights;

        // loop through all props in filters object and check if not null ('')
        // get filter's prop's value and filter array based on appropiate filter
        for (let prop in filters) {
            if (filters[prop] !== '') {
                let filterVal = filters[prop];
                switch(prop) {
                    // filter departure dates that come after filter value
                    case 'startDate':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return compareDates(flight.departureDate, filterVal);
                        });
                        break;
                    // filter departure times that come after filter value
                    case 'startTime':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return compareTimes(flight.departureTime, filterVal);
                        });
                        break;
                    // filter arrival dates that come before filter value
                    case 'endDate':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return compareDates(filterVal, flight.arrivalDate);
                        });
                        break;
                    // filter arrival times that come before filter value
                    case 'endTime':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return compareDates(filterVal, flight.arrivalTime);
                        });
                        break;
                    // filter departure airports that are equivalent to filter value
                    case 'departureAirport':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return flight.departureAirport === filterVal;
                        });
                        break;
                    // filter arrival airports that are equivalent to filter value
                    case 'arrivalAirport':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return flight.arrivalAirport === filterVal;
                        });
                        break;
                    // filter available seats that are greater than or equal to filter value
                    case 'availableSeats':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return (flight.passengerLimit - flight.currPassengers) >= filterVal;
                        });
                        break;
                    default:
                        break;
                }
            }
        }
        // set filtered flights to be passed to components
        setFilteredFlights(currFilteredFlights);
    }

    /**
     * compares if first date value comes 
     *      after second date value (greater than)
     * 
     * @param {String} date1 
     * @param {String} date2 
     * @returns - true if date1 >= date2, false otherwise
     */
    const compareDates = (date1, date2) => {
        const [monthValue, dayValue, yearValue] = date1.split('/');
        const [monthFilter, dayFilter, yearFilter] = date2.split('/');

        if (yearValue > yearFilter) return true;
        if (monthValue > monthFilter && yearValue === yearFilter) return true;
        if (dayValue >= dayFilter && monthValue === monthFilter && yearValue === yearFilter) return true;
    
        return false;
    }

    /**
     * compares if first time value comes 
     *      after or is equal to second time value (greater than)
     * 
     * @param {String} time1 - format: 'hh:mm (A|P)M'
     * @param {String} time2 - format: 'hh:mm (A|P)M'
     * @returns - true if time1 >= time2, false otherwise
     */
    const compareTimes = (time1, time2) => {
        let [hourMinValue, amPmValue] = time1.split(' ');
        let [filterHourMin, filterAmPm] = time2.split(' ');
        let [hourValue, minValue] = hourMinValue.split(':');
        let [filterHour, filterMin] = filterHourMin.split(':');

        // correct PM times by adding 12 hours
        // also catch 12 AM time by making it have a value of 0
        if (amPmValue === 'PM') hourValue = parseInt(hourValue) + 12;
        if (filterAmPm === 'PM') filterHour = parseInt(filterHour) + 12;
        if (amPmValue === 'AM' && hourValue === '12') hourValue = 0;
        if (filterAmPm === 'AM' && filterHour === '12') filterHour = 0;

        if (hourValue > filterHour) return true;
        if (minValue >= filterMin && hourValue === filterHour) return true;

        return false;
    }

    // update current/filtered flights and set state
    const updateFlights = () => {
        axios.get('http://localhost:8080/flights')
            .then(res => {
                setAllFlights(res.data);
                setFilteredFlights(res.data);
            });
    }

    // component mounting
    useEffect(() => {
        updateFlights();
    }, []);

    return (
        <>
            <div style={{ borderBottom: '2px solid', backgroundColor: '#E9E9E9', padding: '1em 1.5em', textAlign: 'center' }}>
                <Center>
                    <h3>Create New Flight</h3>
                    <DropDownButton onClick={() => setShowForm(!showForm)} />
                </Center>
                {showForm && <AppNewFlightForm updateFlights={updateFlights} />}
            </div>
            <div style={{ borderBottom: '2px solid', backgroundColor: '#E9E9E9', padding: '1em 1.5em', textAlign: 'center', marginBottom: '15px'}}>
            <Center>
                    <h3>Filter Flights</h3>
                    <DropDownButton onClick={() => { updateFlights(); setShowFilters(!showFilters); }} />
                </Center>
                {showFilters && <AppFlightFilter filterFlights={filterFlights} updateFlights={updateFlights} />}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                <AppFlightList flights={filteredFlights} updateFlights={updateFlights} />
            </div>
        </>
    );
}