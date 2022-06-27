import axios from 'axios';
import { useEffect, useState } from 'react';
import { AppFlightList } from '../features';
import { AppNewFlightForm } from '../features';

export const Flights = () => {

    // state for current flights in database
    const [currFlights, setCurrFlights] = useState([]);

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
            <div style={{ backgroundColor: 'lightgray', padding: '1em 1.5em', textAlign: 'center' }}>
                <AppNewFlightForm updateFlights={updateFlights}/>
            </div>
            <div style={{backgroundColor: 'red', padding: '1em 1.5em', textAlign: 'center', marginBottom: '15px'}}>
                Filter Container
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                <AppFlightList flights={currFlights} updateFlights={updateFlights} />
            </div>
        </>
    );
}