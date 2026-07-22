# System Architecture — India in the World

## Overview
"India in the World – Global Progress Dashboard" is an enterprise-grade full-stack platform designed to aggregate, visualize, and summarize India's performance across 70+ global indices.

```
┌─────────────────────────────────────────────────────────┐
│              Frontend (React + Vite + TS)               │
│  - Recharts Visualizations (Bar, Line, Radar, Pie)      │
│  - React Leaflet Interactive World Map                  │
│  - Tailwind CSS + Glassmorphic Design System            │
└────────────────────────────┬────────────────────────────┘
                             │ REST API (JSON)
┌────────────────────────────▼────────────────────────────┐
│                  Backend (FastAPI Engine)               │
│  - SQLAlchemy ORM Data Layer                            │
│  - LangChain + Ollama Llama 3.1 8B Integration          │
│  - OpenAPI / Swagger Automatic Documentation            │
└────────────────────────────┬────────────────────────────┘
                             │ SQL
┌────────────────────────────▼────────────────────────────┐
│            PostgreSQL / SQLite Database                 │
│  - Countries, Categories, Indicators, Historical Data   │
│  - 20+ Official Trusted Data Provider Attributions      │
└─────────────────────────────────────────────────────────┘
```

## Tech Stack Specification

| Component | Technology | Version / Tooling |
| :--- | :--- | :--- |
| **Frontend Framework** | React.js with TypeScript | Vite, React Router v6 |
| **Styling** | Tailwind CSS & Glassmorphic Utilities | Lucide React Icons |
| **Data Visualization** | Recharts & React Leaflet | OpenStreetMap CartoDB |
| **Backend REST Engine** | FastAPI (Python 3.10+) | Uvicorn, Pydantic v2 |
| **ORM & Database** | SQLAlchemy 2.0 & PostgreSQL | Supabase / SQLite |
| **AI Summary Engine** | LangChain + Ollama | Llama 3.1 8B Model |

## AI Grounding Architecture
To prevent hallucination, the system utilizes a deterministic Grounded Retrieval Pipeline:
1. **Factual Retrieval**: Extracts exact empirical metrics directly from the DB for the requested country.
2. **Context Packaging**: Synthesizes verified key facts into a structured prompt context.
3. **LLM Synthesis**: Invokes LangChain + Ollama Llama 3.1 8B to generate a 2-3 sentence executive summary strictly based on retrieved facts.
4. **Fallback Handler**: If Ollama service is unreachable, a local deterministic factual summarizer returns empirical findings without throwing errors.
