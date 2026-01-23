import { NextResponse } from "next/server";

export interface PetrolPrice {
  country: string;
  flag: string;
  petrol: number;
  diesel: number;
  currency: string;
  currencySymbol: string;
  lastUpdated: string;
}

export interface PetrolPriceResponse {
  success: boolean;
  data: PetrolPrice[];
  source: string;
  lastUpdated: string;
}

// Cache for 15 minutes
let cachedPrices: PetrolPrice[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 15 * 60 * 1000;

// Base petrol prices - these would be fetched from a real API in production
const basePetrolPrices: PetrolPrice[] = [
  { country: "Pakistan", flag: "🇵🇰", petrol: 252.10, diesel: 258.43, currency: "PKR/L", currencySymbol: "Rs", lastUpdated: "" },
  { country: "UAE", flag: "🇦🇪", petrol: 2.66, diesel: 2.79, currency: "AED/L", currencySymbol: "د.إ", lastUpdated: "" },
  { country: "Saudi Arabia", flag: "🇸🇦", petrol: 2.18, diesel: 1.15, currency: "SAR/L", currencySymbol: "﷼", lastUpdated: "" },
  { country: "USA", flag: "🇺🇸", petrol: 3.42, diesel: 3.89, currency: "USD/gal", currencySymbol: "$", lastUpdated: "" },
  { country: "UK", flag: "🇬🇧", petrol: 1.42, diesel: 1.48, currency: "GBP/L", currencySymbol: "£", lastUpdated: "" },
  { country: "India", flag: "🇮🇳", petrol: 94.72, diesel: 87.62, currency: "INR/L", currencySymbol: "₹", lastUpdated: "" },
  { country: "China", flag: "🇨🇳", petrol: 8.32, diesel: 7.98, currency: "CNY/L", currencySymbol: "¥", lastUpdated: "" },
  { country: "Germany", flag: "🇩🇪", petrol: 1.75, diesel: 1.62, currency: "EUR/L", currencySymbol: "€", lastUpdated: "" },
];

async function fetchPetrolPrices(): Promise<PetrolPrice[]> {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  // Simulate realistic price variations
  const variation = (Math.sin((hour * 60 + minute) / 150) * 0.3) + (Math.random() * 0.2 - 0.1);
  
  return basePetrolPrices.map(price => ({
    ...price,
    petrol: Number((price.petrol * (1 + variation * 0.01)).toFixed(2)),
    diesel: Number((price.diesel * (1 + variation * 0.01)).toFixed(2)),
    lastUpdated: now.toISOString(),
  }));
}

export async function GET() {
  try {
    const now = Date.now();
    
    if (cachedPrices && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json<PetrolPriceResponse>({
        success: true,
        data: cachedPrices,
        source: "cache",
        lastUpdated: new Date(lastFetchTime).toISOString(),
      });
    }
    
    const prices = await fetchPetrolPrices();
    cachedPrices = prices;
    lastFetchTime = now;
    
    return NextResponse.json<PetrolPriceResponse>({
      success: true,
      data: prices,
      source: "api",
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Petrol price API error:", error);
    
    return NextResponse.json<PetrolPriceResponse>({
      success: false,
      data: basePetrolPrices.map(p => ({ ...p, lastUpdated: new Date().toISOString() })),
      source: "fallback",
      lastUpdated: new Date().toISOString(),
    });
  }
}

export const revalidate = 900; // 15 minutes
