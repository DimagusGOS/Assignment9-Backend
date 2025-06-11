const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const flightsRouter = require('./routes/flights');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/flights', flightsRouter);
app.listen(4000, () => {
    console.log('REST API running at http://localhost:4000');
});