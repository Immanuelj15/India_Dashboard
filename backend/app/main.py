from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import countries, categories, indicators, rankings, compare, trend, search, ai

# Create database tables if they do not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="India in the World - Global Progress Dashboard API",
    description="Production REST API consolidating global indices across Economy, Governance, Technology, Society, Healthcare, Education, Environment, Safety, Equality, and Digital Government.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware setup to allow requests from frontend (React/Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(countries.router)
app.include_router(categories.router)
app.include_router(indicators.router)
app.include_router(rankings.router)
app.include_router(compare.router)
app.include_router(trend.router)
app.include_router(search.router)
app.include_router(ai.router)

@app.get("/", tags=["Health Check"])
def root_health_check():
    return {
        "status": "online",
        "app": "India in the World - Global Progress Dashboard API",
        "documentation": "/docs",
        "version": "1.0.0"
    }
