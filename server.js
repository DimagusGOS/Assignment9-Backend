const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) =>
        console.error("MongoDB connection error:", err));

const express = require('express');
const flightsRouter = require('./routes/flights');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://assignment9-frontend.vercel.app', //React frontend
    credentials: true
}));
app.use('/flights', flightsRouter);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log('REST API running at http://localhost:4000');
});