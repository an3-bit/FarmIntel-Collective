-- Database setup script for FarmIntel
-- Run this in MySQL to create the required database

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS GeoSoilData;

-- Use the database
USE GeoSoilData;

-- Show current databases
SHOW DATABASES;

-- Show current user and host
SELECT USER(), CURRENT_USER();

-- Test connection
SELECT 'Database connection successful!' as status;
