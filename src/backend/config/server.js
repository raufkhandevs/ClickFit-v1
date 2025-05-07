// Server configuration
const serverConfig = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  uploadDirectory: process.env.UPLOAD_DIR || 'src/frontend/public/uploads',
  uploadLimit: 5 * 1024 * 1024 // 5MB size limit
};

module.exports = serverConfig; 