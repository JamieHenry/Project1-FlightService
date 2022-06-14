const Flight = require('../models/Flight.model');

const findAllFlights = async () => {
    const flights = await Flight.find();
    return flights;
}

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

const updateFlight = async ({ _id, flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, currPassengers, passengerLimit }) => {
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
        const updatedFlight = await Flight.findByIdAndUpdate(_id, updates, { new: true });
        return updatedFlight;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

const deleteFlight = async id => {
    try {
        const deletedFlight = await Flight.findByIdAndDelete(id);
        return deletedFlight;
    } catch (err) {
        throw { status: 400, message: err.message };
    }
}

module.exports = { findAllFlights, createFlight, updateFlight, deleteFlight };