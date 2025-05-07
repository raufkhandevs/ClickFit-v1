-- Create database if not exists
CREATE DATABASE IF NOT EXISTS clickfit;

-- Use the database
USE clickfit;

-- Drop the table if it exists
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    `password` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    `type` VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    `active` TINYINT default 1,
    PRIMARY KEY (`ID`),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC)
);

-- Drop the stored procedure if it exists
DROP PROCEDURE IF EXISTS addUser;

-- Create stored procedure
DELIMITER //
CREATE PROCEDURE `addUser`(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_type VARCHAR(255),
    IN p_active TINYINT
)
BEGIN
    INSERT INTO users (email, password, type, active)
    VALUES (p_email, p_password, p_type, p_active);
END //
DELIMITER ;

-- Example of calling the stored procedure to add a user
CALL addUser('admin@clickfit.com', 'password123', 'admin', 1);
CALL addUser('user@clickfit.com', 'userpass456', 'member', 1); 