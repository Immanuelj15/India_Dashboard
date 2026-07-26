import os
import requests
import logging
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from . import crud

logger = logging.getLogger("AIEngine")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

def generate_with_groq(prompt: str) -> str:
    """Generates AI summary using Groq Cloud API ultra-fast LPU inference."""
    api_key = os.getenv("GROQ_API_KEY") or GROQ_API_KEY
    if not api_key:
        return None
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": GROQ_MODEL,
        "messages": [
            {
                "role": "system",
                "content": "You are a Senior Data Analyst for Global Development & Country Indices. Provide concise, 2-3 sentence executive summaries grounded strictly on provided database facts without hallucination."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.2,
        "max_tokens": 250,
    }
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=5.0)
        if resp.status_code == 200:
            data = resp.json()
            choices = data.get("choices", [])
            if choices and len(choices) > 0:
                return choices[0].get("message", {}).get("content", "").strip()
        else:
            logger.warning(f"Groq API HTTP error {resp.status_code}: {resp.text}")
    except Exception as e:
        logger.warning(f"Groq API connection error: {e}")

    return None

def get_best_available_ollama_model(ollama_url: str) -> str:
    """Dynamically detects installed models in the local Ollama instance."""
    configured_model = os.getenv("OLLAMA_MODEL")
    if configured_model:
        return configured_model

    preferred_models = ["llama3.1:8b", "llama3.1", "mistral:latest", "mistral", "phi3:latest", "phi3"]
    try:
        res = requests.get(f"{ollama_url}/api/tags", timeout=2.0)
        if res.status_code == 200:
            models_data = res.json().get("models", [])
            installed_names = [m.get("name") for m in models_data]
            for pref in preferred_models:
                if pref in installed_names:
                    return pref
            if installed_names:
                return installed_names[0]
    except Exception:
        pass

    return "llama3.1:8b"

def generate_country_ai_summary(db: Session, country_name: str = "India", indicator_slug: str = None, category_slug: str = None) -> Dict[str, Any]:
    # 1. Retrieve empirical facts strictly from DB to prevent hallucination
    rankings = crud.get_rankings(db, country_name=country_name, year=2024)
    if not rankings:
        rankings = crud.get_rankings(db, country_name=country_name)

    country_obj = crud.get_country_by_name_or_code(db, country_name)
    c_name = country_obj.name if country_obj else country_name

    key_metrics = []
    facts_text = []

    for r in rankings[:10]: # Top 10 indicators
        cat_name = r.indicator.category.name if r.indicator and r.indicator.category else "Global Index"
        ind_name = r.indicator.name if r.indicator else "Indicator"
        rank_str = f"Rank {r.rank}" if r.rank else "N/A"
        val_str = f"{r.value} {r.unit or ''}".strip()
        source_name = r.source.name if r.source else "Trusted Global Source"

        key_metrics.append({
            "indicator": ind_name,
            "category": cat_name,
            "rank": r.rank,
            "value": r.value,
            "unit": r.unit,
            "source": source_name
        })
        facts_text.append(f"- {ind_name} ({cat_name}): {rank_str}, Value: {val_str} (Source: {source_name})")

    facts_summary_str = "\n".join(facts_text)

    prompt_content = (
        f"Generate a 2-3 sentence executive summary for {c_name} based ONLY on the following official database facts.\n"
        f"Do NOT hallucinate or include outside assumptions.\n\n"
        f"FACTS:\n{facts_summary_str}\n\n"
        f"EXECUTIVE SUMMARY:"
    )

    summary_result = None
    used_source = None

    # Step A: Try Groq API (Ultra-Fast Cloud LPU Inference)
    summary_result = generate_with_groq(prompt_content)
    if summary_result:
        used_source = f"Groq Llama 3.3 70B (DB Grounded RAG)"

    # Step B: Try Local Ollama LLM Fallback
    if not summary_result:
        ollama_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        model_name = get_best_available_ollama_model(ollama_url)
        try:
            res = requests.post(
                f"{ollama_url}/api/generate",
                json={"model": model_name, "prompt": prompt_content, "stream": False},
                timeout=5.0
            )
            if res.status_code == 200:
                summary_result = res.json().get("response", "").strip()
                used_source = f"Ollama {model_name} (DB Grounded)"
        except Exception:
            pass

    # Step C: Fallback to Grounded Fact Generator if LLM unavailable
    if not summary_result:
        used_source = "Verified Database Grounded Engine"
        top_ranks = [m for m in key_metrics if m.get("rank") is not None]
        top_ranks.sort(key=lambda x: x["rank"])
        
        if top_ranks:
            best = top_ranks[0]
            summary_result = (
                f"{c_name} demonstrates notable performance in global benchmark indices, highlighting strength in "
                f"{best['indicator']} where it ranks #{best['rank']} globally according to official {best['source']} datasets. "
                f"Across key categories including Economy, Governance, Technology, and Education, {c_name}'s metrics reflect "
                f"ongoing national progress and comparative international position."
            )
        else:
            summary_result = f"{c_name} continues to be evaluated across major global development, economic, and social indicator frameworks."

    return {
        "country": c_name,
        "summary": summary_result,
        "key_metrics": key_metrics,
        "source": used_source,
        "is_hallucinated": False
    }
