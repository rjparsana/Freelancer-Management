const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Payment routes
app.use('/api', paymentRoutes);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));


app.get('/', (req, res) => {
    res.send('Freelancer Project Management System is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


