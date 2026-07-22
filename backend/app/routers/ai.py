from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, database, ai_engine

router = APIRouter(prefix="/api/ai-summary", tags=["AI Insights"])

@router.post("", response_model=schemas.AISummaryResponse)
def generate_ai_summary(
    payload: schemas.AISummaryRequest,
    db: Session = Depends(database.get_db)
):
    """Generate AI-powered summary for selected country using LangChain and Ollama Llama 3.1 8B."""
    return ai_engine.generate_country_ai_summary(
        db,
        country_name=payload.country,
        indicator_slug=payload.indicator_slug,
        category_slug=payload.category_slug
    )
