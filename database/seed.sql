-- India in the World: Global Progress Dashboard
-- Database Seed DML Script for PostgreSQL

-- 1. Insert Countries
INSERT INTO countries (code, name, flag_emoji, region, population, gdp_usd, latitude, longitude) VALUES
('IND', 'India', '🇮🇳', 'South Asia', 1428600000, '$3.75 Trillion', 20.5937, 78.9629),
('JPN', 'Japan', '🇯🇵', 'East Asia', 125100000, '$4.21 Trillion', 36.2048, 138.2529),
('USA', 'United States', '🇺🇸', 'North America', 339900000, '$26.85 Trillion', 37.0902, -95.7129),
('DEU', 'Germany', '🇩🇪', 'Europe', 84400000, '$4.45 Trillion', 51.1657, 10.4515),
('CHN', 'China', '🇨🇳', 'East Asia', 1411700000, '$17.78 Trillion', 35.8617, 104.1954),
('GBR', 'United Kingdom', '🇬🇧', 'Europe', 67700000, '$3.34 Trillion', 55.3781, -3.4360),
('BRA', 'Brazil', '🇧🇷', 'Latin America', 216400000, '$2.17 Trillion', -14.2350, -51.9253),
('ZAF', 'South Africa', '🇿🇦', 'Africa', 60400000, '$377 Billion', -30.5595, 22.9375);

-- 2. Insert Categories
INSERT INTO categories (slug, name, icon, description) VALUES
('economy', 'Economy', 'TrendingUp', 'National economic output, growth metrics, trade, competitiveness, and inflation.'),
('society', 'Society', 'Users', 'Human development, happiness, quality of life, poverty, and demographic indicators.'),
('governance', 'Governance', 'Building2', 'Corruption perceptions, rule of law, press freedom, and institutional quality.'),
('technology-innovation', 'Technology & Innovation', 'Cpu', 'AI readiness, cybersecurity, R&D expenditures, patents, and startup ecosystem.'),
('education', 'Education', 'GraduationCap', 'Literacy rates, university rankings, school enrollment, and educational attainment.'),
('healthcare', 'Healthcare', 'HeartPulse', 'Life expectancy, health infrastructure, coverage, and mortality statistics.'),
('environment', 'Environment', 'Leaf', 'Environmental performance, climate change response, renewable share, and air quality.'),
('safety', 'Safety', 'ShieldCheck', 'Global peace, crime rates, safety index, disaster risks, and road safety.'),
('equality', 'Equality', 'Scale', 'Gender parity, income inequality (Gini), and female workforce participation.'),
('digital-government', 'Digital Government', 'Globe', 'E-government maturity, online participation, and open data availability.');

-- 3. Insert Sources
INSERT INTO sources (id, name, url, description) VALUES
(1, 'World Bank', 'https://data.worldbank.org', 'Official World Development Indicators database.'),
(2, 'International Monetary Fund (IMF)', 'https://www.imf.org/en/Data', 'World Economic Outlook data.'),
(3, 'United Nations / UNDP', 'https://hdr.undp.org', 'Human Development Reports and UN statistics.'),
(4, 'World Health Organization (WHO)', 'https://www.who.int/data', 'Global Health Observatory.'),
(5, 'UNESCO', 'https://uis.unesco.org', 'Institute for Statistics.'),
(6, 'World Economic Forum (WEF)', 'https://www.weforum.org', 'Global Competitiveness & Gender Gap reports.'),
(7, 'Transparency International', 'https://www.transparency.org', 'Corruption Perceptions Index.'),
(8, 'Reporters Without Borders', 'https://rsf.org', 'World Press Freedom Index.'),
(9, 'Oxford Insights', 'https://oxfordinsights.com', 'Government AI Readiness Index.'),
(10, 'World Justice Project', 'https://worldjusticeproject.org', 'Rule of Law Index.'),
(11, 'ITU', 'https://www.itu.int', 'ICT Development & Cybersecurity Index.'),
(12, 'WIPO', 'https://www.wipo.int/gii', 'Global Innovation Index.'),
(13, 'StartupBlink', 'https://www.startupblink.com', 'Global Startup Ecosystem Index.'),
(14, 'Yale Environmental Performance Index', 'https://epi.yale.edu', 'Environmental Performance Index.'),
(15, 'Germanwatch', 'https://www.germanwatch.org', 'Climate Change Performance Index.'),
(16, 'IQAir', 'https://www.iqair.com', 'World Air Quality Report.'),
(17, 'Numbeo', 'https://www.numbeo.com', 'Quality of Life & Cost of Living Index.'),
(18, 'Our World In Data', 'https://ourworldindata.org', 'Research and data on world problems.'),
(19, 'UN DESA E-Government', 'https://publicadministration.un.org/egovkb', 'UN E-Government Survey.');
