# Static Indicator Seeder Data for all 10 categories

INDICATORS_SEED_DATA = [
    # Economy (13 indicators)
    {"slug": "gdp-rank", "category_slug": "economy", "name": "GDP Rank", "unit": "Rank", "description": "Nominal Gross Domestic Product rank worldwide.", "lower_is_better": True},
    {"slug": "gdp-ppp-rank", "category_slug": "economy", "name": "GDP (PPP) Rank", "unit": "Rank", "description": "Gross Domestic Product based on Purchasing Power Parity.", "lower_is_better": True},
    {"slug": "gdp-per-capita", "category_slug": "economy", "name": "GDP per Capita Rank", "unit": "Rank", "description": "GDP divided by total national population.", "lower_is_better": True},
    {"slug": "gdp-growth-rate", "category_slug": "economy", "name": "GDP Growth Rate", "unit": "%", "description": "Annual percentage growth rate of GDP.", "lower_is_better": False},
    {"slug": "inflation-rate", "category_slug": "economy", "name": "Inflation Rate", "unit": "%", "description": "Annual consumer price inflation rate.", "lower_is_better": True},
    {"slug": "unemployment-rate", "category_slug": "economy", "name": "Unemployment Rate", "unit": "%", "description": "Share of total labor force without work.", "lower_is_better": True},
    {"slug": "public-debt-gdp", "category_slug": "economy", "name": "Public Debt to GDP", "unit": "% of GDP", "description": "General government gross debt relative to GDP.", "lower_is_better": True},
    {"slug": "ease-of-doing-business", "category_slug": "economy", "name": "Ease of Doing Business", "unit": "Rank", "description": "Regulatory environment conducive to business operations.", "lower_is_better": True},
    {"slug": "global-competitiveness-index", "category_slug": "economy", "name": "Global Competitiveness Index", "unit": "Rank", "description": "National productivity and competitiveness benchmark.", "lower_is_better": True},
    {"slug": "global-innovation-index", "category_slug": "economy", "name": "Global Innovation Index", "unit": "Rank", "description": "Multi-dimensional ranking of innovation capabilities.", "lower_is_better": True},
    {"slug": "economic-freedom-index", "category_slug": "economy", "name": "Economic Freedom Index", "unit": "Rank", "description": "Measures rule of law, government size, and open markets.", "lower_is_better": True},
    {"slug": "logistics-performance-index", "category_slug": "economy", "name": "Logistics Performance Index", "unit": "Rank", "description": "Efficiency of trade logistics and customs clearance.", "lower_is_better": True},
    {"slug": "foreign-direct-investment", "category_slug": "economy", "name": "Foreign Direct Investment (FDI)", "unit": "Billion USD", "description": "Net inward foreign direct investment inflows.", "lower_is_better": False},

    # Society (9 indicators)
    {"slug": "human-development-index", "category_slug": "society", "name": "Human Development Index (HDI)", "unit": "Rank", "description": "Summary measure of average achievement in key dimensions of human development.", "lower_is_better": True},
    {"slug": "world-happiness-report", "category_slug": "society", "name": "World Happiness Report", "unit": "Rank", "description": "National subjective well-being and life satisfaction score.", "lower_is_better": True},
    {"slug": "social-progress-index", "category_slug": "society", "name": "Social Progress Index", "unit": "Rank", "description": "Measures basic human needs, foundations of wellbeing, and opportunity.", "lower_is_better": True},
    {"slug": "quality-of-life-index", "category_slug": "society", "name": "Quality of Life Index", "unit": "Score (0-100)", "description": "Overall estimation of quality of life index score.", "lower_is_better": False},
    {"slug": "human-capital-index", "category_slug": "society", "name": "Human Capital Index", "unit": "Score (0-1)", "description": "Knowledge, skills, and health accumulated by children.", "lower_is_better": False},
    {"slug": "multidimensional-poverty-index", "category_slug": "society", "name": "Multidimensional Poverty Index", "unit": "Score", "description": "Acute deprivations in health, education, and living standards.", "lower_is_better": True},
    {"slug": "cost-of-living-index", "category_slug": "society", "name": "Cost of Living Index", "unit": "Score", "description": "Relative cost of consumer goods and services.", "lower_is_better": True},
    {"slug": "population-growth-rate", "category_slug": "society", "name": "Population Growth Rate", "unit": "%", "description": "Annual exponential growth rate of national population.", "lower_is_better": False},
    {"slug": "urbanization-rate", "category_slug": "society", "name": "Urbanization Rate", "unit": "%", "description": "Percentage of total population residing in urban areas.", "lower_is_better": False},

    # Governance (9 indicators)
    {"slug": "corruption-perceptions-index", "category_slug": "governance", "name": "Corruption Perceptions Index", "unit": "Rank", "description": "Perceived levels of public sector corruption.", "lower_is_better": True},
    {"slug": "democracy-index", "category_slug": "governance", "name": "Democracy Index", "unit": "Rank", "description": "State of democracy based on electoral process and civil liberties.", "lower_is_better": True},
    {"slug": "rule-of-law-index", "category_slug": "governance", "name": "Rule of Law Index", "unit": "Rank", "description": "Adherence to legal accountability, open government, and fundamental rights.", "lower_is_better": True},
    {"slug": "press-freedom-index", "category_slug": "governance", "name": "Press Freedom Index", "unit": "Rank", "description": "Degree of freedom that journalists and media outlets enjoy.", "lower_is_better": True},
    {"slug": "government-effectiveness", "category_slug": "governance", "name": "Government Effectiveness", "unit": "Percentile", "description": "Quality of public services and policy formulation.", "lower_is_better": False},
    {"slug": "political-stability-index", "category_slug": "governance", "name": "Political Stability Index", "unit": "Percentile", "description": "Likelihood of political instability or politically-motivated violence.", "lower_is_better": False},
    {"slug": "regulatory-quality", "category_slug": "governance", "name": "Regulatory Quality", "unit": "Percentile", "description": "Ability of government to formulate and implement sound regulations.", "lower_is_better": False},
    {"slug": "voice-and-accountability", "category_slug": "governance", "name": "Voice & Accountability", "unit": "Percentile", "description": "Extent to which citizens participate in selecting government.", "lower_is_better": False},
    {"slug": "open-budget-index", "category_slug": "governance", "name": "Open Budget Index", "unit": "Score (0-100)", "description": "Public availability and transparency of budget information.", "lower_is_better": False},

    # Technology & Innovation (11 indicators)
    {"slug": "ai-readiness-index", "category_slug": "technology-innovation", "name": "AI Readiness Index", "unit": "Rank", "description": "Government readiness to implement artificial intelligence in public services.", "lower_is_better": True},
    {"slug": "network-readiness-index", "category_slug": "technology-innovation", "name": "Network Readiness Index", "unit": "Rank", "description": "Application of ICT to foster national development and competitiveness.", "lower_is_better": True},
    {"slug": "global-cybersecurity-index", "category_slug": "technology-innovation", "name": "Global Cybersecurity Index", "unit": "Rank", "description": "Commitment to cybersecurity across legal, technical, and organizational pillars.", "lower_is_better": True},
    {"slug": "startup-ecosystem-ranking", "category_slug": "technology-innovation", "name": "Startup Ecosystem Ranking", "unit": "Rank", "description": "Global strength and density of startup entrepreneurship ecosystems.", "lower_is_better": True},
    {"slug": "ict-development-index", "category_slug": "technology-innovation", "name": "ICT Development Index", "unit": "Score (0-100)", "description": "Infrastructure, access, and usage of information communication technology.", "lower_is_better": False},
    {"slug": "internet-penetration", "category_slug": "technology-innovation", "name": "Internet Penetration", "unit": "% of pop", "description": "Percentage of individuals actively using the Internet.", "lower_is_better": False},
    {"slug": "broadband-speed-ranking", "category_slug": "technology-innovation", "name": "Broadband Speed Ranking", "unit": "Rank", "description": "National median fixed broadband download speed ranking.", "lower_is_better": True},
    {"slug": "mobile-connectivity-index", "category_slug": "technology-innovation", "name": "Mobile Connectivity Index", "unit": "Score (0-100)", "description": "Infrastructure, affordability, consumer readiness, and content.", "lower_is_better": False},
    {"slug": "rd-expenditure", "category_slug": "technology-innovation", "name": "R&D Expenditure", "unit": "% of GDP", "description": "Gross domestic expenditure on research and development.", "lower_is_better": False},
    {"slug": "patents-per-million", "category_slug": "technology-innovation", "name": "Patents per Million Population", "unit": "Per Million", "description": "Patent applications filed per million residents.", "lower_is_better": False},

    # Education (8 indicators)
    {"slug": "education-index", "category_slug": "education", "name": "Education Index", "unit": "Score (0-1)", "description": "Mean years of schooling and expected years of schooling.", "lower_is_better": False},
    {"slug": "literacy-rate", "category_slug": "education", "name": "Literacy Rate", "unit": "%", "description": "Percentage of adult population capable of reading and writing.", "lower_is_better": False},
    {"slug": "school-enrollment-rate", "category_slug": "education", "name": "School Enrollment Rate", "unit": "%", "description": "Gross tertiary education school enrollment ratio.", "lower_is_better": False},
    {"slug": "qs-world-university-rankings", "category_slug": "education", "name": "QS World University Rankings", "unit": "Top Uni Count", "description": "Number of national universities in global top 500.", "lower_is_better": False},
    {"slug": "times-higher-education-rankings", "category_slug": "education", "name": "Times Higher Education Rankings", "unit": "Top Uni Count", "description": "Universities ranked in THE World University Rankings.", "lower_is_better": False},
    {"slug": "pisa-rankings", "category_slug": "education", "name": "PISA Rankings", "unit": "Rank", "description": "Programme for International Student Assessment performance.", "lower_is_better": True},
    {"slug": "global-skills-index", "category_slug": "education", "name": "Global Skills Index", "unit": "Rank", "description": "Skill proficiency across Business, Technology, and Data Science.", "lower_is_better": True},
    {"slug": "student-teacher-ratio", "category_slug": "education", "name": "Student Teacher Ratio", "unit": "Ratio", "description": "Average number of pupils per primary school teacher.", "lower_is_better": True},

    # Healthcare (9 indicators)
    {"slug": "healthcare-index", "category_slug": "healthcare", "name": "Healthcare Index", "unit": "Score (0-100)", "description": "Overall estimation of healthcare infrastructure, professional skills, and costs.", "lower_is_better": False},
    {"slug": "universal-health-coverage-index", "category_slug": "healthcare", "name": "Universal Health Coverage Index", "unit": "Score (0-100)", "description": "Average coverage of essential health services.", "lower_is_better": False},
    {"slug": "healthcare-access-quality-index", "category_slug": "healthcare", "name": "Healthcare Access & Quality Index", "unit": "Score (0-100)", "description": "Personal healthcare access and quality score.", "lower_is_better": False},
    {"slug": "life-expectancy", "category_slug": "healthcare", "name": "Life Expectancy", "unit": "Years", "description": "Average expected lifespan at birth.", "lower_is_better": False},
    {"slug": "infant-mortality", "category_slug": "healthcare", "name": "Infant Mortality Rate", "unit": "per 1k live births", "description": "Number of infant deaths per 1,000 live births.", "lower_is_better": True},
    {"slug": "maternal-mortality", "category_slug": "healthcare", "name": "Maternal Mortality Rate", "unit": "per 100k births", "description": "Maternal deaths per 100,000 live births.", "lower_is_better": True},
    {"slug": "physicians-per-thousand", "category_slug": "healthcare", "name": "Physicians per 1,000 People", "unit": "per 1k", "description": "Medical doctors available per 1,000 residents.", "lower_is_better": False},
    {"slug": "hospital-beds-per-thousand", "category_slug": "healthcare", "name": "Hospital Beds per 1,000 People", "unit": "per 1k", "description": "Inpatient hospital beds per 1,000 residents.", "lower_is_better": False},
    {"slug": "vaccination-coverage", "category_slug": "healthcare", "name": "Vaccination Coverage", "unit": "%", "description": "Immunization coverage for key communicable diseases.", "lower_is_better": False},

    # Environment (9 indicators)
    {"slug": "environmental-performance-index", "category_slug": "environment", "name": "Environmental Performance Index", "unit": "Rank", "description": "State of environmental health and ecosystem vitality.", "lower_is_better": True},
    {"slug": "climate-change-performance-index", "category_slug": "environment", "name": "Climate Change Performance Index", "unit": "Rank", "description": "Climate protection performance across emissions, renewables, and policy.", "lower_is_better": True},
    {"slug": "air-quality-ranking", "category_slug": "environment", "name": "Air Quality Ranking", "unit": "Rank", "description": "Average PM2.5 concentration and air quality risk ranking.", "lower_is_better": True},
    {"slug": "co2-emissions-per-capita", "category_slug": "environment", "name": "CO₂ Emissions per Capita", "unit": "Metric Tons", "description": "Annual carbon dioxide emissions per resident.", "lower_is_better": True},
    {"slug": "renewable-energy-share", "category_slug": "environment", "name": "Renewable Energy Share", "unit": "%", "description": "Share of renewables in total final energy consumption.", "lower_is_better": False},
    {"slug": "forest-cover", "category_slug": "environment", "name": "Forest Cover", "unit": "% of land area", "description": "Land area covered by natural forest ecosystems.", "lower_is_better": False},
    {"slug": "water-stress-index", "category_slug": "environment", "name": "Water Stress Index", "unit": "Score (0-5)", "description": "Ratio of total water withdrawals to available renewable supplies.", "lower_is_better": True},
    {"slug": "climate-risk-index", "category_slug": "environment", "name": "Climate Risk Index", "unit": "Rank", "description": "Level of exposure and vulnerability to extreme weather events.", "lower_is_better": True},
    {"slug": "sdg-score", "category_slug": "environment", "name": "Sustainable Development Goals (SDG) Score", "unit": "Score (0-100)", "description": "Overall progress towards achieving all 17 UN SDGs.", "lower_is_better": False},

    # Safety (6 indicators)
    {"slug": "global-peace-index", "category_slug": "safety", "name": "Global Peace Index", "unit": "Rank", "description": "Measures societal safety, ongoing conflict, and militarization.", "lower_is_better": True},
    {"slug": "crime-index", "category_slug": "safety", "name": "Crime Index", "unit": "Score (0-100)", "description": "Estimation of overall crime level in a given country.", "lower_is_better": True},
    {"slug": "safety-index", "category_slug": "safety", "name": "Safety Index", "unit": "Score (0-100)", "description": "Perceived safety while walking alone during day and night.", "lower_is_better": False},
    {"slug": "terrorism-index", "category_slug": "safety", "name": "Global Terrorism Index", "unit": "Rank", "description": "Impact of terrorism including incidents, fatalities, and injuries.", "lower_is_better": True},
    {"slug": "road-safety-ranking", "category_slug": "safety", "name": "Road Safety Ranking", "unit": "Rank", "description": "Road traffic mortality rate per 100,000 population.", "lower_is_better": True},
    {"slug": "disaster-risk-index", "category_slug": "safety", "name": "Disaster Risk Index", "unit": "Rank", "description": "Vulnerability and coping capacity against natural disasters.", "lower_is_better": True},

    # Equality (6 indicators)
    {"slug": "global-gender-gap-index", "category_slug": "equality", "name": "Global Gender Gap Index", "unit": "Rank", "description": "Parity gap across economic participation, education, health, and politics.", "lower_is_better": True},
    {"slug": "gender-inequality-index", "category_slug": "equality", "name": "Gender Inequality Index", "unit": "Rank", "description": "Loss in human development due to inequality between female and male achievements.", "lower_is_better": True},
    {"slug": "gini-coefficient", "category_slug": "equality", "name": "Gini Coefficient", "unit": "Index (0-100)", "description": "Measures income distribution inequality within a nation.", "lower_is_better": True},
    {"slug": "women-economic-participation", "category_slug": "equality", "name": "Women's Economic Participation", "unit": "% Parity", "description": "Economic opportunity and participation gap score.", "lower_is_better": False},
    {"slug": "female-labour-force-participation", "category_slug": "equality", "name": "Female Labour Force Participation", "unit": "%", "description": "Proportion of female population aged 15+ economically active.", "lower_is_better": False},
    {"slug": "equal-pay-indicators", "category_slug": "equality", "name": "Equal Pay Indicators", "unit": "Ratio", "description": "Estimated female-to-male earned income ratio.", "lower_is_better": False},

    # Digital Government (5 indicators)
    {"slug": "e-government-development-index", "category_slug": "digital-government", "name": "E-Government Development Index", "unit": "Rank", "description": "UN benchmark for online service quality, telecom infrastructure, and human capital.", "lower_is_better": True},
    {"slug": "e-participation-index", "category_slug": "digital-government", "name": "E-Participation Index", "unit": "Rank", "description": "Use of online services to facilitate provision of information by government to citizens.", "lower_is_better": True},
    {"slug": "govtech-maturity-index", "category_slug": "digital-government", "name": "GovTech Maturity Index", "unit": "Group (A-D)", "description": "World Bank measure of public sector digital transformation.", "lower_is_better": False},
    {"slug": "open-data-inventory", "category_slug": "digital-government", "name": "Open Data Inventory", "unit": "Rank", "description": "Coverage and openness of official national statistics.", "lower_is_better": True},
    {"slug": "digital-competitiveness-ranking", "category_slug": "digital-government", "name": "Digital Competitiveness Ranking", "unit": "Rank", "description": "Capacity to adopt and explore digital technologies transforming government.", "lower_is_better": True},
]
