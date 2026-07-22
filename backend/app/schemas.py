from pydantic import BaseModel, Field
from typing import Optional, List

class SourceBase(BaseModel):
    name: str
    url: str
    description: Optional[str] = None

class SourceOut(SourceBase):
    id: int

    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    slug: str
    name: str
    icon: Optional[str] = None
    description: Optional[str] = None

class CategoryOut(CategoryBase):
    id: int

    class Config:
        from_attributes = True

class IndicatorBase(BaseModel):
    slug: str
    name: str
    category_id: int
    unit: Optional[str] = None
    description: Optional[str] = None
    higher_is_better: bool = True

class IndicatorOut(IndicatorBase):
    id: int
    category: Optional[CategoryOut] = None

    class Config:
        from_attributes = True

class CountryBase(BaseModel):
    code: str
    name: str
    flag_emoji: Optional[str] = None
    region: Optional[str] = None
    population: Optional[float] = None
    gdp_usd: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class CountryOut(CountryBase):
    id: int

    class Config:
        from_attributes = True

class HistoricalRankingOut(BaseModel):
    id: int
    year: int
    rank: Optional[int] = None
    value: Optional[float] = None
    unit: Optional[str] = None
    last_updated: Optional[str] = None
    country: CountryOut
    indicator: IndicatorOut
    source: Optional[SourceOut] = None

    class Config:
        from_attributes = True

class ComparisonDetail(BaseModel):
    indicator_slug: str
    indicator_name: str
    category_name: str
    unit: Optional[str] = None
    country1_rank: Optional[int] = None
    country1_value: Optional[float] = None
    country2_rank: Optional[int] = None
    country2_value: Optional[float] = None
    source_name: Optional[str] = None
    source_url: Optional[str] = None
    last_updated: Optional[str] = None

class CountryComparisonOut(BaseModel):
    country1: CountryOut
    country2: CountryOut
    latest_year: int
    comparisons: List[ComparisonDetail]

class TrendPoint(BaseModel):
    year: int
    rank: Optional[int] = None
    value: Optional[float] = None

class TrendOut(BaseModel):
    country: CountryOut
    indicator: IndicatorOut
    points: List[TrendPoint]
    source: Optional[SourceOut] = None

class AISummaryRequest(BaseModel):
    country: str = Field(default="India", description="Country name to summarize")
    indicator_slug: Optional[str] = Field(default=None, description="Optional indicator slug to focus summary")
    category_slug: Optional[str] = Field(default=None, description="Optional category slug")

class AISummaryResponse(BaseModel):
    country: str
    summary: str
    key_metrics: List[dict]
    source: str = "LangChain + Ollama Llama 3.1 8B (Verified DB Context)"
    is_hallucinated: bool = False
