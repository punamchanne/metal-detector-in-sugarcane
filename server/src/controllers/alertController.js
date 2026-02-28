const asyncHandler = require('express-async-handler');
const Alert = require('../models/alertModel');

// @desc    Get all alerts for user dashboard
// @route   GET /api/alerts
// @access  Private
const getAlerts = asyncHandler(async (req, res) => {
    // Assuming alerts are global for now; in full prod could be tied to user/device
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(20);
    res.json(alerts);
});

module.exports = {
    getAlerts
};
