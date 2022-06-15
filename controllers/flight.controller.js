const Flight = require('../models/Flight.model');

const findAllFlights = async () => {
    const flights = await Flight.find();
    return flights;
}

const createFlight = async ({ flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, currPassengers, passengerLimit }) => {
    try {
        if (currPassengers > passengerLimit) {
            throw { message: 'Current # passengers exceeds passenger limit' };
        }
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

const updateFlight = async ({ flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, currPassengers, passengerLimit }) => {
    try {
        if (currPassengers > passengerLimit) {
            throw { message: 'Current # passengers exceeds passenger limit' };
        }
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
        const updatedFlight = await Flight.findOneAndUpdate({ flightNumber } , updates, { new: true });
        return updatedFlight;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

const deleteFlight = async flightNumber => {
    try {
        const deletedFlight = await Flight.deleteOne({ flightNumber });
        return deletedFlight;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

module.exports = { findAllFlights, createFlight, updateFlight, deleteFlight };