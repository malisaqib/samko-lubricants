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
  lastUpdated: string;
}

export interface StockPriceResponse {
  success: boolean;
  data: StockPrice[];
  source: string;
  lastUpdated: string;
}

// Cache for 5 minutes
let cachedStocks: StockPrice[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000;

// Base stock prices - would be fetched from Yahoo Finance, Alpha Vantage, etc. in production
const baseStockPrices: StockPrice[] = [
  { name: "Saudi Aramco", code: "2222.SR", price: 28.45, change: 0.35, changePercent: 1.24, currency: "SAR", logo: "🛢️", exchange: "Tadawul", lastUpdated: "" },
  { name: "ExxonMobil", code: "XOM", price: 104.23, change: -1.12, changePercent: -1.06, currency: "USD", logo: "⛽", exchange: "NYSE", lastUpdated: "" },
  { name: "Shell", code: "SHEL", price: 64.89, change: 0.78, changePercent: 1.22, currency: "USD", logo: "🐚", exchange: "NYSE", lastUpdated: "" },
  { name: "Chevron", code: "CVX", price: 152.67, change: 2.34, changePercent: 1.56, currency: "USD", logo: "🔷", exchange: "NYSE", lastUpdated: "" },
  { name: "BP", code: "BP", price: 34.21, change: -0.45, changePercent: -1.30, currency: "USD", logo: "🌿", exchange: "NYSE", lastUpdated: "" },
  { name: "TotalEnergies", code: "TTE", price: 62.45, change: 0.92, changePercent: 1.49, currency: "USD", logo: "🔴", exchange: "NYSE", lastUpdated: "" },
  { name: "ConocoPhillips", code: "COP", price: 112.34, change: 1.67, changePercent: 1.51, currency: "USD", logo: "🔶", exchange: "NYSE", lastUpdated: "" },
  { name: "PSO Pakistan", code: "PSO.KA", price: 425.50, change: 5.25, changePercent: 1.25, currency: "PKR", logo: "🇵🇰", exchange: "PSX", lastUpdated: "" },
  { name: "Petrobras", code: "PBR", price: 14.82, change: -0.23, changePercent: -1.53, currency: "USD", logo: "🇧🇷", exchange: "NYSE", lastUpdated: "" },
  { name: "Sinopec", code: "SNP", price: 48.67, change: 0.45, changePercent: 0.93, currency: "USD", logo: "🇨🇳", exchange: "NYSE", lastUpdated: "" },
];

async function fetchStockPrices(): Promise<StockPrice[]> {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  
  // Simulate realistic stock price variations
  return baseStockPrices.map((stock, index) => {
    const seed = (hour * 3600 + minute * 60 + second + index * 100) / 1000;
    const variation = (Math.sin(seed) * 0.5 + Math.cos(seed * 2) * 0.3) * 2;
    const priceChange = stock.price * (variation / 100);
    const newPrice = Number((stock.price + priceChange).toFixed(2));
    const newChange = Number(priceChange.toFixed(2));
    const newChangePercent = Number(((priceChange / stock.price) * 100).toFixed(2));
    
    return {
      ...stock,
      price: newPrice,
      change: newChange,
      changePercent: newChangePercent,
      lastUpdated: now.toISOString(),
    };
  });
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
    
    return NextResponse.json<StockPriceResponse>({
      success: false,
      data: baseStockPrices.map(s => ({ ...s, lastUpdated: new Date().toISOString() })),
      source: "fallback",
      lastUpdated: new Date().toISOString(),
    });
  }
}

export const revalidate = 300; // 5 minutes
