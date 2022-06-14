const express = require('express');
const mongoose = require('mongoose');
const flightAPI = require('./routes/flight.route');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/flights', flightAPI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => {
        console.err(err);
        process.exit(1);
    });

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));