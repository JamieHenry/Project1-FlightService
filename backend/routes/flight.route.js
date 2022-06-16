const router = require('express').Router();
const { findAllFlights, createFlight, updateFlight, deleteFlight } = require('../controllers/flight.controller');

// GET - return all flights
router.get('/', async (req, res) => {
    const flights = await findAllFlights();
    res.status(200).json(flights);
});

// POST - create a new flight
router.post('/', async (req, res) => {
    try {
        const _id = await createFlight(req.body);
        res.status(201).json({ _id });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

// PUT - update a flight
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