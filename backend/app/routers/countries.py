from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(prefix="/api/countries", tags=["Countries"])

@router.get("", response_model=List[schemas.CountryOut])
def list_countries(db: Session = Depends(database.get_db)):
    """Retrieve all available countries in the dashboard."""
    return crud.get_countries(db)

@router.get("/{country_query}", response_model=schemas.CountryOut)
def get_country(country_query: str, db: Session = Depends(database.get_db)):
    """Retrieve a specific country by name or ISO code."""
    country = crud.get_country_by_name_or_code(db, country_query)
    if not country:
        raise HTTPException(status_code=404, detail="Country not found")
    return country
