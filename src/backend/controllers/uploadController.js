/**
 * Handle file upload
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleFileUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create response with file path
    return res.json({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.error('Error in file upload:', error);
    return res.status(500).json({ error: 'Server error during upload' });
  }
};

module.exports = {
  handleFileUpload
}; 