const router = require('express').Router();
const { findAllFlights, createFlight, updateFlight, deleteFlight } = require('../controllers/flight.controller');

// GET - return all flights
/**
 * @swagger
 * /flights:
 *      get:
 *          description: Get all flights
 *          tags:
 *          - flight
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
 *  @swagger
 * /flights:
 *      post:
 *          description: Create a new flight
 *          tags:
 *          - flight
 *          parameters:
 *          - in: body
 *            name: request
 *            schema: 
 *              type: object
 *              required:
 *              - flightNumber
 *              - departureDate
 *              - arrivalDate
 *              - departureTime
 *              - arrivalTime
 *              - departureAirport
 *              - arrivalAirport
 *              - currPassengers
 *              - passengerLimit
 *              properties:
 *                  flightNumber:
 *                      type: number
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
 *                      type: number
 *                  passengerLimit:
 *                      type: number
 *          responses:
 *              200:
 *                  description: Success
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
 *  @swagger
 * /flights:
 *      put:
 *          description: Update flight specified by flightNumber field
 *          tags:
 *          - flight
 *          parameters:
 *          - in: body
 *            name: request
 *            schema: 
 *              type: object
 *              required:
 *              - flightNumber
 *              - departureDate
 *              - arrivalDate
 *              - departureTime
 *              - arrivalTime
 *              - departureAirport
 *              - arrivalAirport
 *              - currPassengers
 *              - passengerLimit
 *              properties:
 *                  flightNumber:
 *                      type: number
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
 *                      type: number
 *                  passengerLimit:
 *                      type: number
 *          responses:
 *              200:
 *                  description: Success
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
 *  @swagger
 * /flights/{id}:
 *      delete:
 *          description: Delete a flight specified by flightNumber field
 *          tags:
 *          - flight
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
        res.status(201).json({ deletedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// export router for require statements
module.exports = router;