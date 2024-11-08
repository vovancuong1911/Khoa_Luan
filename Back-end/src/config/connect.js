const Mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await Mongoose.connect('mongodb://localhost:27017/Ai', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

module.exports = connectDB;
