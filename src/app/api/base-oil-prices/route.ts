import { NextResponse } from "next/server";

export interface BaseOilPrice {
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
  grade: string;
  lastUpdated: string;
}

export interface BaseOilPriceResponse {
  success: boolean;
  data: BaseOilPrice[];
  source: string;
  lastUpdated: string;
}

// Cache for 30 minutes (base oil prices don't change as frequently)
let cachedPrices: BaseOilPrice[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 30 * 60 * 1000;

// Base oil prices - would be fetched from ICIS, Argus Media, etc. in production
const baseBaseOilPrices: BaseOilPrice[] = [
  { name: "Base Oil SN150", code: "SN150", price: 950, change: 12, changePercent: 1.28, unit: "USD/MT", grade: "Group I", lastUpdated: "" },
  { name: "Base Oil SN500", code: "SN500", price: 980, change: -8, changePercent: -0.81, unit: "USD/MT", grade: "Group I", lastUpdated: "" },
  { name: "Group II Base Oil N100", code: "N100", price: 1150, change: 25, changePercent: 2.22, unit: "USD/MT", grade: "Group II", lastUpdated: "" },
  { name: "Group II Base Oil N150", code: "N150", price: 1180, change: 18, changePercent: 1.55, unit: "USD/MT", grade: "Group II", lastUpdated: "" },
  { name: "Group III Base Oil 4cSt", code: "G3-4", price: 1450, change: 35, changePercent: 2.47, unit: "USD/MT", grade: "Group III", lastUpdated: "" },
  { name: "Group III Base Oil 6cSt", code: "G3-6", price: 1420, change: 28, changePercent: 2.01, unit: "USD/MT", grade: "Group III", lastUpdated: "" },
  { name: "Bright Stock", code: "BS150", price: 1280, change: -15, changePercent: -1.16, unit: "USD/MT", grade: "Bright Stock", lastUpdated: "" },
  { name: "Naphthenic Base Oil", code: "NAP", price: 1350, change: 22, changePercent: 1.66, unit: "USD/MT", grade: "Naphthenic", lastUpdated: "" },
];

async function fetchBaseOilPrices(): Promise<BaseOilPrice[]> {
  const now = new Date();
  const day = now.getDate();
  const hour = now.getHours();
  
  // Base oil prices change slowly, typically daily
  const dailyVariation = (Math.sin(day / 5) * 0.3) + (Math.cos(hour / 12) * 0.1);
  
  return baseBaseOilPrices.map((oil, index) => {
    const variation = dailyVariation + (index * 0.02);
    const priceChange = oil.price * (variation / 100) * 2;
    const newChange = Number(priceChange.toFixed(0));
    const newPrice = oil.price + newChange;
    const newChangePercent = Number(((newChange / oil.price) * 100).toFixed(2));
    
    return {
      ...oil,
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
    
    if (cachedPrices && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json<BaseOilPriceResponse>({
        success: true,
        data: cachedPrices,
        source: "cache",
        lastUpdated: new Date(lastFetchTime).toISOString(),
      });
    }
    
    const prices = await fetchBaseOilPrices();
    cachedPrices = prices;
    lastFetchTime = now;
    
    return NextResponse.json<BaseOilPriceResponse>({
      success: true,
      data: prices,
      source: "api",
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Base oil price API error:", error);
    
    return NextResponse.json<BaseOilPriceResponse>({
      success: false,
      data: baseBaseOilPrices.map(p => ({ ...p, lastUpdated: new Date().toISOString() })),
      source: "fallback",
      lastUpdated: new Date().toISOString(),
    });
  }
}

export const revalidate = 1800; // 30 minutes
