from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, and_, desc
from . import models

def get_countries(db: Session):
    return db.query(models.Country).all()

def get_country_by_name_or_code(db: Session, query_str: str):
    return db.query(models.Country).filter(
        or_(
            models.Country.name.ilike(f"%{query_str}%"),
            models.Country.code.ilike(query_str)
        )
    ).first()

def get_categories(db: Session):
    return db.query(models.Category).all()

def get_indicators(db: Session, category_slug: str = None):
    query = db.query(models.Indicator).options(joinedload(models.Indicator.category))
    if category_slug:
        query = query.join(models.Category).filter(models.Category.slug == category_slug)
    return query.all()

def get_rankings(
    db: Session,
    country_name: str = None,
    category_slug: str = None,
    indicator_slug: str = None,
    year: int = None
):
    query = db.query(models.HistoricalRanking).options(
        joinedload(models.HistoricalRanking.country),
        joinedload(models.HistoricalRanking.indicator).joinedload(models.Indicator.category),
        joinedload(models.HistoricalRanking.source)
    )

    if country_name:
        query = query.join(models.Country).filter(
            or_(models.Country.name.ilike(f"%{country_name}%"), models.Country.code.ilike(country_name))
        )
    if category_slug:
        query = query.join(models.Indicator).join(models.Category).filter(models.Category.slug == category_slug)
    if indicator_slug:
        if not category_slug:
            query = query.join(models.Indicator)
        query = query.filter(models.Indicator.slug == indicator_slug)
    if year:
        query = query.filter(models.HistoricalRanking.year == year)

    return query.all()

def get_comparison(db: Session, country1_str: str, country2_str: str, year: int = None):
    c1 = get_country_by_name_or_code(db, country1_str)
    c2 = get_country_by_name_or_code(db, country2_str)

    if not c1 or not c2:
        return None

    # Get latest year if not specified
    if not year:
        max_year = db.query(models.HistoricalRanking.year).order_by(desc(models.HistoricalRanking.year)).first()
        year = max_year[0] if max_year else 2024

    r1 = get_rankings(db, country_name=c1.name, year=year)
    r2 = get_rankings(db, country_name=c2.name, year=year)

    # Map rankings by indicator_id
    map1 = {r.indicator_id: r for r in r1}
    map2 = {r.indicator_id: r for r in r2}

    indicators = db.query(models.Indicator).options(joinedload(models.Indicator.category)).all()
    comparisons = []

    for ind in indicators:
        rank1 = map1.get(ind.id)
        rank2 = map2.get(ind.id)

        source_name = rank1.source.name if rank1 and rank1.source else (rank2.source.name if rank2 and rank2.source else "Global Index")
        source_url = rank1.source.url if rank1 and rank1.source else (rank2.source.url if rank2 and rank2.source else "#")
        last_updated = rank1.last_updated if rank1 else (rank2.last_updated if rank2 else "2024")

        comparisons.append({
            "indicator_slug": ind.slug,
            "indicator_name": ind.name,
            "category_name": ind.category.name if ind.category else "General",
            "unit": ind.unit,
            "country1_rank": rank1.rank if rank1 else None,
            "country1_value": rank1.value if rank1 else None,
            "country2_rank": rank2.rank if rank2 else None,
            "country2_value": rank2.value if rank2 else None,
            "source_name": source_name,
            "source_url": source_url,
            "last_updated": last_updated
        })

    return {
        "country1": c1,
        "country2": c2,
        "latest_year": year,
        "comparisons": comparisons
    }

def get_trend(db: Session, indicator_slug: str, country_name: str = "India"):
    country = get_country_by_name_or_code(db, country_name)
    indicator = db.query(models.Indicator).options(joinedload(models.Indicator.category)).filter(models.Indicator.slug == indicator_slug).first()

    if not country or not indicator:
        return None

    rankings = db.query(models.HistoricalRanking).options(joinedload(models.HistoricalRanking.source))\
        .filter(models.HistoricalRanking.country_id == country.id, models.HistoricalRanking.indicator_id == indicator.id)\
        .order_by(models.HistoricalRanking.year.asc()).all()

    points = [{"year": r.year, "rank": r.rank, "value": r.value} for r in rankings]
    source = rankings[0].source if rankings and rankings[0].source else None

    return {
        "country": country,
        "indicator": indicator,
        "points": points,
        "source": source
    }

def search_all(db: Session, query: str):
    query_str = f"%{query}%"

    countries = db.query(models.Country).filter(
        or_(models.Country.name.ilike(query_str), models.Country.code.ilike(query_str), models.Country.region.ilike(query_str))
    ).all()

    categories = db.query(models.Category).filter(
        or_(models.Category.name.ilike(query_str), models.Category.description.ilike(query_str))
    ).all()

    indicators = db.query(models.Indicator).options(joinedload(models.Indicator.category)).filter(
        or_(models.Indicator.name.ilike(query_str), models.Indicator.description.ilike(query_str))
    ).all()

    rankings = db.query(models.HistoricalRanking).options(
        joinedload(models.HistoricalRanking.country),
        joinedload(models.HistoricalRanking.indicator).joinedload(models.Indicator.category),
        joinedload(models.HistoricalRanking.source)
    ).join(models.Indicator).filter(
        or_(
            models.Indicator.name.ilike(query_str),
            models.HistoricalRanking.unit.ilike(query_str)
        )
    ).limit(30).all()

    return {
        "query": query,
        "countries": countries,
        "categories": categories,
        "indicators": indicators,
        "rankings": rankings
    }
