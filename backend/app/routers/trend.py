from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from .. import crud, schemas, database

router = APIRouter(prefix="/api/trend", tags=["Historical Trends"])

@router.get("/{indicator}", response_model=schemas.TrendOut)
def get_indicator_trend(
    indicator: str,
    country: Optional[str] = Query("India", description="Country name or ISO code"),
    db: Session = Depends(database.get_db)
):
    """Retrieve multi-year trend points for a given indicator and country."""
    trend_data = crud.get_trend(db, indicator_slug=indicator, country_name=country)
    if not trend_data:
        raise HTTPException(status_code=404, detail="Trend data not found for given indicator and country")
    return trend_data
