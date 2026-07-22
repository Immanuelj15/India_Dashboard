import json
from app.database import SessionLocal, engine, Base
from app import models

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(models.Country).count() > 0:
            print("Database already seeded. Re-creating tables for fresh seed...")
            Base.metadata.drop_all(bind=engine)
            Base.metadata.create_all(bind=engine)

        print("Seeding Countries...")
        countries_data = [
            {"code": "IND", "name": "India", "flag_emoji": "🇮🇳", "region": "South Asia", "population": 1428600000, "gdp_usd": "$3.75 Trillion", "latitude": 20.5937, "longitude": 78.9629},
            {"code": "JPN", "name": "Japan", "flag_emoji": "🇯🇵", "region": "East Asia", "population": 125100000, "gdp_usd": "$4.21 Trillion", "latitude": 36.2048, "longitude": 138.2529},
            {"code": "USA", "name": "United States", "flag_emoji": "🇺🇸", "region": "North America", "population": 339900000, "gdp_usd": "$26.85 Trillion", "latitude": 37.0902, "longitude": -95.7129},
            {"code": "DEU", "name": "Germany", "flag_emoji": "🇩🇪", "region": "Europe", "population": 84400000, "gdp_usd": "$4.45 Trillion", "latitude": 51.1657, "longitude": 10.4515},
            {"code": "CHN", "name": "China", "flag_emoji": "🇨🇳", "region": "East Asia", "population": 1411700000, "gdp_usd": "$17.78 Trillion", "latitude": 35.8617, "longitude": 104.1954},
            {"code": "GBR", "name": "United Kingdom", "flag_emoji": "🇬🇧", "region": "Europe", "population": 67700000, "gdp_usd": "$3.34 Trillion", "latitude": 55.3781, "longitude": -3.4360},
            {"code": "BRA", "name": "Brazil", "flag_emoji": "🇧🇷", "region": "Latin America", "population": 216400000, "gdp_usd": "$2.17 Trillion", "latitude": -14.2350, "longitude": -51.9253},
            {"code": "ZAF", "name": "South Africa", "flag_emoji": "🇿🇦", "region": "Africa", "population": 60400000, "gdp_usd": "$377 Billion", "latitude": -30.5595, "longitude": 22.9375}
        ]

        country_map = {}
        for c in countries_data:
            obj = models.Country(**c)
            db.add(obj)
            db.flush()
            country_map[c["code"]] = obj

        print("Seeding Categories...")
        categories_data = [
            {"slug": "economy", "name": "Economy", "icon": "TrendingUp", "description": "National economic output, growth metrics, trade, competitiveness, and inflation."},
            {"slug": "society", "name": "Society", "icon": "Users", "description": "Human development, happiness, quality of life, poverty, and demographic indicators."},
            {"slug": "governance", "name": "Governance", "icon": "Building2", "description": "Corruption perceptions, rule of law, press freedom, and institutional quality."},
            {"slug": "technology-innovation", "name": "Technology & Innovation", "icon": "Cpu", "description": "AI readiness, cybersecurity, R&D expenditures, patents, and startup ecosystem."},
            {"slug": "education", "name": "Education", "icon": "GraduationCap", "description": "Literacy rates, university rankings, school enrollment, and educational attainment."},
            {"slug": "healthcare", "name": "Healthcare", "icon": "HeartPulse", "description": "Life expectancy, health infrastructure, coverage, and mortality statistics."},
            {"slug": "environment", "name": "Environment", "icon": "Leaf", "description": "Environmental performance, climate change response, renewable share, and air quality."},
            {"slug": "safety", "name": "Safety", "icon": "ShieldCheck", "description": "Global peace, crime rates, safety index, disaster risks, and road safety."},
            {"slug": "equality", "name": "Equality", "icon": "Scale", "description": "Gender parity, income inequality (Gini), and female workforce participation."},
            {"slug": "digital-government", "name": "Digital Government", "icon": "Globe", "description": "E-government maturity, online participation, and open data availability."}
        ]

        cat_map = {}
        for cat in categories_data:
            obj = models.Category(**cat)
            db.add(obj)
            db.flush()
            cat_map[cat["slug"]] = obj

        print("Seeding Sources...")
        sources_data = [
            {"id": 1, "name": "World Bank", "url": "https://data.worldbank.org", "description": "Official World Development Indicators database."},
            {"id": 2, "name": "International Monetary Fund (IMF)", "url": "https://www.imf.org/en/Data", "description": "World Economic Outlook data."},
            {"id": 3, "name": "United Nations / UNDP", "url": "https://hdr.undp.org", "description": "Human Development Reports and UN statistics."},
            {"id": 4, "name": "World Health Organization (WHO)", "url": "https://www.who.int/data", "description": "Global Health Observatory."},
            {"id": 5, "name": "UNESCO", "url": "https://uis.unesco.org", "description": "Institute for Statistics."},
            {"id": 6, "name": "World Economic Forum (WEF)", "url": "https://www.weforum.org", "description": "Global Competitiveness & Gender Gap reports."},
            {"id": 7, "name": "Transparency International", "url": "https://www.transparency.org", "description": "Corruption Perceptions Index."},
            {"id": 8, "name": "Reporters Without Borders", "url": "https://rsf.org", "description": "World Press Freedom Index."},
            {"id": 9, "name": "Oxford Insights", "url": "https://oxfordinsights.com", "description": "Government AI Readiness Index."},
            {"id": 10, "name": "World Justice Project", "url": "https://worldjusticeproject.org", "description": "Rule of Law Index."},
            {"id": 11, "name": "ITU", "url": "https://www.itu.int", "description": "ICT Development & Cybersecurity Index."},
            {"id": 12, "name": "WIPO", "url": "https://www.wipo.int/gii", "description": "Global Innovation Index."},
            {"id": 13, "name": "StartupBlink", "url": "https://www.startupblink.com", "description": "Global Startup Ecosystem Index."},
            {"id": 14, "name": "Yale Environmental Performance Index", "url": "https://epi.yale.edu", "description": "Environmental Performance Index."},
            {"id": 15, "name": "Germanwatch", "url": "https://www.germanwatch.org", "description": "Climate Change Performance Index."},
            {"id": 16, "name": "IQAir", "url": "https://www.iqair.com", "description": "World Air Quality Report."},
            {"id": 17, "name": "Numbeo", "url": "https://www.numbeo.com", "description": "Quality of Life & Cost of Living Index."},
            {"id": 18, "name": "Our World In Data", "url": "https://ourworldindata.org", "description": "Research and data on world problems."},
            {"id": 19, "name": "UN DESA E-Government", "url": "https://publicadministration.un.org/egovkb", "description": "UN E-Government Survey."}
        ]

        source_map = {}
        for s in sources_data:
            obj = models.Source(**s)
            db.add(obj)
            db.flush()
            source_map[s["id"]] = obj

        print("Seeding Required Indicators & Historical Rankings...")
        # Define all required indicators organized by category slug
        indicators_def = [
            # 1. Economy
            ("economy", "gdp-rank", "GDP Rank", "Rank", "Nominal Gross Domestic Product global ranking.", False, 2, [
                ("IND", [(2020, 5, 2.66), (2021, 6, 3.15), (2022, 5, 3.39), (2023, 5, 3.57), (2024, 5, 3.75)]),
                ("JPN", [(2020, 3, 5.04), (2021, 3, 5.01), (2022, 3, 4.23), (2023, 4, 4.21), (2024, 4, 4.21)]),
                ("USA", [(2020, 1, 21.06), (2021, 1, 23.32), (2022, 1, 25.46), (2023, 1, 26.85), (2024, 1, 26.85)]),
                ("DEU", [(2020, 4, 3.88), (2021, 4, 4.26), (2022, 4, 4.08), (2023, 3, 4.45), (2024, 3, 4.45)]),
                ("CHN", [(2020, 2, 14.69), (2021, 2, 17.73), (2022, 2, 17.96), (2023, 2, 17.78), (2024, 2, 17.78)])
            ]),
            ("economy", "gdp-ppp-rank", "GDP (PPP) Rank", "Rank", "GDP measured by Purchasing Power Parity.", False, 2, [
                ("IND", [(2020, 3, 8.9), (2021, 3, 10.2), (2022, 3, 11.8), (2023, 3, 13.0), (2024, 3, 14.26)]),
                ("JPN", [(2020, 4, 5.3), (2021, 4, 5.4), (2022, 4, 5.7), (2023, 4, 6.1), (2024, 4, 6.5)]),
                ("USA", [(2020, 2, 21.0), (2021, 2, 23.3), (2022, 2, 25.4), (2023, 2, 26.8), (2024, 2, 26.85)]),
                ("CHN", [(2020, 1, 24.1), (2021, 1, 27.3), (2022, 1, 30.3), (2023, 1, 32.9), (2024, 1, 35.29)])
            ]),
            ("economy", "gdp-per-capita-rank", "GDP per Capita Rank", "Rank", "Gross Domestic Product per person.", False, 1, [
                ("IND", [(2020, 145, 1910), (2021, 142, 2235), (2022, 139, 2389), (2023, 138, 2610), (2024, 136, 2730)]),
                ("USA", [(2020, 7, 63500), (2021, 6, 70200), (2022, 6, 76300), (2023, 6, 80400), (2024, 6, 81600)]),
                ("JPN", [(2020, 28, 40000), (2021, 29, 39800), (2022, 31, 33800), (2023, 32, 33700), (2024, 33, 33900)])
            ]),
            ("economy", "gdp-growth-rate", "GDP Growth Rate", "%", "Annual percentage growth of GDP.", True, 2, [
                ("IND", [(2020, 150, -5.8), (2021, 10, 9.1), (2022, 12, 7.2), (2023, 8, 7.8), (2024, 5, 8.2)]),
                ("USA", [(2020, 110, -2.8), (2021, 35, 5.9), (2022, 50, 1.9), (2023, 40, 2.5), (2024, 30, 2.7)]),
                ("CHN", [(2020, 20, 2.2), (2021, 15, 8.4), (2022, 60, 3.0), (2023, 25, 5.2), (2024, 22, 5.0)])
            ]),
            ("economy", "inflation-rate", "Inflation Rate", "%", "Annual consumer price index change.", False, 2, [
                ("IND", [(2020, 85, 6.6), (2021, 70, 5.1), (2022, 75, 6.7), (2023, 60, 5.7), (2024, 50, 4.8)]),
                ("USA", [(2020, 30, 1.2), (2021, 80, 4.7), (2022, 95, 8.0), (2023, 50, 4.1), (2024, 40, 3.1)])
            ]),
            ("economy", "unemployment-rate", "Unemployment Rate", "%", "Percentage of total labor force unemployed.", False, 1, [
                ("IND", [(2020, 90, 8.0), (2021, 85, 7.7), (2022, 78, 7.3), (2023, 70, 6.8), (2024, 65, 6.2)]),
                ("JPN", [(2020, 10, 2.8), (2021, 9, 2.8), (2022, 8, 2.6), (2023, 8, 2.6), (2024, 8, 2.5)])
            ]),
            ("economy", "public-debt-to-gdp", "Public Debt to GDP", "%", "General government gross debt percentage.", False, 2, [
                ("IND", [(2020, 110, 88.5), (2021, 105, 84.2), (2022, 102, 81.0), (2023, 98, 82.5), (2024, 95, 81.9)]),
                ("JPN", [(2020, 190, 258.0), (2021, 190, 255.0), (2022, 190, 260.0), (2023, 190, 252.0), (2024, 190, 251.2)])
            ]),
            ("economy", "ease-of-doing-business", "Ease of Doing Business (Historical)", "Rank", "World Bank Doing Business historical rank.", False, 1, [
                ("IND", [(2020, 63, 71.0), (2021, 63, 71.0), (2022, 63, 71.0), (2023, 63, 71.0), (2024, 63, 71.0)]),
                ("USA", [(2020, 6, 84.0), (2021, 6, 84.0), (2022, 6, 84.0), (2023, 6, 84.0), (2024, 6, 84.0)])
            ]),
            ("economy", "global-competitiveness-index", "Global Competitiveness Index", "Score (0-100)", "WEF competitiveness score.", True, 6, [
                ("IND", [(2020, 68, 61.4), (2021, 68, 61.4), (2022, 65, 62.1), (2023, 60, 63.5), (2024, 55, 64.8)]),
                ("USA", [(2020, 2, 83.7), (2021, 2, 83.7), (2022, 2, 84.1), (2023, 2, 84.8), (2024, 2, 85.0)])
            ]),
            ("economy", "global-innovation-index", "Global Innovation Index", "Score (0-100)", "WIPO Innovation index ranking.", True, 12, [
                ("IND", [(2020, 48, 35.6), (2021, 46, 36.4), (2022, 40, 38.0), (2023, 40, 38.1), (2024, 39, 38.3)]),
                ("JPN", [(2020, 16, 52.7), (2021, 13, 54.5), (2022, 13, 53.6), (2023, 13, 54.6), (2024, 13, 55.1)]),
                ("USA", [(2020, 3, 60.1), (2021, 3, 61.3), (2022, 2, 61.8), (2023, 3, 62.4), (2024, 3, 62.4)])
            ]),
            ("economy", "economic-freedom-index", "Economic Freedom Index", "Score (0-100)", "Heritage / Fraser economic freedom score.", True, 1, [
                ("IND", [(2020, 120, 56.5), (2021, 121, 56.5), (2022, 131, 52.9), (2023, 131, 52.9), (2024, 126, 54.1)])
            ]),
            ("economy", "logistics-performance-index", "Logistics Performance Index", "Score (1-5)", "World Bank LPI rating.", True, 1, [
                ("IND", [(2020, 44, 3.18), (2021, 44, 3.18), (2022, 38, 3.40), (2023, 38, 3.40), (2024, 38, 3.40)])
            ]),
            ("economy", "foreign-direct-investment", "Foreign Direct Investment (FDI)", "USD Billion", "Inward FDI flows.", True, 1, [
                ("IND", [(2020, 5, 64.0), (2021, 7, 45.0), (2022, 8, 49.0), (2023, 9, 28.0), (2024, 8, 32.0)])
            ]),

            # 2. Society
            ("society", "human-development-index", "Human Development Index (HDI)", "Score (0-1)", "UNDP composite statistic of life expectancy, education, and income.", True, 3, [
                ("IND", [(2020, 131, 0.642), (2021, 132, 0.633), (2022, 134, 0.644), (2023, 134, 0.644), (2024, 134, 0.644)]),
                ("JPN", [(2020, 19, 0.923), (2021, 19, 0.920), (2022, 24, 0.920), (2023, 24, 0.920), (2024, 24, 0.920)]),
                ("USA", [(2020, 17, 0.926), (2021, 21, 0.921), (2022, 20, 0.927), (2023, 20, 0.927), (2024, 20, 0.927)])
            ]),
            ("society", "world-happiness-report", "World Happiness Report", "Score (0-10)", "UN Sustainable Development Solutions Network happiness ranking.", True, 3, [
                ("IND", [(2020, 144, 3.573), (2021, 139, 3.819), (2022, 136, 3.777), (2023, 126, 4.036), (2024, 126, 4.054)]),
                ("USA", [(2020, 18, 6.940), (2021, 19, 6.951), (2022, 16, 6.977), (2023, 15, 6.894), (2024, 23, 6.725)])
            ]),
            ("society", "social-progress-index", "Social Progress Index", "Score (0-100)", "Social Progress Imperative score.", True, 3, [
                ("IND", [(2020, 117, 56.8), (2021, 115, 58.6), (2022, 110, 60.2), (2023, 108, 60.8), (2024, 105, 61.2)])
            ]),
            ("society", "quality-of-life-index", "Quality of Life Index", "Score", "Numbeo quality of life score.", True, 17, [
                ("IND", [(2020, 50, 108.6), (2021, 49, 110.2), (2022, 52, 112.5), (2023, 50, 114.1), (2024, 48, 116.5)])
            ]),
            ("society", "human-capital-index", "Human Capital Index", "Score (0-1)", "World Bank HCI score.", True, 1, [
                ("IND", [(2020, 116, 0.49), (2021, 116, 0.49), (2022, 114, 0.50), (2023, 112, 0.51), (2024, 110, 0.52)])
            ]),
            ("society", "multidimensional-poverty-index", "Multidimensional Poverty Index", "%", "Percentage of population in multidimensional poverty.", False, 3, [
                ("IND", [(2020, 60, 27.9), (2021, 55, 21.1), (2022, 50, 16.4), (2023, 45, 14.9), (2024, 40, 11.28)])
            ]),
            ("society", "cost-of-living-index", "Cost of Living Index", "Score", "Numbeo cost of living relative to NYC.", False, 17, [
                ("IND", [(2020, 130, 24.2), (2021, 132, 23.8), (2022, 135, 22.9), (2023, 138, 22.1), (2024, 140, 21.5)])
            ]),
            ("society", "population-growth-rate", "Population Growth Rate", "%", "Annual population growth rate.", True, 1, [
                ("IND", [(2020, 65, 0.99), (2021, 70, 0.80), (2022, 75, 0.68), (2023, 80, 0.62), (2024, 82, 0.58)])
            ]),
            ("society", "urbanization-rate", "Urbanization Rate", "%", "Percentage of total population living in urban areas.", True, 1, [
                ("IND", [(2020, 120, 34.9), (2021, 118, 35.4), (2022, 115, 35.9), (2023, 112, 36.4), (2024, 110, 36.9)])
            ]),

            # 3. Governance
            ("governance", "corruption-perceptions-index", "Corruption Perceptions Index", "Score (0-100)", "Transparency International CPI score.", True, 7, [
                ("IND", [(2020, 86, 40), (2021, 85, 40), (2022, 85, 40), (2023, 93, 39), (2024, 93, 39)]),
                ("JPN", [(2020, 19, 74), (2021, 18, 73), (2022, 18, 73), (2023, 16, 73), (2024, 16, 73)]),
                ("USA", [(2020, 25, 67), (2021, 27, 67), (2022, 24, 69), (2023, 24, 69), (2024, 24, 69)])
            ]),
            ("governance", "democracy-index", "Democracy Index", "Score (0-10)", "Economist Intelligence Unit Democracy Index.", True, 18, [
                ("IND", [(2020, 53, 6.61), (2021, 46, 6.91), (2022, 46, 7.04), (2023, 41, 7.18), (2024, 41, 7.18)])
            ]),
            ("governance", "rule-of-law-index", "Rule of Law Index", "Score (0-1)", "World Justice Project Rule of Law score.", True, 10, [
                ("IND", [(2020, 69, 0.51), (2021, 77, 0.50), (2022, 77, 0.50), (2023, 79, 0.50), (2024, 79, 0.50)])
            ]),
            ("governance", "press-freedom-index", "Press Freedom Index", "Rank", "Reporters Without Borders Press Freedom ranking.", False, 8, [
                ("IND", [(2020, 142, 45.3), (2021, 142, 46.5), (2022, 150, 41.0), (2023, 161, 36.6), (2024, 159, 37.4)])
            ]),
            ("governance", "government-effectiveness", "Government Effectiveness", "Percentile", "World Bank Governance Indicator percentile.", True, 1, [
                ("IND", [(2020, 55, 62.5), (2021, 52, 64.1), (2022, 50, 67.3), (2023, 48, 69.1), (2024, 45, 71.0)])
            ]),
            ("governance", "political-stability-index", "Political Stability Index", "Percentile", "World Bank Governance Indicator percentile.", True, 1, [
                ("IND", [(2020, 120, 24.5), (2021, 118, 26.2), (2022, 115, 28.1), (2023, 112, 30.5), (2024, 110, 32.0)])
            ]),
            ("governance", "regulatory-quality", "Regulatory Quality", "Percentile", "World Bank Governance Indicator percentile.", True, 1, [
                ("IND", [(2020, 80, 47.1), (2021, 78, 48.5), (2022, 75, 51.0), (2023, 72, 53.2), (2024, 70, 55.0)])
            ]),
            ("governance", "voice-and-accountability", "Voice & Accountability", "Percentile", "World Bank Governance Indicator percentile.", True, 1, [
                ("IND", [(2020, 75, 56.0), (2021, 76, 54.5), (2022, 78, 52.1), (2023, 80, 50.8), (2024, 80, 50.8)])
            ]),
            ("governance", "open-budget-index", "Open Budget Index", "Score (0-100)", "International Budget Partnership score.", True, 1, [
                ("IND", [(2020, 53, 49.0), (2021, 53, 49.0), (2022, 53, 49.0), (2023, 50, 51.0), (2024, 50, 51.0)])
            ]),

            # 4. Technology & Innovation
            ("technology-innovation", "ai-readiness-index", "AI Readiness Index", "Score (0-100)", "Oxford Insights Government AI Readiness score.", True, 9, [
                ("IND", [(2020, 40, 56.2), (2021, 38, 58.4), (2022, 32, 60.7), (2023, 28, 64.2), (2024, 25, 68.5)]),
                ("USA", [(2020, 1, 85.4), (2021, 1, 88.2), (2022, 1, 89.0), (2023, 1, 91.2), (2024, 1, 92.5)])
            ]),
            ("technology-innovation", "network-readiness-index", "Network Readiness Index", "Score (0-100)", "Portulans Institute NRI score.", True, 11, [
                ("IND", [(2020, 88, 41.5), (2021, 67, 49.7), (2022, 61, 51.2), (2023, 60, 52.6), (2024, 60, 53.8)])
            ]),
            ("technology-innovation", "global-cybersecurity-index", "Global Cybersecurity Index", "Score (0-100)", "ITU Global Cybersecurity Index.", True, 11, [
                ("IND", [(2020, 10, 97.5), (2021, 10, 97.5), (2022, 10, 97.5), (2023, 10, 97.5), (2024, 10, 98.2)])
            ]),
            ("technology-innovation", "startup-ecosystem-ranking", "Startup Ecosystem Ranking", "Rank", "StartupBlink global ranking.", False, 13, [
                ("IND", [(2020, 17, 10.4), (2021, 14, 14.5), (2022, 13, 16.8), (2023, 13, 17.2), (2024, 13, 18.5)])
            ]),
            ("technology-innovation", "ict-development-index", "ICT Development Index", "Score (0-100)", "ITU ICT Development score.", True, 11, [
                ("IND", [(2020, 100, 48.0), (2021, 95, 52.0), (2022, 85, 65.0), (2023, 75, 72.0), (2024, 70, 78.5)])
            ]),
            ("technology-innovation", "internet-penetration", "Internet Penetration", "%", "Percentage of population using internet.", True, 11, [
                ("IND", [(2020, 43.0, 43.0), (2021, 47.0, 47.0), (2022, 52.0, 52.0), (2023, 55.0, 55.0), (2024, 60.0, 60.0)])
            ]),
            ("technology-innovation", "broadband-speed-ranking", "Broadband Speed Ranking", "Rank", "Ookla Speedtest global median ranking.", False, 11, [
                ("IND", [(2020, 130, 12.5), (2021, 115, 18.2), (2022, 105, 25.4), (2023, 55, 58.1), (2024, 45, 95.8)])
            ]),
            ("technology-innovation", "mobile-connectivity-index", "Mobile Connectivity Index", "Score (0-100)", "GSMA Mobile Connectivity score.", True, 11, [
                ("IND", [(2020, 80, 55.0), (2021, 75, 58.0), (2022, 70, 62.0), (2023, 65, 66.0), (2024, 62, 69.5)])
            ]),
            ("technology-innovation", "rd-expenditure", "R&D Expenditure", "% of GDP", "Gross domestic expenditure on R&D.", True, 12, [
                ("IND", [(2020, 50, 0.65), (2021, 50, 0.65), (2022, 48, 0.68), (2023, 46, 0.70), (2024, 45, 0.72)])
            ]),
            ("technology-innovation", "patents-per-million-population", "Patents per Million Population", "Count", "WIPO patent applications per million.", True, 12, [
                ("IND", [(2020, 65, 42.0), (2021, 60, 48.5), (2022, 55, 55.2), (2023, 50, 62.8), (2024, 45, 71.4)])
            ]),

            # 5. Education
            ("education", "education-index", "Education Index", "Score (0-1)", "UN Human Development Education score.", True, 5, [
                ("IND", [(2020, 125, 0.540), (2021, 122, 0.552), (2022, 120, 0.565), (2023, 118, 0.578), (2024, 115, 0.590)])
            ]),
            ("education", "literacy-rate", "Literacy Rate", "%", "Adult literacy rate percentage.", True, 5, [
                ("IND", [(2020, 110, 74.4), (2021, 108, 76.3), (2022, 105, 77.7), (2023, 102, 79.1), (2024, 100, 80.5)])
            ]),
            ("education", "school-enrollment-rate", "School Enrollment Rate", "%", "Gross tertiary school enrollment rate.", True, 5, [
                ("IND", [(2020, 85, 27.1), (2021, 82, 27.9), (2022, 80, 28.4), (2023, 78, 29.2), (2024, 75, 30.1)])
            ]),
            ("education", "qs-world-university-rankings", "QS World University Rankings", "Top Universities Count", "Number of universities in Top 500.", True, 5, [
                ("IND", [(2020, 9, 8), (2021, 9, 8), (2022, 9, 9), (2023, 8, 11), (2024, 7, 14)])
            ]),
            ("education", "times-higher-education-rankings", "Times Higher Education Rankings", "Rank", "THE top institutions representation.", True, 5, [
                ("IND", [(2020, 10, 56), (2021, 10, 63), (2022, 9, 71), (2023, 8, 75), (2024, 6, 91)])
            ]),
            ("education", "pisa-rankings", "PISA Rankings", "Score", "OECD Programme for International Student Assessment score.", True, 5, [
                ("IND", [(2020, 70, 335), (2021, 70, 335), (2022, 70, 335), (2023, 68, 345), (2024, 68, 345)])
            ]),
            ("education", "global-skills-index", "Global Skills Index", "Percentile", "Coursera Global Skills report score.", True, 5, [
                ("IND", [(2020, 51, 48.0), (2021, 50, 50.0), (2022, 45, 56.0), (2023, 40, 62.0), (2024, 38, 65.0)])
            ]),
            ("education", "student-teacher-ratio", "Student Teacher Ratio", "Ratio", "Primary education pupil-teacher ratio.", False, 5, [
                ("IND", [(2020, 95, 30.0), (2021, 90, 28.0), (2022, 85, 26.0), (2023, 80, 24.0), (2024, 75, 23.0)])
            ]),

            # 6. Healthcare
            ("healthcare", "healthcare-index", "Healthcare Index", "Score (0-100)", "Numbeo Health Care Index score.", True, 17, [
                ("IND", [(2020, 65, 64.5), (2021, 62, 65.8), (2022, 60, 66.9), (2023, 58, 67.5), (2024, 55, 68.2)])
            ]),
            ("healthcare", "universal-health-coverage-index", "Universal Health Coverage Index", "Score (0-100)", "WHO UHC service coverage index.", True, 4, [
                ("IND", [(2020, 100, 61.0), (2021, 95, 63.0), (2022, 90, 65.0), (2023, 85, 67.0), (2024, 82, 69.0)])
            ]),
            ("healthcare", "healthcare-access-and-quality-index", "Healthcare Access & Quality Index", "Score (0-100)", "Lancet HAQ Index score.", True, 4, [
                ("IND", [(2020, 112, 44.8), (2021, 110, 46.2), (2022, 105, 48.5), (2023, 100, 51.0), (2024, 98, 52.8)])
            ]),
            ("healthcare", "life-expectancy", "Life Expectancy", "Years", "Life expectancy at birth.", True, 4, [
                ("IND", [(2020, 130, 69.7), (2021, 132, 67.2), (2022, 128, 68.5), (2023, 125, 70.4), (2024, 120, 71.2)])
            ]),
            ("healthcare", "infant-mortality", "Infant Mortality", "per 1,000 live births", "Infant mortality rate.", False, 4, [
                ("IND", [(2020, 115, 29.8), (2021, 110, 28.3), (2022, 105, 26.6), (2023, 100, 25.1), (2024, 95, 24.0)])
            ]),
            ("healthcare", "maternal-mortality", "Maternal Mortality", "per 100,000 live births", "Maternal mortality ratio.", False, 4, [
                ("IND", [(2020, 105, 113.0), (2021, 100, 103.0), (2022, 95, 97.0), (2023, 90, 89.0), (2024, 85, 82.0)])
            ]),
            ("healthcare", "physicians-per-1000-people", "Physicians per 1,000 People", "Count", "Physicians density per 1,000.", True, 4, [
                ("IND", [(2020, 110, 0.74), (2021, 105, 0.82), (2022, 100, 0.88), (2023, 95, 0.92), (2024, 90, 0.98)])
            ]),
            ("healthcare", "hospital-beds-per-1000-people", "Hospital Beds per 1,000 People", "Count", "Hospital beds density per 1,000.", True, 4, [
                ("IND", [(2020, 135, 0.53), (2021, 130, 0.60), (2022, 125, 0.70), (2023, 120, 0.80), (2024, 115, 0.90)])
            ]),
            ("healthcare", "vaccination-coverage", "Vaccination Coverage", "%", "DTP3 immunization coverage among 1-year-olds.", True, 4, [
                ("IND", [(2020, 85, 85.0), (2021, 88, 87.0), (2022, 90, 91.0), (2023, 92, 93.0), (2024, 93, 94.0)])
            ]),

            # 7. Environment
            ("environment", "environmental-performance-index", "Environmental Performance Index", "Score (0-100)", "Yale EPI score.", True, 14, [
                ("IND", [(2020, 168, 27.6), (2021, 168, 27.6), (2022, 180, 18.9), (2023, 180, 18.9), (2024, 176, 20.2)])
            ]),
            ("environment", "climate-change-performance-index", "Climate Change Performance Index", "Rank", "Germanwatch CCPI ranking.", False, 15, [
                ("IND", [(2020, 9, 66.0), (2021, 10, 63.9), (2022, 8, 67.3), (2023, 7, 70.2), (2024, 7, 70.2)])
            ]),
            ("environment", "air-quality-ranking", "Air Quality Ranking", "PM2.5 μg/m³", "IQAir annual PM2.5 ranking (lower score = cleaner).", False, 16, [
                ("IND", [(2020, 177, 51.9), (2021, 175, 58.1), (2022, 172, 53.3), (2023, 177, 54.4), (2024, 175, 52.1)])
            ]),
            ("environment", "co2-emissions-per-capita", "CO₂ Emissions per Capita", "Metric Tons", "Metric tons CO2 per person.", False, 18, [
                ("IND", [(2020, 120, 1.7), (2021, 118, 1.8), (2022, 115, 1.9), (2023, 112, 2.0), (2024, 110, 2.0)])
            ]),
            ("environment", "renewable-energy-share", "Renewable Energy Share", "%", "Renewable share of electricity generation.", True, 18, [
                ("IND", [(2020, 45, 19.5), (2021, 42, 20.8), (2022, 38, 21.9), (2023, 32, 23.1), (2024, 28, 24.5)])
            ]),
            ("environment", "forest-cover", "Forest Cover", "%", "Forest area as percentage of land area.", True, 1, [
                ("IND", [(2020, 75, 24.56), (2021, 74, 24.62), (2022, 73, 24.65), (2023, 72, 24.70), (2024, 71, 24.75)])
            ]),
            ("environment", "water-stress-index", "Water Stress Index", "Score (0-5)", "WRI Aqueduct water stress score.", False, 18, [
                ("IND", [(2020, 16, 4.12), (2021, 16, 4.12), (2022, 15, 4.18), (2023, 14, 4.22), (2024, 14, 4.22)])
            ]),
            ("environment", "climate-risk-index", "Climate Risk Index", "Score", "Germanwatch Global Climate Risk Index.", False, 15, [
                ("IND", [(2020, 5, 16.6), (2021, 7, 20.2), (2022, 7, 20.2), (2023, 8, 22.1), (2024, 8, 22.1)])
            ]),
            ("environment", "sustainable-development-goals-sdg-score", "Sustainable Development Goals (SDG) Score", "Score (0-100)", "UN SDSN SDG Index score.", True, 3, [
                ("IND", [(2020, 117, 61.9), (2021, 120, 60.1), (2022, 121, 60.3), (2023, 112, 63.4), (2024, 109, 66.8)])
            ]),

            # 8. Safety
            ("safety", "global-peace-index", "Global Peace Index", "Score", "Institute for Economics & Peace GPI score.", False, 18, [
                ("IND", [(2020, 139, 2.57), (2021, 135, 2.55), (2022, 135, 2.57), (2023, 126, 2.31), (2024, 116, 2.29)])
            ]),
            ("safety", "crime-index", "Crime Index", "Score", "Numbeo Crime Index score.", False, 17, [
                ("IND", [(2020, 68, 44.5), (2021, 70, 44.2), (2022, 72, 44.1), (2023, 75, 44.0), (2024, 77, 43.8)])
            ]),
            ("safety", "safety-index", "Safety Index", "Score", "Numbeo Safety Index score.", True, 17, [
                ("IND", [(2020, 62, 55.5), (2021, 60, 55.8), (2022, 58, 55.9), (2023, 55, 56.0), (2024, 53, 56.2)])
            ]),
            ("safety", "terrorism-index", "Terrorism Index", "Score", "Global Terrorism Index score.", False, 18, [
                ("IND", [(2020, 8, 7.35), (2021, 12, 7.22), (2022, 13, 7.17), (2023, 13, 7.17), (2024, 14, 6.95)])
            ]),
            ("safety", "road-safety-ranking", "Road Safety Ranking", "Deaths per 100k", "WHO road traffic fatal injury rate.", False, 4, [
                ("IND", [(2020, 110, 15.6), (2021, 108, 15.3), (2022, 105, 14.8), (2023, 102, 14.2), (2024, 100, 13.8)])
            ]),
            ("safety", "disaster-risk-index", "Disaster Risk Index", "Score", "World Risk Report WRI index.", False, 18, [
                ("IND", [(2020, 85, 6.8), (2021, 80, 7.1), (2022, 3, 41.5), (2023, 3, 41.5), (2024, 3, 41.5)])
            ]),

            # 9. Equality
            ("equality", "global-gender-gap-index", "Global Gender Gap Index", "Score (0-1)", "WEF Gender Gap Report score.", True, 6, [
                ("IND", [(2020, 112, 0.668), (2021, 140, 0.625), (2022, 135, 0.629), (2023, 127, 0.643), (2024, 129, 0.641)])
            ]),
            ("equality", "gender-inequality-index", "Gender Inequality Index", "Score (0-1)", "UNDP GII score.", False, 3, [
                ("IND", [(2020, 123, 0.501), (2021, 122, 0.490), (2022, 115, 0.437), (2023, 108, 0.437), (2024, 108, 0.437)])
            ]),
            ("equality", "gini-coefficient", "Gini Coefficient", "Score (0-100)", "World Bank Gini index measure of inequality.", False, 1, [
                ("IND", [(2020, 80, 35.7), (2021, 78, 35.7), (2022, 75, 34.2), (2023, 72, 33.8), (2024, 70, 33.2)])
            ]),
            ("equality", "womens-economic-participation", "Women's Economic Participation", "Score (0-1)", "WEF sub-index score.", True, 6, [
                ("IND", [(2020, 149, 0.354), (2021, 151, 0.326), (2022, 143, 0.350), (2023, 142, 0.367), (2024, 140, 0.398)])
            ]),
            ("equality", "female-labour-force-participation", "Female Labour Force Participation", "%", "Female labor participation rate.", True, 1, [
                ("IND", [(2020, 140, 18.6), (2021, 135, 22.3), (2022, 125, 32.8), (2023, 115, 37.0), (2024, 105, 41.7)])
            ]),
            ("equality", "equal-pay-indicators", "Equal Pay Indicators", "Score (0-1)", "WEF wage equality for similar work score.", True, 6, [
                ("IND", [(2020, 110, 0.56), (2021, 108, 0.58), (2022, 100, 0.61), (2023, 95, 0.64), (2024, 90, 0.67)])
            ]),

            # 10. Digital Government
            ("digital-government", "e-government-development-index", "E-Government Development Index", "Score (0-1)", "UN EGDI score.", True, 19, [
                ("IND", [(2020, 100, 0.596), (2021, 100, 0.596), (2022, 105, 0.600), (2023, 100, 0.650), (2024, 97, 0.710)])
            ]),
            ("digital-government", "e-participation-index", "E-Participation Index", "Score (0-1)", "UN EPI score.", True, 19, [
                ("IND", [(2020, 29, 0.857), (2021, 29, 0.857), (2022, 57, 0.602), (2023, 50, 0.710), (2024, 45, 0.780)])
            ]),
            ("digital-government", "govtech-maturity-index", "GovTech Maturity Index", "Group (A-D)", "World Bank GovTech Maturity rating.", True, 1, [
                ("IND", [(2020, 1, 0.88), (2021, 1, 0.88), (2022, 1, 0.91), (2023, 1, 0.93), (2024, 1, 0.95)])
            ]),
            ("digital-government", "open-data-inventory", "Open Data Inventory", "Score (0-100)", "Open Data Watch ODIN score.", True, 18, [
                ("IND", [(2020, 65, 58.0), (2021, 60, 61.2), (2022, 55, 64.5), (2023, 48, 68.0), (2024, 42, 72.4)])
            ]),
            ("digital-government", "digital-competitiveness-ranking", "Digital Competitiveness Ranking", "Rank", "IMD World Digital Competitiveness rank.", False, 18, [
                ("IND", [(2020, 48, 65.4), (2021, 46, 68.2), (2022, 44, 71.0), (2023, 49, 70.1), (2024, 47, 72.8)])
            ])
        ]

        count_ind = 0
        count_rank = 0

        for cat_slug, ind_slug, ind_name, unit, desc, higher_better, default_source_id, rankings_list in indicators_def:
            category_obj = cat_map[cat_slug]
            ind_obj = models.Indicator(
                slug=ind_slug,
                name=ind_name,
                category_id=category_obj.id,
                unit=unit,
                description=desc,
                higher_is_better=higher_better
            )
            db.add(ind_obj)
            db.flush()
            count_ind += 1

            for country_code, points in rankings_list:
                c_obj = country_map.get(country_code)
                if not c_obj:
                    continue

                for yr, r_val, val in points:
                    hr = models.HistoricalRanking(
                        country_id=c_obj.id,
                        indicator_id=ind_obj.id,
                        year=yr,
                        rank=r_val,
                        value=val,
                        unit=unit,
                        source_id=default_source_id,
                        last_updated=f"{yr}-12"
                    )
                    db.add(hr)
                    count_rank += 1

        db.commit()
        print(f"Database successfully seeded with {len(country_map)} countries, {len(cat_map)} categories, {count_ind} indicators, and {count_rank} historical ranking data points!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
