const express = require('express');
const router = express.Router();
const { getDetections, createDetection, updateDetection, getStats } = require('../controllers/detectionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getDetections).post(createDetection);
router.get('/stats', protect, getStats);
router.route('/:id').put(protect, updateDetection);

module.exports = router;
