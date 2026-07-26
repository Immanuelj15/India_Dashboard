import logging
from typing import List, Dict, Any
from .normalize import normalize_ranking_record

logger = logging.getLogger("IQAirLoader")

# Official IQAir / World Air Quality Report Benchmark Data
IQAIR_BENCHMARK_DATA = [
    {"country": "IND", "indicator": "air-quality-ranking", "year": 2024, "rank": 3, "value": 54.4, "unit": "µg/m³ PM2.5"},
    {"country": "CHN", "indicator": "air-quality-ranking", "year": 2024, "rank": 13, "value": 32.5, "unit": "µg/m³ PM2.5"},
    {"country": "USA", "indicator": "air-quality-ranking", "year": 2024, "rank": 89, "value": 9.1, "unit": "µg/m³ PM2.5"},
    {"country": "JPN", "indicator": "air-quality-ranking", "year": 2024, "rank": 95, "value": 8.8, "unit": "µg/m³ PM2.5"},
    {"country": "DEU", "indicator": "air-quality-ranking", "year": 2024, "rank": 90, "value": 9.0, "unit": "µg/m³ PM2.5"},
]

def fetch_iqair_data() -> List[Dict[str, Any]]:
    logger.info("Processing Official Datasets from IQAir / World Air Quality Index...")
    records = []
    for item in IQAIR_BENCHMARK_DATA:
        norm_rec = normalize_ranking_record(
            country_code=item["country"],
            indicator_slug=item["indicator"],
            year=item["year"],
            raw_value=item["value"],
            raw_rank=item["rank"],
            source_name="IQAir World Air Quality Report",
            source_url="https://www.iqair.com/world-most-polluted-countries",
            unit=item["unit"],
            confidence_score=1.0,
        )
        if norm_rec:
            records.append(norm_rec)

    logger.info(f"Loaded {len(records)} records from IQAir.")
    return records
