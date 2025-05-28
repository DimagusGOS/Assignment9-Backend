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

// GET /flights no.2 commented out here
router.get('/', (req, res) => {
res.json(flights);
console.log(req);
});

module.exports = router;