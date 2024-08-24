// file defines the API endpoints related to comments on timeline entries. 
// These routes typically allow users to create and fetch comments, and only authenticated users should be able to add comments.

import express from 'express';
import { createComment, getComments } from '../controllers/commentController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// @route   POST /api/comments/:timelineId
// @desc    Add a comment to a timeline entry
// @access  Private
router.post('/:timelineId', verifyToken, createComment);

// @route   GET /api/comments/:timelineId
// @desc    Get all comments for a timeline entry
// @access  Public
router.get('/:timelineId', getComments);

export default router;
