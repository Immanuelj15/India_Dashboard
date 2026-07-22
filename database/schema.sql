-- India in the World: Global Progress Dashboard
-- Database Schema DDL for PostgreSQL (Supabase Compatible)

-- Drop existing tables if re-creating
DROP TABLE IF EXISTS historical_rankings CASCADE;
DROP TABLE IF EXISTS indicators CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS sources CASCADE;

-- 1. Countries Table
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    code VARCHAR(5) UNIQUE NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    flag_emoji VARCHAR(10),
    region VARCHAR(100),
    population DOUBLE PRECISION,
    gdp_usd VARCHAR(50),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
);

-- 2. Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    description TEXT
);

-- 3. Indicators Table
CREATE TABLE indicators (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    unit VARCHAR(50),
    description TEXT,
    higher_is_better BOOLEAN DEFAULT TRUE
);

-- 4. Sources Table
CREATE TABLE sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT
);

-- 5. Historical Rankings Table
CREATE TABLE historical_rankings (
    id SERIAL PRIMARY KEY,
    country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE,
    indicator_id INTEGER REFERENCES indicators(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    rank INTEGER,
    value DOUBLE PRECISION,
    unit VARCHAR(50),
    source_id INTEGER REFERENCES sources(id),
    last_updated VARCHAR(50)
);

-- Indices for rapid query performance
CREATE INDEX idx_rankings_country ON historical_rankings(country_id);
CREATE INDEX idx_rankings_indicator ON historical_rankings(indicator_id);
CREATE INDEX idx_rankings_year ON historical_rankings(year);
CREATE INDEX idx_indicators_category ON indicators(category_id);
