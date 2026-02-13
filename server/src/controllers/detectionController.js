const asyncHandler = require('express-async-handler');
const Detection = require('../models/detectionModel');

// @desc    Get all detections
// @route   GET /api/detections
// @access  Private
const getDetections = asyncHandler(async (req, res) => {
    const detections = await Detection.find().sort({ createdAt: -1 });
    res.json(detections);
});

// @desc    Create new detection (Simulated or from IoT)
// @route   POST /api/detections
// @access  Public (or protected depending on IoT setup)
const createDetection = asyncHandler(async (req, res) => {
    const { metalType, severity, sensorId, location, status } = req.body;

    if (!sensorId) {
        res.status(400);
        throw new Error('Sensor ID is required');
    }

    const detection = await Detection.create({
        metalType,
        severity,
        sensorId,
        location,
        status
    });

    res.status(201).json(detection);
});

// @desc    Update detection status
// @route   PUT /api/detections/:id
// @access  Private
const updateDetection = asyncHandler(async (req, res) => {
    const detection = await Detection.findById(req.params.id);

    if (!detection) {
        res.status(404);
        throw new Error('Detection not found');
    }

    const updatedDetection = await Detection.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedDetection);
});

// @desc    Get detection stats
// @route   GET /api/detections/stats
// @access  Private
const getStats = asyncHandler(async (req, res) => {
    const total = await Detection.countDocuments();
    const ferrous = await Detection.countDocuments({ metalType: 'Ferrous' });
    const nonFerrous = await Detection.countDocuments({ metalType: 'Non-Ferrous' });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Detection.countDocuments({ createdAt: { $gte: today } });

    res.json({
        total,
        ferrous,
        nonFerrous,
        today: todayCount
    });
});

module.exports = {
    getDetections,
    createDetection,
    updateDetection,
    getStats
};
