from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Country(Base):
    __tablename__ = "countries"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(5), unique=True, index=True, nullable=False) # e.g. IND, JPN, USA
    iso2 = Column(String(2), unique=True, index=True, nullable=True) # e.g. IN, JP, US
    iso3 = Column(String(3), unique=True, index=True, nullable=True) # e.g. IND, JPN, USA
    name = Column(String(100), unique=True, index=True, nullable=False)
    continent = Column(String(50), nullable=True)
    flag_emoji = Column(String(10), nullable=True)
    flag_url = Column(String(255), nullable=True)
    region = Column(String(100), nullable=True)
    population = Column(Float, nullable=True)
    gdp_usd = Column(String(50), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    rankings = relationship("HistoricalRanking", back_populates="country", cascade="all, delete-orphan")

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    icon = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    indicators = relationship("Indicator", back_populates="category", cascade="all, delete-orphan")

class Indicator(Base):
    __tablename__ = "indicators"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(150), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    unit = Column(String(50), nullable=True) # e.g. "Rank", "USD", "%", "Score"
    description = Column(Text, nullable=True)
    lower_is_better = Column(Boolean, default=False)
    higher_is_better = Column(Boolean, default=True)

    category = relationship("Category", back_populates="indicators")
    rankings = relationship("HistoricalRanking", back_populates="indicator", cascade="all, delete-orphan")

class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=True)
    url = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    rankings = relationship("HistoricalRanking", back_populates="source")

class HistoricalRanking(Base):
    __tablename__ = "historical_rankings"

    id = Column(Integer, primary_key=True, index=True)
    country_id = Column(Integer, ForeignKey("countries.id"), nullable=False)
    indicator_id = Column(Integer, ForeignKey("indicators.id"), nullable=False)
    year = Column(Integer, nullable=False, index=True)
    rank = Column(Integer, nullable=True)
    value = Column(Float, nullable=True)
    unit = Column(String(50), nullable=True)
    source_id = Column(Integer, ForeignKey("sources.id"), nullable=True)
    source_name = Column(String(150), nullable=True)
    source_url = Column(String(255), nullable=True)
    confidence_score = Column(Float, default=1.0)
    last_updated = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    country = relationship("Country", back_populates="rankings")
    indicator = relationship("Indicator", back_populates="rankings")
    source = relationship("Source", back_populates="rankings")
