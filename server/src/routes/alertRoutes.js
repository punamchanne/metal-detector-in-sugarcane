const express = require('express');
const router = express.Router();
const {
	getAlerts,
	updateAlertStatus,
	stopMachineForAlert,
	ignoreAlert,
	clearResolvedAlerts
} = require('../controllers/alertController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAlerts);
router.patch('/:id/status', protect, updateAlertStatus);
router.post('/:id/stop-machine', protect, stopMachineForAlert);
router.post('/:id/ignore', protect, ignoreAlert);
router.delete('/resolved', protect, clearResolvedAlerts);

module.exports = router;
