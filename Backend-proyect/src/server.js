const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
});

// Routes
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Trying another port...`);
        const alternativeServer = app.listen(0, () => {
            console.log(`Server is running on port ${alternativeServer.address().port}`);
        });
    } else {
        console.error('Server error:', err);
    }
});
