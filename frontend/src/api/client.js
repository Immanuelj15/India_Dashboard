import axios from 'axios';

// Automatically normalize base URL to append /api if omitted in Vercel environment variables
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
let cleanBaseUrl = rawBaseUrl.trim().replace(/\/+$/, '');
if (!cleanBaseUrl.endsWith('/api')) {
  cleanBaseUrl = `${cleanBaseUrl}/api`;
}

const API_BASE_URL = cleanBaseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCountries = async () => {
  const response = await api.get('/countries');
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const fetchIndicators = async (categorySlug) => {
  const params = categorySlug ? { category: categorySlug } : {};
  const response = await api.get('/indicators', { params });
  return response.data;
};

export const fetchRankings = async (
  country,
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
  country,
  year
) => {
  const response = await api.get(`/rankings/${country}`, {
    params: { year },
  });
  return response.data;
};

export const fetchComparison = async (
  country1,
  country2,
  year
) => {
  const response = await api.get('/compare', {
    params: { country1, country2, year },
  });
  return response.data;
};

export const fetchTrend = async (
  indicatorSlug,
  countryName = 'India'
) => {
  const response = await api.get(`/trend/${indicatorSlug}`, {
    params: { country: countryName },
  });
  return response.data;
};

export const searchAll = async (query) => {
  const response = await api.get('/search', {
    params: { q: query },
  });
  return response.data;
};

export const fetchAISummary = async (
  country,
  indicatorSlug,
  categorySlug
) => {
  const response = await api.post('/ai-summary', {
    country,
    indicator_slug: indicatorSlug,
    category_slug: categorySlug,
  });
  return response.data;
};
