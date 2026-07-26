import logging
from typing import List, Dict, Any
from .normalize import normalize_ranking_record

logger = logging.getLogger("TransparencyLoader")

# Official Transparency International Corruption Perceptions Index (CPI)
CPI_BENCHMARK_DATA = [
    {"country": "IND", "indicator": "corruption-perceptions-index", "year": 2024, "rank": 93, "value": 39.0, "unit": "Score (0-100)"},
    {"country": "USA", "indicator": "corruption-perceptions-index", "year": 2024, "rank": 24, "value": 69.0, "unit": "Score (0-100)"},
    {"country": "JPN", "indicator": "corruption-perceptions-index", "year": 2024, "rank": 16, "value": 73.0, "unit": "Score (0-100)"},
    {"country": "DEU", "indicator": "corruption-perceptions-index", "year": 2024, "rank": 9, "value": 78.0, "unit": "Score (0-100)"},
    {"country": "GBR", "indicator": "corruption-perceptions-index", "year": 2024, "rank": 20, "value": 71.0, "unit": "Score (0-100)"},
]

def fetch_transparency_data() -> List[Dict[str, Any]]:
    logger.info("Processing Official Datasets from Transparency International (CPI)...")
    records = []
    for item in CPI_BENCHMARK_DATA:
        norm_rec = normalize_ranking_record(
            country_code=item["country"],
            indicator_slug=item["indicator"],
            year=item["year"],
            raw_value=item["value"],
            raw_rank=item["rank"],
            source_name="Transparency International (CPI)",
            source_url="https://www.transparency.org/en/cpi",
            unit=item["unit"],
            confidence_score=1.0,
        )
        if norm_rec:
            records.append(norm_rec)

    logger.info(f"Loaded {len(records)} records from Transparency International CPI.")
    return records
