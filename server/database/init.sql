-- Initialize PostgreSQL database for SmileFlow
-- This file runs when the PostgreSQL container starts

-- Create additional extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes for better performance (will be created by migrations)
-- These are just examples, actual indexes will be created by Laravel migrations

-- Grant permissions (if needed)
-- GRANT ALL PRIVILEGES ON DATABASE smileflow TO smileflow_user;
