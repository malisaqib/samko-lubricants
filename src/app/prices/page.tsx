"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  RefreshCw,
  Fuel,
  Flame,
  Droplets,
  BarChart3,
  Globe,
  ArrowRight,
  Clock,
  Building2,
  Gauge,
  ChevronRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for API responses
interface OilPrice {
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  unit: string;
  lastUpdated: string;
}

interface PetrolPrice {
  country: string;
  flag: string;
  petrol: number;
  diesel: number;
  currency: string;
  currencySymbol: string;
  lastUpdated: string;
}

interface StockPrice {
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

interface BaseOilPrice {
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
  grade: string;
  lastUpdated: string;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function PricesPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { resolvedTheme } = useTheme();
  
  // API data states
  const [oilPrices, setOilPrices] = useState<OilPrice[]>([]);
  const [petrolPrices, setPetrolPrices] = useState<PetrolPrice[]>([]);
  const [stockPrices, setStockPrices] = useState<StockPrice[]>([]);
  const [baseOilPrices, setBaseOilPrices] = useState<BaseOilPrice[]>([]);
  
  // Loading states
  const [loadingOil, setLoadingOil] = useState(true);
  const [loadingPetrol, setLoadingPetrol] = useState(true);
  const [loadingStocks, setLoadingStocks] = useState(true);
  const [loadingBaseOil, setLoadingBaseOil] = useState(true);
  
  // Error states
  const [errorOil, setErrorOil] = useState<string | null>(null);
  const [errorPetrol, setErrorPetrol] = useState<string | null>(null);
  const [errorStocks, setErrorStocks] = useState<string | null>(null);
  const [errorBaseOil, setErrorBaseOil] = useState<string | null>(null);
  
  // Last updated
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch functions
  const fetchOilPrices = useCallback(async () => {
    try {
      setLoadingOil(true);
      setErrorOil(null);
      const res = await fetch('/api/oil-prices');
      const data = await res.json();
      if (data.success) {
        setOilPrices(data.data);
      } else {
        setErrorOil('Failed to fetch oil prices');
      }
    } catch {
      setErrorOil('Network error fetching oil prices');
    } finally {
      setLoadingOil(false);
    }
  }, []);

  const fetchPetrolPrices = useCallback(async () => {
    try {
      setLoadingPetrol(true);
      setErrorPetrol(null);
      const res = await fetch('/api/petrol-prices');
      const data = await res.json();
      if (data.success) {
        setPetrolPrices(data.data);
      } else {
        setErrorPetrol('Failed to fetch petrol prices');
      }
    } catch {
      setErrorPetrol('Network error fetching petrol prices');
    } finally {
      setLoadingPetrol(false);
    }
  }, []);

  const fetchStockPrices = useCallback(async () => {
    try {
      setLoadingStocks(true);
      setErrorStocks(null);
      const res = await fetch('/api/stock-prices');
      const data = await res.json();
      if (data.success) {
        setStockPrices(data.data);
      } else {
        setErrorStocks('Failed to fetch stock prices');
      }
    } catch {
      setErrorStocks('Network error fetching stock prices');
    } finally {
      setLoadingStocks(false);
    }
  }, []);

