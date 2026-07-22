from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from .. import crud, schemas, database

router = APIRouter(prefix="/api/compare", tags=["Comparison"])

@router.get("", response_model=schemas.CountryComparisonOut)
def compare_countries(
    country1: str = Query(..., description="First country name or ISO code (e.g., India)"),
    country2: str = Query(..., description="Second country name or ISO code (e.g., Japan)"),
    year: Optional[int] = Query(None, description="Year for comparison"),
    db: Session = Depends(database.get_db)
):
    """Compare indicators side-by-side between any two countries."""
    res = crud.get_comparison(db, country1, country2, year=year)
    if not res:
        raise HTTPException(status_code=404, detail="One or both countries were not found")
    return res
