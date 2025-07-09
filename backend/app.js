require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json()); // Allows parsing of JSON data in request bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing (important for frontend communication)

// --- Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();

// --- Basic Route (for testing if server is running) ---
app.get('/', (req, res) => {
    res.send('API is running...');
});

// --- Define Routes (placeholder for now) ---
app.use('/api/auth', require('./routes/auth'));

// --- Start Server ---
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));