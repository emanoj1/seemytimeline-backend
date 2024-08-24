import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      followers: user.followers,
      following: user.following,
      vanityUrl: user.vanityUrl,
      profileImage: user.profileImage,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.vanityUrl = req.body.vanityUrl || user.vanityUrl;
    user.profileImage = req.body.profileImage || user.profileImage;
    user.tagline = req.body.tagline || user.tagline;
    user.socialLinks = req.body.socialLinks || user.socialLinks;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      vanityUrl: updatedUser.vanityUrl,
      profileImage: updatedUser.profileImage,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
