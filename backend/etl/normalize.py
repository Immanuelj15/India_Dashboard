import re
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger("ETL_Normalize")

COUNTRY_CODE_MAP = {
    "INDIA": "IND",
    "IN": "IND",
    "IND": "IND",
    "UNITED STATES": "USA",
    "UNITED STATES OF AMERICA": "USA",
    "US": "USA",
    "USA": "USA",
    "CHINA": "CHN",
    "CN": "CHN",
    "CHN": "CHN",
    "JAPAN": "JPN",
    "JP": "JPN",
    "JPN": "JPN",
    "GERMANY": "DEU",
    "DE": "DEU",
    "DEU": "DEU",
    "UNITED KINGDOM": "GBR",
    "UK": "GBR",
    "GB": "GBR",
    "GBR": "GBR",
    "BRAZIL": "BRA",
    "BR": "BRA",
    "BRA": "BRA",
    "SOUTH AFRICA": "ZAF",
    "ZA": "ZAF",
    "ZAF": "ZAF",
}

def normalize_country_code(raw_name_or_code: str) -> Optional[str]:
    if not raw_name_or_code:
        return None
    cleaned = str(raw_name_or_code).strip().upper()
    return COUNTRY_CODE_MAP.get(cleaned)

def clean_numeric_value(raw_val: Any) -> Optional[float]:
    if raw_val is None:
        return None
    try:
        val_str = str(raw_val).replace(",", "").replace("$", "").replace("%", "").strip()
        return float(val_str)
    except (ValueError, TypeError):
        return None

def normalize_ranking_record(
    country_code: str,
    indicator_slug: str,
    year: int,
    raw_value: Optional[float],
    raw_rank: Optional[int],
    source_name: str,
    source_url: str,
    unit: str = "Score",
    confidence_score: float = 1.0
) -> Optional[Dict[str, Any]]:
    # Validation
    norm_code = normalize_country_code(country_code)
    if not norm_code:
        logger.debug(f"Rejected record due to unmapped country: {country_code}")
        return None

    if not (2000 <= year <= 2026):
        logger.debug(f"Rejected record due to invalid year: {year}")
        return None

    val = clean_numeric_value(raw_value)
    rank = int(raw_rank) if raw_rank is not None and str(raw_rank).isdigit() else None

    if val is None and rank is None:
        logger.debug(f"Rejected record with both null rank and null value for {norm_code} - {indicator_slug}")
        return None

    return {
        "country_code": norm_code,
        "indicator_slug": indicator_slug,
        "year": int(year),
        "rank": rank,
        "value": val,
        "unit": unit,
        "source_name": source_name,
        "source_url": source_url,
        "confidence_score": float(confidence_score),
    }
