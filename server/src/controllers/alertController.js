const asyncHandler = require('express-async-handler');
const Alert = require('../models/alertModel');

const VALID_ALERT_STATUSES = ['Unread', 'Read', 'Resolved', 'Ignored', 'Machine Stopped'];

// @desc    Get all alerts for user dashboard
// @route   GET /api/alerts
// @access  Private
const getAlerts = asyncHandler(async (req, res) => {
    // Assuming alerts are global for now; in full prod could be tied to user/device
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(20);
    res.json(alerts);
});

// @desc    Update alert status
// @route   PATCH /api/alerts/:id/status
// @access  Private
const updateAlertStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (!status || !VALID_ALERT_STATUSES.includes(status)) {
        res.status(400);
        throw new Error('Invalid alert status');
    }

    const alert = await Alert.findById(req.params.id);
    if (!alert) {
        res.status(404);
        throw new Error('Alert not found');
    }

    alert.status = status;
    const updatedAlert = await alert.save();
    res.json(updatedAlert);
});

// @desc    Trigger stop machine action for alert
// @route   POST /api/alerts/:id/stop-machine
// @access  Private
const stopMachineForAlert = asyncHandler(async (req, res) => {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
        res.status(404);
        throw new Error('Alert not found');
    }

    // Placeholder action: mark alert as handled with machine stop command.
    alert.status = 'Machine Stopped';
    const updatedAlert = await alert.save();
    res.json(updatedAlert);
});

// @desc    Ignore alert
// @route   POST /api/alerts/:id/ignore
// @access  Private
const ignoreAlert = asyncHandler(async (req, res) => {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
        res.status(404);
        throw new Error('Alert not found');
    }

    alert.status = 'Ignored';
    const updatedAlert = await alert.save();
    res.json(updatedAlert);
});

// @desc    Clear resolved/handled alerts
// @route   DELETE /api/alerts/resolved
// @access  Private
const clearResolvedAlerts = asyncHandler(async (req, res) => {
    const result = await Alert.deleteMany({
        status: { $in: ['Resolved', 'Ignored', 'Machine Stopped'] }
    });

    res.json({ deletedCount: result.deletedCount });
});

module.exports = {
    getAlerts,
    updateAlertStatus,
    stopMachineForAlert,
    ignoreAlert,
    clearResolvedAlerts
};
