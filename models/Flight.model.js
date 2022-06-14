const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightNumber: {
        type: Number,
        min: [1, 'Flight Number must be greater than 0'],
        required: true,
        unique: true
    },
    departureDate: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    currPassengers: {
        type: Number,
        min: [0, 'Current # passengers must be 0 or greater'],
        required: true
    },
    passengerLimit: {
        type: Number,
        min: [1, 'Passenger limit must be greater than 0'],
        required: true
    }
});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;