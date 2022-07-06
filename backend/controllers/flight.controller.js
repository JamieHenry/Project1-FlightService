const Flight = require('../models/Flight.model');

/**
 * queries all flights
 * 
 * @returns - all flights found
 */
const findAllFlights = async () => {
    const flights = await Flight.find();
    return flights;
}

/**
 * creates a new flight
 * 
 * @params - destructured Flight object 
 * @returns - newly created _id
 */
const createFlight = async ({ flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, currPassengers, passengerLimit }) => {
    try {
        const flight = new Flight({
            flightNumber,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            departureAirport,
            arrivalAirport,
            currPassengers,
            passengerLimit
        });
        await flight.save();
        return flight._id;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

/**
 * updates a Flight based on unique Flight Number
 * 
 * @params - destructured Flight object (excluding _id)
 * @returns - updated Flight object
 */
const updateFlight = async ({ flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, currPassengers, passengerLimit }) => {
    try {
        const updates = {
            flightNumber,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            departureAirport,
            arrivalAirport,
            currPassengers,
            passengerLimit
        };
        // find the Flight based on unique Flight Number, pass updates, and return the new Flight object
        const updatedFlight = await Flight.findOneAndUpdate({ flightNumber } , updates, { new: true });
        if (updatedFlight === null) throw ({message: 'Flight not found'});
        return updatedFlight;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

/**
 * deletes a flight based on the unique Flight Number
 * 
 * @param {Number} flightNumber - unique identifier field of Flight
 * @returns - mongoose object describing deletion status
 */
const deleteFlight = async flightNumber => {
    try {
        const deletedFlight = await Flight.deleteOne({ flightNumber });
        if (deletedFlight.deletedCount === 0) throw ({message: 'Flight not found'});
        return deletedFlight;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

// export functions for require statements
module.exports = { findAllFlights, createFlight, updateFlight, deleteFlight };