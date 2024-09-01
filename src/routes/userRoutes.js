const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const { getGFS } = require('../config/db'); // Import getGFS instead of gfs directly
const User = require('../models/User');
const router = express.Router();

// Set up multer to use memory storage for temporary file storage
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

// Existing routes for getting and updating user profile
router.route('/profile').get(verifyToken, getUserProfile).put(verifyToken, updateUserProfile);

// Route to check vanity URL availability
router.post('/check-vanity-url', async (req, res) => {
    const { vanityUrl } = req.body;
    try {
      const existingUser = await User.findOne({ vanityUrl });
      if (existingUser) {
        return res.json({ available: false });
      } else {
        return res.json({ available: true });
      }
    } catch (error) {
      console.error('Error checking vanity URL availability:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Route to upload profile picture using GridFS
router.post('/upload-profile-picture', verifyToken, upload.single('file'), async (req, res) => {
  try {
    const gfs = getGFS(); // Safely retrieve gfs

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const writeStream = gfs.createWriteStream({
      filename: `${Date.now()}-${req.file.originalname}`,
      content_type: req.file.mimetype,
      metadata: { userId: req.user._id }, // Optionally store user ID or other metadata
    });

    writeStream.write(req.file.buffer);
    writeStream.end();

    writeStream.on('close', async (file) => {
      // Save the file URL to the user's profileImage field
      const imageUrl = `/api/users/image/${file.filename}`;
      await User.findByIdAndUpdate(req.user._id, { profileImage: imageUrl });

      res.json({ url: imageUrl });
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add the route for retrieving images from GridFS
router.get('/image/:filename', async (req, res) => {
  try {
    const gfs = getGFS(); // Safely retrieve gfs
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add the route for file deletion handling
router.delete('/image/:filename', verifyToken, async (req, res) => {
    try {
      const gfs = getGFS(); // Safely retrieve gfs
      await gfs.remove({ filename: req.params.filename, root: 'uploads' }, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Server error' });
        }
        res.json({ message: 'File deleted' });
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
  


