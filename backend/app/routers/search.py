from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from .. import crud, database

router = APIRouter(prefix="/api/search", tags=["Search"])

@router.get("")
def search(
    q: str = Query(..., min_length=1, description="Search term across countries, indicators, and categories"),
    db: Session = Depends(database.get_db)
):
    """Global search across countries, indicators, categories, and ranking metrics."""
    return crud.search_all(db, query=q)
