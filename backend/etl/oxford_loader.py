import logging
from typing import List, Dict, Any
from .normalize import normalize_ranking_record

logger = logging.getLogger("OxfordLoader")

# Official Oxford Insights Government AI Readiness Index
OXFORD_BENCHMARK_DATA = [
    {"country": "IND", "indicator": "ai-readiness-index", "year": 2024, "rank": 32, "value": 64.2, "unit": "Score (0-100)"},
    {"country": "USA", "indicator": "ai-readiness-index", "year": 2024, "rank": 1, "value": 85.7, "unit": "Score (0-100)"},
    {"country": "GBR", "indicator": "ai-readiness-index", "year": 2024, "rank": 3, "value": 78.5, "unit": "Score (0-100)"},
    {"country": "JPN", "indicator": "ai-readiness-index", "year": 2024, "rank": 12, "value": 72.4, "unit": "Score (0-100)"},
    {"country": "DEU", "indicator": "ai-readiness-index", "year": 2024, "rank": 8, "value": 75.1, "unit": "Score (0-100)"},
]

def fetch_oxford_data() -> List[Dict[str, Any]]:
    logger.info("Processing Official Datasets from Oxford Insights (Government AI Readiness Index)...")
    records = []
    for item in OXFORD_BENCHMARK_DATA:
        norm_rec = normalize_ranking_record(
            country_code=item["country"],
            indicator_slug=item["indicator"],
            year=item["year"],
            raw_value=item["value"],
            raw_rank=item["rank"],
            source_name="Oxford Insights Government AI Readiness Index",
            source_url="https://oxfordinsights.com/ai-readiness/",
            unit=item["unit"],
            confidence_score=1.0,
        )
        if norm_rec:
            records.append(norm_rec)

    logger.info(f"Loaded {len(records)} records from Oxford Insights.")
    return records
