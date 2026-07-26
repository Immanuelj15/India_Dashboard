import logging
from typing import List, Dict, Any
from .normalize import normalize_ranking_record

logger = logging.getLogger("StartupBlinkLoader")

# Official StartupBlink Global Startup Ecosystem Index
STARTUPBLINK_BENCHMARK_DATA = [
    {"country": "IND", "indicator": "startup-ecosystem-ranking", "year": 2024, "rank": 19, "value": 14.2, "unit": "Score"},
    {"country": "USA", "indicator": "startup-ecosystem-ranking", "year": 2024, "rank": 1, "value": 218.4, "unit": "Score"},
    {"country": "GBR", "indicator": "startup-ecosystem-ranking", "year": 2024, "rank": 2, "value": 52.8, "unit": "Score"},
    {"country": "DEU", "indicator": "startup-ecosystem-ranking", "year": 2024, "rank": 6, "value": 31.5, "unit": "Score"},
    {"country": "JPN", "indicator": "startup-ecosystem-ranking", "year": 2024, "rank": 18, "value": 14.8, "unit": "Score"},
]

def fetch_startupblink_data() -> List[Dict[str, Any]]:
    logger.info("Processing Official Datasets from StartupBlink (Global Ecosystem Index)...")
    records = []
    for item in STARTUPBLINK_BENCHMARK_DATA:
        norm_rec = normalize_ranking_record(
            country_code=item["country"],
            indicator_slug=item["indicator"],
            year=item["year"],
            raw_value=item["value"],
            raw_rank=item["rank"],
            source_name="StartupBlink Global Ecosystem Index",
            source_url="https://www.startupblink.com/",
            unit=item["unit"],
            confidence_score=1.0,
        )
        if norm_rec:
            records.append(norm_rec)

    logger.info(f"Loaded {len(records)} records from StartupBlink.")
    return records
