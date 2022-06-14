const router = require('express').Router();
const { findAllFlights, createFlight, updateFlight, deleteFlight } = require('../controllers/flight.controller');

router.get('/', async (req, res) => {
    const flights = await findAllFlights();
    res.status(200).json(flights);
});

router.post('/', async (req, res) => {
    try {
        const _id = await createFlight(req.body);
        res.status(201).json({ _id });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedFlight = await updateFlight(req.body);
        res.status(201).json({ updatedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedFlight = await deleteFlight(req.params.id);
        res.status(201).json({ deletedFlight });
    } catch (err) {
        res.status(err?.status || 500).json(err);
    }
});

module.exports = router;