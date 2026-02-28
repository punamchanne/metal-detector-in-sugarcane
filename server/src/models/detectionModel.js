const mongoose = require('mongoose');

const detectionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    mode: {
        type: String,
        required: true,
        enum: ['metal_detection', 'leaf_disease']
    },
    result: {
        type: String,
        required: true
    },
    confidence: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    alertTriggered: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Detection', detectionSchema);
