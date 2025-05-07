require('dotenv').config();
const express = require('express');
const path = require('path');
const apiRoutes = require('./backend/routes/api');
const { testConnection } = require('./backend/config/database');
const serverConfig = require('./backend/config/server');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend/public directory
app.use(express.static(path.join(__dirname, 'frontend/public')));

// API Routes
app.use('/api', apiRoutes);

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/views/index.html'));
});

// Start the server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (dbConnected) {
      app.listen(serverConfig.port, () => {
        console.log(`Server running in ${serverConfig.environment} mode on port ${serverConfig.port}`);
        console.log(`Open http://localhost:${serverConfig.port} in your browser`);
      });
    } else {
      console.error('Database connection failed. Server not started.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 