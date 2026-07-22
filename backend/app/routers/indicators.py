from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import crud, schemas, database

router = APIRouter(prefix="/api/indicators", tags=["Indicators"])

@router.get("", response_model=List[schemas.IndicatorOut])
def list_indicators(
    category: Optional[str] = Query(None, description="Category slug to filter indicators"),
    db: Session = Depends(database.get_db)
):
    """Retrieve indicators, optionally filtered by category."""
    return crud.get_indicators(db, category_slug=category)
