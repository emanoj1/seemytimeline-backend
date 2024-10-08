const Timeline = require('../models/Timeline');

// @desc    Create new timeline entry
// @route   POST /api/timeline
// @access  Private
const createTimelineEntry = async (req, res) => {
  const { year, content, image } = req.body;

  const entry = new Timeline({
    user: req.user.id,
    year,
    content,
    image,
  });

  const createdEntry = await entry.save();
  res.status(201).json(createdEntry);
};

// @desc    Get timeline entries
// @route   GET /api/timeline
// @access  Private
const getTimelineEntries = async (req, res) => {
  const entries = await Timeline.find({ user: req.user.id }).sort({ year: 1 });
  res.json(entries);
};

module.exports = {
  createTimelineEntry,
  getTimelineEntries,
};

