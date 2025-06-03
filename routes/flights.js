const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
let flights = require('../data/flights');

const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, try again later.'
});

router.use(limiter);

express().use(express.json());
express().use(express.urlencoded({extended: false}));

// // GET /flights no.2 commented out here
// router.get('/', (req, res) => {
//     res.json(flights);
//     console.log(req);
// });

// GET /flights?from=YVR&to=YYZ&page=1&limit=5
router.get('/', (req, res) => {
    const { from, to } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    let filtered = flights;
    if (from) {
        filtered = filtered.filter(f =>
            f.from.toLowerCase() === from.toLowerCase()
        );
    }
    if (to) {
        filtered = filtered.filter(f =>
            f.to.toLowerCase() === to.toLowerCase()
        );
    }
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    res.json({
        total: filtered.length,
        page,
        limit,
        data: paginated
    });
});

// GET /flights/1
router.get('/:id', (req, res) => {
    const flight = flights.find(f => String(f.id) === req.params.id);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });
    res.json(flight);
});

// POST /flights
router.post(
    '/',
    body('from').notEmpty(),
    body('to').notEmpty(),
    body('price').isNumeric(),
    body('airline').notEmpty(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({
            errors:
                errors.array()
        });
        const newFlight = { id: Date.now(), ...req.body };
        flights.push(newFlight);
        res.status(201).json(newFlight);
    }
);

module.exports = router;