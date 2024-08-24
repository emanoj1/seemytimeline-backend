const express = require('express');
const { createTimelineEntry, getTimelineEntries } = require('../controllers/timelineController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.route('/').post(verifyToken, createTimelineEntry).get(verifyToken, getTimelineEntries);

module.exports = router;

