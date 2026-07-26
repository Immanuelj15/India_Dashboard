import logging
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models import Country, Indicator, Source, HistoricalRanking

logger = logging.getLogger("ETL_DatabaseLoader")

def load_records_to_database(db: Session, records: List[Dict[str, Any]]) -> Dict[str, int]:
    stats = {"inserted": 0, "updated": 0, "skipped": 0, "failed": 0}

    # Pre-fetch lookup maps
    countries = {c.code: c.id for c in db.query(Country).all()}
    indicators = {i.slug: i.id for i in db.query(Indicator).all()}

    # Cache sources
    sources_cache = {}

    for rec in records:
        c_code = rec.get("country_code")
        i_slug = rec.get("indicator_slug")

        country_id = countries.get(c_code)
        indicator_id = indicators.get(i_slug)

        if not country_id or not indicator_id:
            stats["skipped"] += 1
            logger.debug(f"Skipping record: Country '{c_code}' or Indicator '{i_slug}' not found in DB.")
            continue

        source_name = rec.get("source_name", "Official Dataset")
        source_url = rec.get("source_url", "https://data.worldbank.org")

        if source_name not in sources_cache:
            src = db.query(Source).filter(Source.name == source_name).first()
            if not src:
                src = Source(name=source_name, url=source_url, description=f"Official dataset provider: {source_name}")
                db.add(src)
                db.commit()
                db.refresh(src)
            sources_cache[source_name] = src.id

        source_id = sources_cache[source_name]
        year = rec["year"]

        # Check existing historical ranking
        existing = (
            db.query(HistoricalRanking)
            .filter(
                HistoricalRanking.country_id == country_id,
                HistoricalRanking.indicator_id == indicator_id,
                HistoricalRanking.year == year,
            )
            .first()
        )

        if existing:
            # Update if value or rank changed
            if existing.rank != rec["rank"] or existing.value != rec["value"]:
                existing.rank = rec["rank"]
                existing.value = rec["value"]
                existing.unit = rec["unit"]
                existing.source_id = source_id
                existing.source_name = source_name
                existing.source_url = source_url
                existing.confidence_score = rec["confidence_score"]
                stats["updated"] += 1
            else:
                stats["skipped"] += 1
        else:
            # Insert new record
            new_ranking = HistoricalRanking(
                country_id=country_id,
                indicator_id=indicator_id,
                year=year,
                rank=rec["rank"],
                value=rec["value"],
                unit=rec["unit"],
                source_id=source_id,
                source_name=source_name,
                source_url=source_url,
                confidence_score=rec["confidence_score"],
                last_updated=f"{year}",
            )
            db.add(new_ranking)
            stats["inserted"] += 1

    try:
        db.commit()
        logger.info(f"ETL DB Load Completed: Inserted={stats['inserted']}, Updated={stats['updated']}, Skipped={stats['skipped']}")
    except Exception as e:
        db.rollback()
        logger.error(f"Error during DB transaction commit: {e}")
        stats["failed"] += len(records)

    return stats
