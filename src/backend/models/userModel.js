const { pool } = require('../config/database');

class UserModel {
  /**
   * Add a new user to the database
   * @param {Object} userData - User data object
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.type - User type (admin, member, etc)
   * @param {number} userData.active - User active status (0 or 1)
   * @returns {Promise<Object>} - New user data with ID
   */
  async addUser(userData) {
    try {
      const { email, password, type, active = 1 } = userData;
      
      const connection = await pool.getConnection();
      
      // Call the stored procedure
      const [result] = await connection.execute(
        'CALL addUser(?, ?, ?, ?)',
        [email, password, type, active]
      );
      
      connection.release();
      
      // Get the ID of the newly inserted user
      const [userResult] = await this.getUserByEmail(email);
      
      return userResult;
    } catch (error) {
      console.error('Error adding user:', error.message);
      throw error;
    }
  }
  
  /**
   * Get a user by email
   * @param {string} email - User email
   * @returns {Promise<Array>} - User data
   */
  async getUserByEmail(email) {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      connection.release();
      
      return rows;
    } catch (error) {
      console.error('Error getting user by email:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all users
   * @returns {Promise<Array>} - Array of user data
   */
  async getAllUsers() {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute('SELECT * FROM users');
      
      connection.release();
      
      return rows;
    } catch (error) {
      console.error('Error getting all users:', error.message);
      throw error;
    }
  }
}

module.exports = new UserModel(); 