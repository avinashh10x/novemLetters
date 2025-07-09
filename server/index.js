require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./utils/Db');
const createRequiredDirectories = require('./utils/createDirectories');
const letterRoutes = require('./routes/letterRoutes');

const app = express();

// Create required directories
createRequiredDirectories();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDb();

// Routes
app.use('/api', letterRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Home Route
app.get('/', (req, res) => {
    res.send('This is home route');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
