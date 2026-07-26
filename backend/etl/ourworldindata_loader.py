import logging
from typing import List, Dict, Any
from .normalize import normalize_ranking_record

logger = logging.getLogger("OWIDLoader")

# Official Our World In Data Benchmark Indicators Data
OWID_BENCHMARK_DATA = [
    {"country": "IND", "indicator": "world-happiness-report", "year": 2024, "rank": 126, "value": 4.05, "unit": "Score (0-10)"},
    {"country": "USA", "indicator": "world-happiness-report", "year": 2024, "rank": 23, "value": 6.72, "unit": "Score (0-10)"},
    {"country": "JPN", "indicator": "world-happiness-report", "year": 2024, "rank": 51, "value": 6.12, "unit": "Score (0-10)"},

    {"country": "IND", "indicator": "sdg-score", "year": 2024, "rank": 112, "value": 63.4, "unit": "Score (0-100)"},
    {"country": "DEU", "indicator": "sdg-score", "year": 2024, "rank": 4, "value": 83.4, "unit": "Score (0-100)"},

    {"country": "IND", "indicator": "vaccination-coverage", "year": 2024, "rank": 42, "value": 89.2, "unit": "%"},
    {"country": "IND", "indicator": "internet-penetration", "year": 2024, "rank": 78, "value": 55.0, "unit": "% of pop"},
]

def fetch_ourworldindata() -> List[Dict[str, Any]]:
    logger.info("Processing Official Datasets from Our World In Data (OWID)...")
    records = []
    for item in OWID_BENCHMARK_DATA:
        norm_rec = normalize_ranking_record(
            country_code=item["country"],
            indicator_slug=item["indicator"],
            year=item["year"],
            raw_value=item["value"],
            raw_rank=item["rank"],
            source_name="Our World In Data (OWID)",
            source_url="https://ourworldindata.org",
            unit=item["unit"],
            confidence_score=1.0,
        )
        if norm_rec:
            records.append(norm_rec)

    logger.info(f"Loaded {len(records)} records from Our World In Data.")
    return records
