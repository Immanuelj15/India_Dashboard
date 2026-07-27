import axios from 'axios';

const getNormalizedApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  url = url.replace(/\/+$/, '');
  if (!url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const API_BASE_URL = getNormalizedApiBaseUrl();

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSummary = async (year = 2024) => {
  const response = await api.get('/rankings/summary', { params: { year } });
  return response.data;
};

export const fetchRankings = async (
  country = 'India',
  category,
  indicator,
  year
) => {
  const response = await api.get('/rankings', {
    params: { country, category, indicator, year },
  });
  return response.data;
};

export const fetchCountryRankings = async (
  country = 'India',
  year = 2024,
  category
) => {
  const params = { year };
  if (category) params.category = category;
  const response = await api.get(`/rankings/${country}`, { params });
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const fetchIndicators = async (category) => {
  const response = await api.get('/indicators', {
    params: { category },
  });
  return response.data;
};

export const fetchCountries = async () => {
  const response = await api.get('/countries');
  return response.data;
};

export const fetchHistoricalTrends = async (indicatorSlug, country = 'India') => {
  const response = await api.get(`/rankings/trends/${indicatorSlug}`, {
    params: { country },
  });
  return response.data;
};

export const fetchTrend = async (indicatorSlug, country = 'India') => {
  const response = await api.get(`/rankings/trends/${indicatorSlug}`, {
    params: { country },
  });
  return response.data;
};

export const fetchComparison = async (indicatorSlug, year = 2024) => {
  const response = await api.get(`/rankings/compare/${indicatorSlug}`, {
    params: { year },
  });
  return response.data;
};

export const fetchAISummaries = async (category, year = 2024) => {
  const response = await api.get('/ai-summaries', {
    params: { category, year },
  });
  return response.data;
};

export const fetchAISummary = async (category, year = 2024) => {
  const response = await api.get('/ai-summaries', {
    params: { category, year },
  });
  return response.data;
};

export const searchAll = async (query) => {
  const response = await api.get('/search', { params: { q: query } });
  return response.data;
};
