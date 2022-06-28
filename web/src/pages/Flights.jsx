import axios from 'axios';
import { useEffect, useState } from 'react';
import { Center } from '../pages/Error';
import { DropDownButton } from '../components/DropDownButton/DropDownButton';
import { AppFlightList, AppNewFlightForm, AppFlightFilter } from '../features';

export const Flights = () => {

    // state for current flights in database
    const [allFlights, setAllFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // apply filters to current flights and set state
    const filterFlights = filters => {
        let currFilteredFlights = allFlights;
        for (let prop in filters) {
            if (filters[prop] !== '') {
                let filterVal = filters[prop];
                switch(prop) {
                    case 'startDate':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return compareDates(flight.departureDate, filterVal);
                        });
                        break;
                    case 'startTime':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return compareTimes(flight.departureTime, filterVal);
                        });
                        break;
                    case 'endDate':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return compareDates(filterVal, flight.arrivalDate);
                        });
                        break;
                    case 'endTime':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return compareDates(filterVal, flight.arrivalTime);
                        });
                        break;
                    case 'departureAirport':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return flight.departureAirport === filterVal;
                        });
                        break;
                    case 'arrivalAirport':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return flight.arrivalAirport === filterVal;
                        });
                        break;
                    case 'availableSeats':
                        currFilteredFlights = currFilteredFlights.filter(flight => {
                            return (flight.passengerLimit - flight.currPassengers) >= filterVal;
                        });
                        break;
                }
            }
        }
        setFilteredFlights(currFilteredFlights);
    }

    // return true if first date value comes after second date value (greater than)
    const compareDates = (date1, date2) => {
        const [monthValue, dayValue, yearValue] = date1.split('/');
        const [monthFilter, dayFilter, yearFilter] = date2.split('/');

        if (yearValue > yearFilter) return true;
        if (monthValue > monthFilter && yearValue === yearFilter) return true;
        if (dayValue >= dayFilter && monthValue === monthFilter && yearValue === yearFilter) return true;
    
        return false;
    }

    // return true if first time value comes after second time value (greater than)
    const compareTimes = (time1, time2) => {
        let [hourMinValue, amPmValue] = time1.split(' ');
        let [filterHourMin, filterAmPm] = time2.split(' ');
        let [hourValue, minValue] = hourMinValue.split(':');
        let [filterHour, filterMin] = filterHourMin.split(':');

        if (amPmValue === 'PM') hourValue = parseInt(hourValue) + 12;
        if (filterAmPm === 'PM') filterHour = parseInt(filterHour) + 12;
        if (amPmValue === 'AM' && hourValue === '12') hourValue = 0;
        if (filterAmPm === 'AM' && filterHour === '12') filterHour = 0;

        if (hourValue > filterHour) return true;
        if (minValue >= filterMin && hourValue === filterHour) return true;

        return false;
    }

    // update current flights and set state
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
            <div style={{ borderBottom: '2px solid', backgroundColor: 'lightgray', padding: '1em 1.5em', textAlign: 'center' }}>
                <Center>
                    <h3>Create New Flight</h3>
                    <DropDownButton onClick={() => setShowForm(!showForm)} />
                </Center>
                {showForm && <AppNewFlightForm updateFlights={updateFlights} />}
            </div>
            <div style={{ borderBottom: '2px solid', backgroundColor: 'lightgray', padding: '1em 1.5em', textAlign: 'center', marginBottom: '15px'}}>
            <Center>
                    <h3>Filter Flights</h3>
                    <DropDownButton onClick={() => setShowFilters(!showFilters)} />
                </Center>
                {showFilters && <AppFlightFilter filterFlights={filterFlights} updateFlights={updateFlights} />}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                <AppFlightList flights={filteredFlights} updateFlights={updateFlights} />
            </div>
        </>
    );
}