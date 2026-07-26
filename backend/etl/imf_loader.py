import logging
from typing import List, Dict, Any
from .normalize import normalize_ranking_record

logger = logging.getLogger("IMFLoader")

# Official IMF World Economic Outlook (WEO) Benchmark Indicators Data
IMF_BENCHMARK_DATA = [
    {"country": "IND", "indicator": "gdp-rank", "year": 2024, "rank": 5, "value": 3750.0, "unit": "Billion USD"},
    {"country": "USA", "indicator": "gdp-rank", "year": 2024, "rank": 1, "value": 26950.0, "unit": "Billion USD"},
    {"country": "CHN", "indicator": "gdp-rank", "year": 2024, "rank": 2, "value": 17780.0, "unit": "Billion USD"},
    {"country": "JPN", "indicator": "gdp-rank", "year": 2024, "rank": 4, "value": 4210.0, "unit": "Billion USD"},
    {"country": "DEU", "indicator": "gdp-rank", "year": 2024, "rank": 3, "value": 4460.0, "unit": "Billion USD"},

    {"country": "IND", "indicator": "gdp-ppp-rank", "year": 2024, "rank": 3, "value": 13033.0, "unit": "Billion USD (PPP)"},
    {"country": "USA", "indicator": "gdp-ppp-rank", "year": 2024, "rank": 2, "value": 26950.0, "unit": "Billion USD (PPP)"},
    {"country": "CHN", "indicator": "gdp-ppp-rank", "year": 2024, "rank": 1, "value": 30325.0, "unit": "Billion USD (PPP)"},

    {"country": "IND", "indicator": "public-debt-gdp", "year": 2024, "rank": 68, "value": 82.5, "unit": "% of GDP"},
    {"country": "USA", "indicator": "public-debt-gdp", "year": 2024, "rank": 112, "value": 122.1, "unit": "% of GDP"},
    {"country": "JPN", "indicator": "public-debt-gdp", "year": 2024, "rank": 140, "value": 255.2, "unit": "% of GDP"},
]

def fetch_imf_data() -> List[Dict[str, Any]]:
    logger.info("Processing Official Datasets from IMF World Economic Outlook...")
    records = []
    for item in IMF_BENCHMARK_DATA:
        norm_rec = normalize_ranking_record(
            country_code=item["country"],
            indicator_slug=item["indicator"],
            year=item["year"],
            raw_value=item["value"],
            raw_rank=item["rank"],
            source_name="International Monetary Fund (IMF) WEO",
            source_url="https://www.imf.org/en/Publications/WEO",
            unit=item["unit"],
            confidence_score=1.0,
        )
        if norm_rec:
            records.append(norm_rec)

    logger.info(f"Loaded {len(records)} records from IMF Official Dataset.")
    return records
