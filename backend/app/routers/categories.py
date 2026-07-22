from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(prefix="/api/categories", tags=["Categories"])

@router.get("", response_model=List[schemas.CategoryOut])
def list_categories(db: Session = Depends(database.get_db)):
    """Retrieve all 10 global indicator categories."""
    return crud.get_categories(db)
