# India in the World – Global Progress Dashboard

> **Lets Code Development Challenge 2026 Submission**  
> Consolidating trusted international indices into a single, production-ready platform to analyze India's global standings across Economy, Governance, Technology, Society, Healthcare, Education, Environment, Safety, Equality, and Digital Government.

---

## 📌 Project Overview
India is one of the world's largest and fastest-growing economies. However, national progress extends across education, health, governance, innovation, and environmental sustainability. 

**"India in the World"** consolidates scattered datasets from 20+ leading global organizations (World Bank, IMF, UN, WHO, UNESCO, WEF, Transparency International, WIPO, Oxford Insights, etc.) into an interactive, accessible platform that empowers citizens, policymakers, researchers, and students to explore where India stands globally.

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               Frontend (React 18 + Vite JS)                 │
│  - JavaScript, Tailwind CSS, Lucide Icons, Glassmorphic UI  │
│  - Recharts (Bar, Line, Radar, Pie Charts)                  │
│  - React Leaflet (Interactive Geospatial World Map)         │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API (JSON)
┌──────────────────────────────▼──────────────────────────────┐
│                    Backend (FastAPI Python)                 │
│  - SQLAlchemy 2.0 ORM & Database Layer                      │
│  - LangChain + Ollama Llama 3.1 8B Integration              │
│  - Automatic OpenAPI / Swagger Documentation at /docs       │
└──────────────────────────────┬──────────────────────────────┘
                               │ SQL
┌──────────────────────────────▼──────────────────────────────┐
│              Database (PostgreSQL / Supabase / SQLite)      │
│  - Countries, Categories, Indicators, Historical Rankings   │
│  - 20+ Official Data Source Attribution Links                │
└──────────────────────────────┴──────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, JavaScript (JSX), Tailwind CSS, React Router, Recharts, React Leaflet, Axios |
| **Backend** | FastAPI, Python, SQLAlchemy, Pydantic, Uvicorn |
| **Database** | PostgreSQL (Supabase / Render), SQLite (Local Fallback) |
| **AI Engine** | LangChain, Ollama, Llama 3.1 8B (Zero-Hallucination Grounded Retrieval) |
| **Deployment** | Frontend -> Vercel \| Backend -> Render \| Database -> Supabase PostgreSQL |

---

## 📁 Folder Structure

```
d:\Challenge\
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI entry point & CORS
│   │   ├── database.py          # SQLAlchemy connection setup
│   │   ├── models.py            # Database tables schema
│   │   ├── schemas.py           # Pydantic data validation schemas
│   │   ├── crud.py              # Query logic & DB operations
│   │   ├── ai_engine.py         # LangChain + Ollama integration
│   │   └── routers/             # REST endpoints
│   ├── seed_data.py             # Database initial seeding script
│   └── requirements.txt         # Python backend dependencies
├── frontend/
│   ├── src/
│   │   ├── api/client.js        # Axios API client setup
│   │   ├── components/
│   │   │   ├── layout/          # Header, Sidebar, Footer (.jsx)
│   │   │   ├── ui/              # StatCard, SourceBadge, AISummaryCard, ChartCard (.jsx)
│   │   │   └── map/             # Interactive Leaflet World Map (.jsx)
│   │   ├── pages/               # 7 Required Application Pages (.jsx)
│   │   │   ├── HomeDashboard.jsx
│   │   │   ├── CountryComparison.jsx
│   │   │   ├── HistoricalTrends.jsx
│   │   │   ├── WorldMapPage.jsx
│   │   │   ├── CategoryExplorer.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   └── AIInsights.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── database/
│   ├── schema.sql               # PostgreSQL DDL Schema
│   └── seed.sql                 # PostgreSQL DML Seed
├── data/
│   └── seed_dataset.json        # JSON seed metadata
├── docs/
│   ├── architecture.md          # Full Architecture & Design document
│   ├── api_documentation.md     # REST API specification
│   └── data_sources.md          # Trusted sources mapping table
└── README.md
```

---

## ⚡ Installation & Setup Steps

### 1. Backend Setup
```bash
cd backend
python seed_data.py
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- Interactive Swagger Documentation will be accessible at: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Access web application at: `http://localhost:3000`