  const fetchBaseOilPrices = useCallback(async () => {
    try {
      setLoadingBaseOil(true);
      setErrorBaseOil(null);
      const res = await fetch('/api/base-oil-prices');
      const data = await res.json();
      if (data.success) {
        setBaseOilPrices(data.data);
      } else {
        setErrorBaseOil('Failed to fetch base oil prices');
      }
    } catch {
      setErrorBaseOil('Network error fetching base oil prices');
    } finally {
      setLoadingBaseOil(false);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      fetchOilPrices(),
      fetchPetrolPrices(),
      fetchStockPrices(),
      fetchBaseOilPrices()
    ]);
    setLastUpdated(new Date());
    setIsRefreshing(false);
  }, [fetchOilPrices, fetchPetrolPrices, fetchStockPrices, fetchBaseOilPrices]);
  
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchAllData();
    }, 5 * 60 * 1000);
    return () => clearInterval(refreshInterval);
  }, [fetchAllData]);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return isDark ? "text-gray-400" : "text-gray-500";
  };

  const getTrendBg = (change: number) => {
    if (change > 0) return isDark ? "bg-green-500/10" : "bg-green-50";
    if (change < 0) return isDark ? "bg-red-500/10" : "bg-red-50";
    return isDark ? "bg-gray-500/10" : "bg-gray-50";
  };

  return (
    <div className={cn("min-h-screen transition-colors", isDark ? "bg-industrial-darker" : "bg-gray-50")}>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className={cn(
          "absolute inset-0",
          isDark 
            ? "bg-gradient-to-br from-industrial-dark via-industrial-darker to-industrial-dark" 
            : "bg-gradient-to-br from-white via-gray-50 to-white"
        )} />
        
        {/* Animated background elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className={cn(
            "absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl",
            isDark ? "bg-samko-yellow/10" : "bg-samko-red/5"
          )}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          >
            <div>
              <span className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6",
                isDark 
                  ? "bg-samko-yellow/10 text-samko-yellow" 
                  : "bg-samko-red/10 text-samko-dark-red"
              )}>
                <BarChart3 className="w-4 h-4" />
                Live Market Data
              </span>
              <h1 className={cn(
                "font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4",
                isDark ? "text-white" : "text-gray-900"
              )}>
                Global Oil{" "}
                <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>
                  Prices
                </span>
              </h1>
              <p className={cn(
                "text-lg md:text-xl max-w-2xl",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>
                Track real-time crude oil, petrol prices, and energy stocks from around the world
              </p>
            </div>
            
            {/* Live Clock */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "flex items-center gap-3 px-6 py-4 rounded-xl",
                isDark 
                  ? "bg-white/5 border border-white/10" 
                  : "bg-white border border-gray-200 shadow-sm"
              )}
            >
              <Clock className={cn("w-5 h-5", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
              <div>
                <p className={cn("text-xs uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-500")}>
                  Market Time
                </p>
                <p className={cn("text-xl font-semibold font-mono", isDark ? "text-white" : "text-gray-900")}>
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Crude Oil Prices - Main Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={cn(
                "text-2xl font-bold flex items-center gap-3",
                isDark ? "text-white" : "text-gray-900"
              )}>
                <Flame className={cn("w-6 h-6", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                Crude Oil & Energy
              </h2>
              <button 
                onClick={fetchAllData}
                disabled={isRefreshing}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors disabled:opacity-50",
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                )}
              >
                <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
            
            {loadingOil ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={cn(
                    "p-6 rounded-2xl animate-pulse",
                    isDark ? "bg-white/5" : "bg-gray-100"
                  )}>
                    <div className={cn("h-4 w-16 rounded mb-2", isDark ? "bg-white/10" : "bg-gray-200")} />
                    <div className={cn("h-6 w-24 rounded mb-4", isDark ? "bg-white/10" : "bg-gray-200")} />
                    <div className={cn("h-8 w-20 rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                  </div>
                ))}
              </div>
            ) : errorOil ? (
              <div className={cn(
                "p-6 rounded-2xl flex items-center gap-3",
                isDark ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-600"
              )}>
                <AlertCircle className="w-5 h-5" />
                {errorOil}
              </div>
            ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {oilPrices.map((oil, index) => (
                <motion.div
                  key={oil.code}
                  variants={fadeInUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={cn(
                    "relative p-6 rounded-2xl overflow-hidden group cursor-pointer",
                    isDark 
                      ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-samko-yellow/30" 
                      : "bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-samko-red/30"
                  )}
                >
                  {/* Trend indicator line */}
                  <div className={cn(
                    "absolute top-0 left-0 right-0 h-1",
                    oil.change >= 0 ? "bg-green-500" : "bg-red-500"
                  )} />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className={cn(
                        "text-xs font-medium uppercase tracking-wider mb-1",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        {oil.code}
                      </p>
                      <p className={cn(
                        "text-sm font-medium",
                        isDark ? "text-gray-300" : "text-gray-700"
                      )}>
                        {oil.name}
                      </p>
                    </div>
                    <div className={cn(
                      "p-2 rounded-lg",
                      getTrendBg(oil.change)
                    )}>
                      <span className={getTrendColor(oil.change)}>
                        {getTrendIcon(oil.change)}
                      </span>
                    </div>
                  </div>
                  
                  <p className={cn(
                    "text-3xl font-bold mb-1",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    ${oil.price.toFixed(2)}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-medium", getTrendColor(oil.change))}>
                      {oil.change >= 0 ? "+" : ""}{oil.change.toFixed(2)}
                    </span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      getTrendBg(oil.change),
                      getTrendColor(oil.change)
                    )}>
                      {oil.changePercent >= 0 ? "+" : ""}{oil.changePercent.toFixed(2)}%
                    </span>
                  </div>
                  
                  <p className={cn(
                    "text-xs mt-2",
                    isDark ? "text-gray-500" : "text-gray-400"
                  )}>
                    {oil.unit}
                  </p>
                </motion.div>
              ))}
            </div>
            )}
          </motion.div>

          {/* Last Updated Info */}
          {lastUpdated && (
            <div className={cn(
              "flex items-center justify-center gap-2 text-sm mb-8",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>
              <Clock className="w-4 h-4" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Petrol Prices by Country */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={cn(
                "rounded-2xl overflow-hidden",
                isDark 
                  ? "bg-white/5 border border-white/10" 
                  : "bg-white border border-gray-200 shadow-sm"
              )}
            >
              <div className={cn(
                "flex items-center justify-between px-6 py-4 border-b",
                isDark ? "border-white/10" : "border-gray-100"
              )}>
                <h3 className={cn(
                  "text-lg font-bold flex items-center gap-2",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  <Fuel className={cn("w-5 h-5", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                  Petrol & Diesel Prices
                </h3>
                <Globe className={cn("w-5 h-5", isDark ? "text-gray-400" : "text-gray-500")} />
              </div>
              
              {loadingPetrol ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className={cn(
                      "flex items-center justify-between animate-pulse",
                      isDark ? "bg-white/5" : "bg-gray-50"
                    )}>
                      <div className={cn("h-6 w-32 rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                      <div className={cn("h-6 w-24 rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                    </div>
                  ))}
                </div>
              ) : errorPetrol ? (
                <div className={cn(
                  "p-6 flex items-center gap-3",
                  isDark ? "text-red-400" : "text-red-600"
                )}>
                  <AlertCircle className="w-5 h-5" />
                  {errorPetrol}
                </div>
              ) : (
              <div className="divide-y divide-white/5">
                {petrolPrices.map((item, index) => (
                  <motion.div
                    key={item.country}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex items-center justify-between px-6 py-4 transition-colors",
                      isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.flag}</span>
                      <div>
                        <p className={cn(
                          "font-medium",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          {item.country}
                        </p>
                        <p className={cn(
                          "text-xs",
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}>
                          {item.currency}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-500")}>Petrol</p>
                        <p className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>
                          {item.petrol.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-500")}>Diesel</p>
                        <p className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>
                          {item.diesel.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              )}
            </motion.div>

            {/* Base Oil / Lubricant Prices */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={cn(
                "rounded-2xl overflow-hidden",
                isDark 
                  ? "bg-white/5 border border-white/10" 
                  : "bg-white border border-gray-200 shadow-sm"
              )}
            >
              <div className={cn(
                "flex items-center justify-between px-6 py-4 border-b",
                isDark ? "border-white/10" : "border-gray-100"
              )}>
                <h3 className={cn(
                  "text-lg font-bold flex items-center gap-2",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  <Droplets className={cn("w-5 h-5", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                  Base Oil Prices
                </h3>
                <Gauge className={cn("w-5 h-5", isDark ? "text-gray-400" : "text-gray-500")} />
              </div>
              
              {loadingBaseOil ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={cn(
                      "flex items-center justify-between p-4 rounded-xl animate-pulse",
                      isDark ? "bg-white/5" : "bg-gray-50"
                    )}>
                      <div className={cn("h-6 w-40 rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                      <div className={cn("h-8 w-24 rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                    </div>
                  ))}
                </div>
              ) : errorBaseOil ? (
                <div className={cn(
                  "p-6 flex items-center gap-3",
                  isDark ? "text-red-400" : "text-red-600"
                )}>
                  <AlertCircle className="w-5 h-5" />
                  {errorBaseOil}
                </div>
              ) : (
              <div className="p-6 space-y-4">
                {baseOilPrices.map((item, index) => (
                  <motion.div
                    key={item.code}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl",
                      isDark ? "bg-white/5" : "bg-gray-50"
                    )}
                  >
                    <div>
                      <p className={cn(
                        "font-medium",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        {item.name}
                      </p>
                      <p className={cn(
                        "text-xs",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        {item.unit} • {item.grade}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-xl font-bold",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        ${item.price}
                      </p>
                      <span className={cn(
                        "text-sm font-medium",
                        getTrendColor(item.change)
                      )}>
                        {item.change >= 0 ? "+" : ""}${item.change} ({item.changePercent >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              )}
            </motion.div>
          </div>

          {/* Oil & Energy Stocks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={cn(
                "text-2xl font-bold flex items-center gap-3",
                isDark ? "text-white" : "text-gray-900"
              )}>
                <Building2 className={cn("w-6 h-6", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                Oil & Energy Stocks
              </h2>
              <Link 
                href="#"
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  isDark 
                    ? "text-samko-yellow hover:text-samko-gold" 
                    : "text-samko-dark-red hover:text-samko-red"
                )}
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {loadingStocks ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className={cn(
                    "p-5 rounded-xl animate-pulse",
                    isDark ? "bg-white/5" : "bg-gray-100"
                  )}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn("h-8 w-8 rounded-full", isDark ? "bg-white/10" : "bg-gray-200")} />
                      <div>
                        <div className={cn("h-4 w-20 rounded mb-1", isDark ? "bg-white/10" : "bg-gray-200")} />
                        <div className={cn("h-3 w-12 rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                      </div>
                    </div>
                    <div className={cn("h-6 w-16 rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                  </div>
                ))}
              </div>
            ) : errorStocks ? (
              <div className={cn(
                "p-6 rounded-2xl flex items-center gap-3",
                isDark ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-600"
              )}>
                <AlertCircle className="w-5 h-5" />
                {errorStocks}
              </div>
            ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stockPrices.map((stock, index) => (
                <motion.div
                  key={stock.code}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                  className={cn(
                    "p-5 rounded-xl cursor-pointer transition-all",
                    isDark 
                      ? "bg-white/5 border border-white/10 hover:border-samko-yellow/30 hover:bg-white/10" 
                      : "bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-samko-red/30"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{stock.logo}</span>
                      <div>
                        <p className={cn(
                          "font-semibold text-sm",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          {stock.name}
                        </p>
                        <p className={cn(
                          "text-xs",
                          isDark ? "text-gray-400" : "text-gray-500"
                        )}>
                          {stock.code} • {stock.exchange}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className={cn(
                        "text-2xl font-bold",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        {stock.currency === "PKR" ? "₨" : stock.currency === "SAR" ? "﷼" : "$"}{stock.price.toFixed(2)}
                      </p>
                      <p className={cn(
                        "text-xs",
                        isDark ? "text-gray-500" : "text-gray-400"
                      )}>
                        {stock.currency}
                      </p>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                      getTrendBg(stock.change),
                      getTrendColor(stock.change)
                    )}>
                      {getTrendIcon(stock.change)}
                      {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            )}
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={cn(
              "p-6 rounded-xl text-center",
              isDark ? "bg-white/5 border border-white/10" : "bg-gray-100 border border-gray-200"
            )}
          >
            <p className={cn(
              "text-sm",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              ⚠️ <strong>Disclaimer:</strong> The prices shown are for informational purposes only and may not reflect real-time market conditions. 
              Data is refreshed every 5 minutes with simulated variations. For actual trading decisions, please consult official market sources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "relative rounded-3xl overflow-hidden p-12 md:p-16 text-center",
              isDark 
                ? "bg-gradient-to-br from-samko-yellow via-samko-gold to-samko-orange" 
                : "bg-gradient-to-br from-samko-dark-red via-samko-red to-samko-orange"
            )}
          >
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative">
              <h2 className={cn(
                "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
                isDark ? "text-industrial-dark" : "text-white"
              )}>
                Need Lubricant Pricing?
              </h2>
              <p className={cn(
                "text-lg md:text-xl mb-8 max-w-2xl mx-auto",
                isDark ? "text-industrial-dark/70" : "text-white/80"
              )}>
                Get competitive quotes for Samko Lubricants products tailored to your business needs
              </p>
              <Link 
                href="/contact"
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all",
                  isDark 
                    ? "bg-industrial-dark text-white hover:bg-industrial-darker" 
                    : "bg-white text-samko-dark-red hover:bg-gray-100"
                )}
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
