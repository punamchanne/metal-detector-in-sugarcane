const mongoose = require('mongoose');

const detectionSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    metalType: {
        type: String,
        enum: ['Ferrous', 'Non-Ferrous', 'Unknown'],
        default: 'Unknown'
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Detected', 'Start', 'Stop', 'Resolved'],
        default: 'Detected'
    },
    sensorId: {
        type: String,
        required: true
    },
    location: {
        type: String, // e.g., "Conveyor Belt 1"
        default: "Main Line"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Detection', detectionSchema);
