const router = require('express').Router();
const { findAllFlights, createFlight, updateFlight, deleteFlight } = require('../controllers/flight.controller');

// Schema setup for swagger docs
/**
 * @swagger
 * components:
 *      schemas:
 *          Flight:
 *              type: object
 *              required:
 *                  - flightNumber
 *                  - departureDate
 *                  - arrivalDate
 *                  - departureTime
 *                  - arrivalTime
 *                  - departureAirport
 *                  - arrivalAirport
 *                  - currPassengers
 *                  - passengerLimit
 *              properties:
 *                  flightNumber:
 *                      type: integer
 *                  departureDate:
 *                      type: string
 *                  arrivalDate:
 *                      type: string
 *                  departureTime:
 *                      type: string
 *                  arrivalTime:
 *                      type: string
 *                  departureAirport:
 *                      type: string
 *                  arrivalAirport:
 *                      type: string
 *                  currPassengers:
 *                      type: integer
 *                  passengerLimit:
 *                      type: integer
 *              example:
 *                  flightNumber: 123
 *                  departureDate: 06/23/2022
 *                  arrivalDate: 06/23/2022
 *                  departureTime: 09:00 AM
 *                  arrivalTime: 03:56 PM
 *                  departureAirport: MCO
 *                  arrivalAirport: HNL
 *                  currPassengers: 17
 *                  passengerLimit: 125
 */

// GET - return all flights
/**
 * @swagger
 * /flights:
 *      get:
 *          summary: Gets all flights
 *          tags:
 *          - Flights
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: Failure
 */
router.get('/', async (req, res) => {
    const flights = await findAllFlights();
    res.status(200).json(flights);
});

// POST - create a new flight
/**
 * @swagger
 * /flights:
 *      post:
 *          summary: Creates a new flight
 *          tags:
 *          - Flights
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Flight'
 *          responses:
 *              200:
 *                  description: Success
 *              201:
 *                  description: Created
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: Failure
 */
router.post('/', async (req, res) => {
    try {
        const _id = await createFlight(req.body);
        res.status(201).json({ _id });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// PUT - update a flight
/**
 * @swagger
 * /flights:
 *      put:
 *          summary: Updates flight specified by flightNumber field
 *          tags:
 *          - Flights
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Flight'
 *          responses:
 *              200:
 *                  description: Success
 *              201:
 *                  description: Created
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: Failure
 */
router.put('/', async (req, res) => {
    try {
        const updatedFlight = await updateFlight(req.body);
        res.status(201).json({ updatedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// DELETE - delete a specific flight
//        - identified with Flight Number
/**
 * @swagger
 * /flights/{id}:
 *      delete:
 *          summary: Deletes a flight specified by flightNumber field
 *          tags:
 *          - Flights
 *          parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *              required: true
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              404:
 *                  description: Failure
 */
router.delete('/:flightNo', async (req, res) => {
    try {
        const deletedFlight = await deleteFlight(req.params.flightNo);
        res.status(200).json({ deletedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// export router for require statements
module.exports = router;