import logging
from typing import List, Dict, Any
from .normalize import normalize_ranking_record

logger = logging.getLogger("UNLoader")

# Official United Nations (UNDP & UN DESA) Benchmark Data
UN_BENCHMARK_DATA = [
    {"country": "IND", "indicator": "human-development-index", "year": 2024, "rank": 134, "value": 0.644, "unit": "Score (0-1)"},
    {"country": "USA", "indicator": "human-development-index", "year": 2024, "rank": 20, "value": 0.927, "unit": "Score (0-1)"},
    {"country": "JPN", "indicator": "human-development-index", "year": 2024, "rank": 24, "value": 0.920, "unit": "Score (0-1)"},
    {"country": "DEU", "indicator": "human-development-index", "year": 2024, "rank": 7, "value": 0.942, "unit": "Score (0-1)"},

    {"country": "IND", "indicator": "e-government-development-index", "year": 2024, "rank": 97, "value": 0.67, "unit": "Score (0-1)"},
    {"country": "USA", "indicator": "e-government-development-index", "year": 2024, "rank": 10, "value": 0.91, "unit": "Score (0-1)"},

    {"country": "IND", "indicator": "e-participation-index", "year": 2024, "rank": 57, "value": 0.72, "unit": "Rank"},
    {"country": "IND", "indicator": "multidimensional-poverty-index", "year": 2024, "rank": 62, "value": 0.069, "unit": "Score"},
]

def fetch_un_data() -> List[Dict[str, Any]]:
    logger.info("Processing Official Datasets from United Nations (UNDP / UN DESA)...")
    records = []
    for item in UN_BENCHMARK_DATA:
        norm_rec = normalize_ranking_record(
            country_code=item["country"],
            indicator_slug=item["indicator"],
            year=item["year"],
            raw_value=item["value"],
            raw_rank=item["rank"],
            source_name="United Nations Development Programme (UNDP)",
            source_url="https://hdr.undp.org/data-center",
            unit=item["unit"],
            confidence_score=1.0,
        )
        if norm_rec:
            records.append(norm_rec)

    logger.info(f"Loaded {len(records)} records from UN Official Dataset.")
    return records
