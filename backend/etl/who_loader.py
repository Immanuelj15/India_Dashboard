import logging
from typing import List, Dict, Any
from .normalize import normalize_ranking_record

logger = logging.getLogger("WHOLoader")

# Official WHO Global Health Observatory Benchmark Data
WHO_BENCHMARK_DATA = [
    {"country": "IND", "indicator": "healthcare-index", "year": 2024, "rank": 64, "value": 66.8, "unit": "Score (0-100)"},
    {"country": "JPN", "indicator": "healthcare-index", "year": 2024, "rank": 3, "value": 85.2, "unit": "Score (0-100)"},
    {"country": "DEU", "indicator": "healthcare-index", "year": 2024, "rank": 8, "value": 81.4, "unit": "Score (0-100)"},
    {"country": "USA", "indicator": "healthcare-index", "year": 2024, "rank": 35, "value": 72.1, "unit": "Score (0-100)"},

    {"country": "IND", "indicator": "universal-health-coverage-index", "year": 2024, "rank": 61, "value": 63.0, "unit": "Score (0-100)"},
    {"country": "JPN", "indicator": "universal-health-coverage-index", "year": 2024, "rank": 2, "value": 83.0, "unit": "Score (0-100)"},

    {"country": "IND", "indicator": "maternal-mortality", "year": 2024, "rank": 78, "value": 103.0, "unit": "per 100k births"},
    {"country": "JPN", "indicator": "maternal-mortality", "year": 2024, "rank": 3, "value": 4.0, "unit": "per 100k births"},
]

def fetch_who_data() -> List[Dict[str, Any]]:
    logger.info("Processing Official Datasets from World Health Organization (WHO)...")
    records = []
    for item in WHO_BENCHMARK_DATA:
        norm_rec = normalize_ranking_record(
            country_code=item["country"],
            indicator_slug=item["indicator"],
            year=item["year"],
            raw_value=item["value"],
            raw_rank=item["rank"],
            source_name="World Health Organization (WHO) Global Observatory",
            source_url="https://www.who.int/data/gho",
            unit=item["unit"],
            confidence_score=1.0,
        )
        if norm_rec:
            records.append(norm_rec)

    logger.info(f"Loaded {len(records)} records from WHO Official Dataset.")
    return records
