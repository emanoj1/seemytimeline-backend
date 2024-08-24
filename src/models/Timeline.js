const mongoose = require('mongoose');

const timelineSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    year: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 500,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Timeline = mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;

