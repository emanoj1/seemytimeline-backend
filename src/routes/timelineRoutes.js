import express from 'express';
import { createTimelineEntry, getTimelineEntries } from '../controllers/timelineController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createTimelineEntry).get(protect, getTimelineEntries);

export default router;
