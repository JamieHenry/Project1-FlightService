const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const flightAPI = require('./routes/flight.route');
const cors = require('cors');
require('dotenv').config();

// create app and set port w/ default 8080
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

// set up swagger docs
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project1-FlightService',
            version: '1.0.0',
            contact: {
                name: 'FlightService App',
                url: 'http://localhost:3000'
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsDoc(options);

// middleware
app.use(cors());
app.use(express.json());
app.use('/flights', flightAPI);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// database connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => {
        console.err(err);
        process.exit(1);
    });

// run server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));