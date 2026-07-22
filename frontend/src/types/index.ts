export interface Country {
  id: number;
  code: string;
  name: string;
  flag_emoji?: string;
  region?: string;
  population?: number;
  gdp_usd?: string;
  latitude?: number;
  longitude?: number;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  icon?: string;
  description?: string;
}

export interface Source {
  id: number;
  name: string;
  url: string;
  description?: string;
}

export interface Indicator {
  id: number;
  slug: string;
  name: string;
  category_id: number;
  unit?: string;
  description?: string;
  higher_is_better: boolean;
  category?: Category;
}

export interface HistoricalRanking {
  id: number;
  year: number;
  rank?: number;
  value?: number;
  unit?: string;
  last_updated?: string;
  country: Country;
  indicator: Indicator;
  source?: Source;
}

export interface ComparisonDetail {
  indicator_slug: string;
  indicator_name: string;
  category_name: string;
  unit?: string;
  country1_rank?: number;
  country1_value?: number;
  country2_rank?: number;
  country2_value?: number;
  source_name?: string;
  source_url?: string;
  last_updated?: string;
}

export interface CountryComparison {
  country1: Country;
  country2: Country;
  latest_year: number;
  comparisons: ComparisonDetail[];
}

export interface TrendPoint {
  year: number;
  rank?: number;
  value?: number;
}

export interface TrendData {
  country: Country;
  indicator: Indicator;
  points: TrendPoint[];
  source?: Source;
}

export interface AISummaryResponse {
  country: string;
  summary: string;
  key_metrics: {
    indicator: string;
    category: string;
    rank?: number;
    value?: number;
    unit?: string;
    source: string;
  }[];
  source: string;
  is_hallucinated: boolean;
}

export interface SearchResults {
  query: string;
  countries: Country[];
  categories: Category[];
  indicators: Indicator[];
  rankings: HistoricalRanking[];
}
