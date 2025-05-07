const express = require('express');
const router = express.Router();
const { upload, handleMulterErrors } = require('../middleware/uploadMiddleware');
const { handleFileUpload } = require('../controllers/uploadController');
const userModel = require('../models/userModel');

// Upload route
router.post('/upload', upload.single('image'), handleFileUpload);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add user
router.post('/users', async (req, res) => {
  try {
    const user = await userModel.addUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register error handler
router.use(handleMulterErrors);

module.exports = router; 