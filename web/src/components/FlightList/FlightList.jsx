import axios from 'axios';
import { useState, useEffect } from 'react';
import { AppFlightCard } from '../../features/AppFlightCard';
import 'font-awesome/css/font-awesome.min.css';

export const FlightList = () => {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/flights')
            .then(res => setFlights(res.data));
    }, []);

    return (
        <>
            {flights.map(flight => {
                return (
                    <AppFlightCard key={flight._id} flight={flight} margin='15px' />
                );
            })}
        </>
    );
}