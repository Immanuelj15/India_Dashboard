# REST API Reference — India in the World

The FastAPI backend automatically generates interactive OpenAPI / Swagger documentation at `/docs` and ReDoc at `/redoc`.

## Base URL
- **Local**: `http://localhost:8000/api`
- **Production (Render)**: `https://<your-render-app>.onrender.com/api`

---

## Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/countries` | Retrieve list of all benchmark countries |
| `GET` | `/categories` | Retrieve all 10 indicator categories |
| `GET` | `/indicators` | Retrieve indicators (optional `?category=slug` filter) |
| `GET` | `/rankings` | Retrieve historical rankings with filters (`country`, `category`, `indicator`, `year`) |
| `GET` | `/rankings/{country}` | Retrieve all indicator rankings for a specific country |
| `GET` | `/compare` | Compare metrics side-by-side (`?country1=India&country2=Japan`) |
| `GET` | `/trend/{indicator}` | Retrieve multi-year trend points (`?country=India`) |
| `GET` | `/search` | Full-text search across countries, indicators, and categories (`?q=term`) |
| `POST` | `/ai-summary` | Generate zero-hallucination AI country summary |

---

## Sample Request & Response

### `POST /api/ai-summary`

#### Request Body:
```json
{
  "country": "India",
  "indicator_slug": "global-innovation-index"
}
```

#### Response (200 OK):
```json
{
  "country": "India",
  "summary": "India demonstrates notable performance in global benchmark indices, highlighting strength in Global Innovation Index where it ranks #39 globally according to official WIPO datasets. Across key categories including Economy, Governance, Technology, and Education, India's metrics reflect ongoing national progress and comparative international position.",
  "key_metrics": [
    {
      "indicator": "Global Innovation Index",
      "category": "Technology & Innovation",
      "rank": 39,
      "value": 38.3,
      "unit": "Score (0-100)",
      "source": "WIPO"
    }
  ],
  "source": "LangChain + Ollama Llama 3.1 8B (DB Grounded)",
  "is_hallucinated": false
}
```
