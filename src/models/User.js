const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    vanityUrl: {
      type: String,
      unique: true,
      default: function() {
        return this.name.toLowerCase().replace(/\s+/g, '') + Date.now();  // Example unique default
      },
    },
    profileImage: {
      type: String,
    },
    tagline: {
      type: String,
    },
    socialLinks: {
      type: Map,
      of: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

