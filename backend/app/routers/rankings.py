from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import crud, schemas, database

router = APIRouter(prefix="/api/rankings", tags=["Rankings"])

@router.get("", response_model=List[schemas.HistoricalRankingOut])
def list_rankings(
    country: Optional[str] = Query(None, description="Country name or ISO code"),
    category: Optional[str] = Query(None, description="Category slug"),
    indicator: Optional[str] = Query(None, description="Indicator slug"),
    year: Optional[int] = Query(None, description="Ranking year"),
    db: Session = Depends(database.get_db)
):
    """Filter and retrieve global indicator rankings."""
    return crud.get_rankings(db, country_name=country, category_slug=category, indicator_slug=indicator, year=year)

@router.get("/{country}", response_model=List[schemas.HistoricalRankingOut])
def get_rankings_by_country(
    country: str,
    year: Optional[int] = Query(None, description="Optional year filter"),
    db: Session = Depends(database.get_db)
):
    """Retrieve all rankings for a specified country."""
    rankings = crud.get_rankings(db, country_name=country, year=year)
    if not rankings:
        # Check if country exists
        c = crud.get_country_by_name_or_code(db, country)
        if not c:
            raise HTTPException(status_code=404, detail="Country not found")
    return rankings
