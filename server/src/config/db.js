const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use environment variable or fallback to local MongoDB (Compass)
        const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/metal_detector_db';
        const conn = await mongoose.connect(dbURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Critical Fix: Drop the old 'username' index that is causing "duplicate key: null" errors
        try {
            await mongoose.connection.collection('users').dropIndex('username_1');
            console.log('Fixed: Dropped conflicting "username" index.');
        } catch (err) {
            // Index might not exist, which is fine.
            if (err.code !== 27) {
                console.log('Index drop info:', err.message);
            }
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
