const mongoose = require('mongoose');

const alertSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Unread', 'Read', 'Resolved', 'Ignored', 'Machine Stopped'],
        default: 'Unread'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Alert', alertSchema);
