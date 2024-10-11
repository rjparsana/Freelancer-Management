const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI; // Get URI from environment variable
    if (!uri) {
        console.error('MongoDB URI not found in environment variables');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
