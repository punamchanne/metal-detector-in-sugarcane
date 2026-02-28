const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
    detectImage,
    getHistory,
    getAnalyticsOverview
} = require('../controllers/detectionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/detect', protect, upload.single('image'), detectImage);
router.get('/history', protect, getHistory);
router.get('/analytics/overview', protect, getAnalyticsOverview);

module.exports = router;
