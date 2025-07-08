const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) =>
        console.error("MongoDB connection error:", err));

const express = require('express');
const cors = require('cors');
const flightsRouter = require('./routes/flights');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/flights', flightsRouter);
app.use('/api/auth', authRoutes);
app.listen(4000, () => {
    console.log('REST API running at http://localhost:4000');
});