const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create MongoDB schema for Flights
const flightSchema = new Schema({
    // unique identifier
    flightNumber: {
        type: Number,
        min: [1, 'Flight Number must be greater than 0'],
        required: true,
        unique: true
    },
    // 'mm/dd/yyyy' format
    // ** might change to date **
    departureDate: {
        type: String,
        required: true
    },
    // 'mm/dd/yyyy' format
    // ** might change to date **
    arrivalDate: {
        type: String,
        required: true
    },
    // 'hh:mm AM/PM' format
    departureTime: {
        type: String,
        required: true
    },
    // 'hh:mm AM/PM' format
    arrivalTime: {
        type: String,
        required: true
    },
    // three letter airport code
    departureAirport: {
        type: String,
        required: true
    },
    // three letter airport code
    arrivalAirport: {
        type: String,
        required: true
    },
    // cannot exceed passenger limit, cannot be negative
    currPassengers: {
        type: Number,
        min: [0, 'Current # passengers must be 0 or greater'],
        required: true
    },
    // cannot be 0, must exceed current passengers
    passengerLimit: {
        type: Number,
        min: [1, 'Passenger limit must be greater than 0'],
        required: true
    }
});

// compile and export model for require statements
const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;