import { NextResponse } from "next/server";
import { fallbackOilPrices, type OilPriceResponse, type OilPrice } from "@/lib/oil-prices";

// Cache the prices for 5 minutes to avoid rate limiting
let cachedPrices: OilPrice[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Yahoo Finance commodity symbols
const commoditySymbols = [
  { symbol: "BZ=F", name: "Brent Crude Oil", code: "BRENT", unit: "barrel" },
  { symbol: "CL=F", name: "WTI Crude Oil", code: "WTI", unit: "barrel" },
  { symbol: "NG=F", name: "Natural Gas", code: "NG", unit: "MMBtu" },
  { symbol: "HO=F", name: "Heating Oil", code: "HO", unit: "gallon" },
  { symbol: "RB=F", name: "Gasoline RBOB", code: "RB", unit: "gallon" },
];

async function fetchYahooFinancePrice(symbol: string): Promise<{ price: number; change: number; changePercent: number } | null> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
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
      changePercent: Number(changePercent.toFixed(2)),
    };
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
}

async function fetchFromOilPriceAPI(): Promise<OilPrice[]> {
  const now = new Date();
  const results: OilPrice[] = [];

  // Fetch all commodities in parallel
  const fetchPromises = commoditySymbols.map(async (commodity) => {
    const data = await fetchYahooFinancePrice(commodity.symbol);
    
    if (data) {
      return {
        name: commodity.name,
        code: commodity.code,
        price: data.price,
        change: data.change,
        changePercent: data.changePercent,
        currency: "USD",
        unit: commodity.unit,
        lastUpdated: now.toISOString(),
      };
    }
    
    // Fallback for this specific commodity
    const fallback = fallbackOilPrices.find(p => p.code === commodity.code);
    if (fallback) {
      return { ...fallback, lastUpdated: now.toISOString() };
    }
    return null;
  });

  const fetchedPrices = await Promise.all(fetchPromises);
  
  for (const price of fetchedPrices) {
    if (price) results.push(price);
  }

  return results.length > 0 ? results : fallbackOilPrices;
}

export async function GET() {
  try {
    const now = Date.now();
    
    // Check if we have cached data that's still valid
    if (cachedPrices && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json<OilPriceResponse>({
        success: true,
        data: cachedPrices,
        source: "cache",
        lastUpdated: new Date(lastFetchTime).toISOString(),
      });
    }
    
    // Fetch fresh data
    const prices = await fetchFromOilPriceAPI();
    
    // Update cache
    cachedPrices = prices;
    lastFetchTime = now;
    
    return NextResponse.json<OilPriceResponse>({
      success: true,
      data: prices,
      source: "api",
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    // Return fallback data if API fails
    console.error("Oil price API error, using fallback:", error);
    
    return NextResponse.json<OilPriceResponse>({
      success: true,
      data: fallbackOilPrices,
      source: "fallback",
      lastUpdated: new Date().toISOString(),
      error: "Using fallback data due to API unavailability",
    });
  }
}

// Revalidate every 5 minutes
export const revalidate = 300;
