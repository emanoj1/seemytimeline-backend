// file defines the API endpoints related to comments on timeline entries. 
// These routes typically allow users to create and fetch comments, and only authenticated users should be able to add comments.

const express = require('express');
const { createComment, getComments } = require('../controllers/commentController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// @route   POST /api/comments/:timelineId
// @desc    Add a comment to a timeline entry
// @access  Private
router.post('/:timelineId', verifyToken, createComment);

// @route   GET /api/comments/:timelineId
// @desc    Get all comments for a timeline entry
// @access  Public
router.get('/:timelineId', getComments);

module.exports = router;


