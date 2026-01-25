import { NextResponse } from "next/server";

export interface StockPrice {
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  logo: string;
  exchange: string;
  category: "pakistani" | "international";
  lastUpdated: string;
}

export interface StockPriceResponse {
  success: boolean;
  data: {
    pakistani: StockPrice[];
    international: StockPrice[];
  };
  source: string;
  lastUpdated: string;
}

// Cache for 5 minutes
let cachedStocks: { pakistani: StockPrice[]; international: StockPrice[] } | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000;

// Pakistani stocks - Yahoo Finance symbols for PSX
const pakistaniStockConfig = [
  { symbol: "PSO.KA", name: "Pakistan State Oil", code: "PSO", currency: "PKR", logo: "⛽", exchange: "PSX", fallbackPrice: 425.50 },
  { symbol: "APL.KA", name: "Attock Petroleum", code: "APL", currency: "PKR", logo: "🛢️", exchange: "PSX", fallbackPrice: 512.75 },
  { symbol: "SHEL.KA", name: "Shell Pakistan", code: "SHEL", currency: "PKR", logo: "🐚", exchange: "PSX", fallbackPrice: 148.25 },
  { symbol: "ATRL.KA", name: "Attock Refinery", code: "ATRL", currency: "PKR", logo: "🏭", exchange: "PSX", fallbackPrice: 285.60 },
  { symbol: "PRL.KA", name: "Pakistan Refinery", code: "PRL", currency: "PKR", logo: "🔧", exchange: "PSX", fallbackPrice: 32.45 },
  { symbol: "HASCOL.KA", name: "Hascol Petroleum", code: "HASCOL", currency: "PKR", logo: "🚗", exchange: "PSX", fallbackPrice: 8.92 },
  { symbol: "BYCO.KA", name: "BYCO Petroleum", code: "BYCO", currency: "PKR", logo: "🔶", exchange: "PSX", fallbackPrice: 7.85 },
  { symbol: "OGDC.KA", name: "OGDCL", code: "OGDC", currency: "PKR", logo: "🛢️", exchange: "PSX", fallbackPrice: 128.90 },
  { symbol: "PPL.KA", name: "PPL", code: "PPL", currency: "PKR", logo: "⚡", exchange: "PSX", fallbackPrice: 98.50 },
  { symbol: "MARI.KA", name: "Mari Petroleum", code: "MARI", currency: "PKR", logo: "💎", exchange: "PSX", fallbackPrice: 2450.00 },
];

// International oil companies - Yahoo Finance symbols
const internationalStockConfig = [
  { symbol: "2222.SR", name: "Saudi Aramco", code: "2222.SR", currency: "SAR", logo: "🇸🇦", exchange: "Tadawul", fallbackPrice: 28.45 },
  { symbol: "XOM", name: "ExxonMobil", code: "XOM", currency: "USD", logo: "🇺🇸", exchange: "NYSE", fallbackPrice: 104.23 },
  { symbol: "SHEL", name: "Shell", code: "SHEL", currency: "USD", logo: "🇳🇱", exchange: "NYSE", fallbackPrice: 64.89 },
  { symbol: "CVX", name: "Chevron", code: "CVX", currency: "USD", logo: "🇺🇸", exchange: "NYSE", fallbackPrice: 152.67 },
  { symbol: "BP", name: "BP", code: "BP", currency: "USD", logo: "🇬🇧", exchange: "NYSE", fallbackPrice: 34.21 },
  { symbol: "TTE", name: "TotalEnergies", code: "TTE", currency: "USD", logo: "🇫🇷", exchange: "NYSE", fallbackPrice: 62.45 },
  { symbol: "PBR", name: "Petrobras", code: "PBR", currency: "USD", logo: "🇧🇷", exchange: "NYSE", fallbackPrice: 14.82 },
  { symbol: "SNP", name: "Sinopec", code: "SNP", currency: "USD", logo: "🇨🇳", exchange: "NYSE", fallbackPrice: 48.67 },
];

// Fetch real stock data from Yahoo Finance
async function fetchYahooFinanceStock(symbol: string): Promise<{ price: number; change: number; changePercent: number } | null> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
      { 
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        cache: 'no-store',
      }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const result = data?.chart?.result?.[0];
    
    if (!result) return null;
    
    const meta = result.meta;
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.previousClose || meta.chartPreviousClose;
    
    if (!currentPrice || !previousClose) return null;
    
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;
    
    return {
      price: Number(currentPrice.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2))
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
}

async function fetchStockPrices(): Promise<{ pakistani: StockPrice[]; international: StockPrice[] }> {
  const now = new Date();

  // Fetch ALL international stocks in parallel
  const internationalPromises = internationalStockConfig.map(async (config) => {
    const realData = await fetchYahooFinanceStock(config.symbol);
    
    const stockData: StockPrice = {
      name: config.name,
      code: config.code,
      currency: config.currency,
      logo: config.logo,
      exchange: config.exchange,
      category: "international",
      lastUpdated: now.toISOString(),
      price: realData?.price ?? config.fallbackPrice,
      change: realData?.change ?? 0,
      changePercent: realData?.changePercent ?? 0,
    };
    
    return stockData;
  });

  // Fetch Pakistani stocks in parallel
  const pakistaniPromises = pakistaniStockConfig.map(async (config) => {
    const realData = await fetchYahooFinanceStock(config.symbol);
    
    const stockData: StockPrice = {
      name: config.name,
      code: config.code,
      currency: config.currency,
      logo: config.logo,
      exchange: config.exchange,
      category: "pakistani",
      lastUpdated: now.toISOString(),
      price: realData?.price ?? config.fallbackPrice,
      change: realData?.change ?? 0,
      changePercent: realData?.changePercent ?? 0,
    };
    
    return stockData;
  });

  const [internationalResults, pakistaniResults] = await Promise.all([
    Promise.all(internationalPromises),
    Promise.all(pakistaniPromises),
  ]);

  return {
    pakistani: pakistaniResults,
    international: internationalResults,
  };
}

export async function GET() {
  try {
    const now = Date.now();
    
    if (cachedStocks && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json<StockPriceResponse>({
        success: true,
        data: cachedStocks,
        source: "cache",
        lastUpdated: new Date(lastFetchTime).toISOString(),
      });
    }
    
    const stocks = await fetchStockPrices();
    cachedStocks = stocks;
    lastFetchTime = now;
    
    return NextResponse.json<StockPriceResponse>({
      success: true,
      data: stocks,
      source: "api",
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Stock price API error:", error);
    
    const now = new Date().toISOString();
    
    // Create fallback data from config
    const fallbackPakistani: StockPrice[] = pakistaniStockConfig.map(c => ({
      name: c.name,
      code: c.code,
      price: c.fallbackPrice,
      change: 0,
      changePercent: 0,
      currency: c.currency,
      logo: c.logo,
      exchange: c.exchange,
      category: "pakistani" as const,
      lastUpdated: now,
    }));
    
    const fallbackInternational: StockPrice[] = internationalStockConfig.map(c => ({
      name: c.name,
      code: c.code,
      price: c.fallbackPrice,
      change: 0,
      changePercent: 0,
      currency: c.currency,
      logo: c.logo,
      exchange: c.exchange,
      category: "international" as const,
      lastUpdated: now,
    }));
    
    return NextResponse.json<StockPriceResponse>({
      success: false,
      data: {
        pakistani: fallbackPakistani,
        international: fallbackInternational,
      },
      source: "fallback",
      lastUpdated: now,
    });
  }
}

export const revalidate = 300; // 5 minutes
