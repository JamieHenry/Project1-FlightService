import axios from 'axios';
import { useEffect, useState } from 'react';
import { Center } from '../pages/Error';
import { DropDownButton } from '../components/DropDownButton/DropDownButton';
import { AppFlightList, AppNewFlightForm, AppFlightFilter } from '../features';

export const Flights = () => {

    // state for current flights in database
    const [currFlights, setCurrFlights] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // apply filters to current flights and set state
    const filterFlights = filters => {
        console.log('Filtering');
        for (let prop in filters) {
            if (filters[prop] !== '') {
                console.log(prop);
            }
        }
    }

    // update current flights and set state
    const updateFlights = () => {
        axios.get('http://localhost:8080/flights')
            .then(res => setCurrFlights(res.data));
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
                <AppFlightList flights={currFlights} updateFlights={updateFlights} />
            </div>
        </>
    );
}