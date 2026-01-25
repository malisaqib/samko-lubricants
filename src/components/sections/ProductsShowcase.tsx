"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowRight, Droplets, Gauge, Cog, Factory, Truck, Snowflake, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "coolant",
    name: "High Grade Coolant",
    description: "Superior cooling protection for engines in extreme Pakistani summers",
    useCase: "Trucks, Buses, Heavy Vehicles",
    icon: Snowflake,
  },
  {
    id: "engine-20w50",
    name: "Engine Oil 20W-50",
    description: "Multi-grade engine oil for optimal protection in all weather conditions",
    useCase: "Motorcycles, Cars, Light Commercial Vehicles",
    icon: Gauge,
  },
  {
    id: "power-dexron",
    name: "Power Oil Dexron ATF SAE-20",
    description: "Automatic transmission fluid for smooth gear shifting and transmission longevity",
    useCase: "Automatic Transmissions, Power Steering",
    icon: Zap,
  },
  {
    id: "gear-lube",
    name: "Gear Lube ST-140 API-GL",
    description: "Heavy-duty gear lubricant for extreme pressure protection in gearboxes",
    useCase: "Cargo Trucks, Dumpers, Loader Rickshaws",
    icon: Cog,
  },
  {
    id: "pioneer-sae50",
    name: "Engine Oil Pioneer SAE-50 API-CC/SD",
    description: "Premium single-grade oil for diesel and petrol engines requiring robust protection",
    useCase: "Diesel Generators, Agricultural Machinery",
    icon: Factory,
  },
  {
    id: "hydraulic-hyd68",
    name: "Hydraulic Fluid – Heavy Duty Hydraulic Oil SAE-HYD/68",
    description: "High-performance hydraulic oil for demanding industrial and construction equipment",
    useCase: "Excavators, Cranes, Hydraulic Lifts",
    icon: Droplets,
  },
  {
    id: "s4-super",
    name: "Engine Oil S4 Super 20W-50",
    description: "Enhanced multi-grade formula for superior engine cleanliness and wear protection",
    useCase: "Motorcycles, Rickshaws, Commercial Vehicles",
    icon: Gauge,
  },
  {
    id: "hd-diesel",
    name: "Lubricating Oil – Heavy Duty Diesel Engine Oil SAE-HD/50",
    description: "Specially formulated for heavy-duty diesel engines under extreme load conditions",
    useCase: "Cargo Trucks, Dumper Trucks, Buses",
    icon: Truck,
  },
];

export default function ProductsShowcase() {
  const [mounted, setMounted] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const { resolvedTheme } = useTheme();
  
  const rotateProducts = useCallback(() => {
    setStartIndex((prev) => (prev + 4) % products.length);
  }, []);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(rotateProducts, 4000);
    return () => clearInterval(interval);
  }, [rotateProducts]);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  
  // Get 4 products starting from startIndex, wrapping around if needed
  const visibleProducts = Array.from({ length: 4 }, (_, i) => 
    products[(startIndex + i) % products.length]
  );

  return (
    <section className={cn(
      "relative py-24 transition-colors duration-300",
      isDark 
        ? "bg-industrial-darker" 
        : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className={cn(
              "inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] mb-4",
              isDark 
                ? "text-samko-yellow border-l-2 border-samko-yellow bg-samko-yellow/10" 
                : "text-samko-dark-red border-l-2 border-samko-dark-red bg-samko-red/5"
            )}>
              Our Products
            </span>
            <h2 className={cn(
              "font-heading text-4xl md:text-5xl font-semibold tracking-tight",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Premium <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Lubrication</span> Solutions
            </h2>
          </div>
          <Link
            href="/products"
            className="link-animated"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={`${product.id}-${startIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
              <div
                className={cn(
                  "group block relative overflow-hidden rounded-2xl transition-all duration-300 h-full",
                  isDark 
                    ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-samko-yellow/30" 
                    : "bg-white hover:shadow-2xl border border-gray-200 hover:border-samko-dark-red/40 shadow-lg"
                )}
              >
                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  {/* Icon */}
                  <div className={cn(
                    "inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5",
                    isDark 
                      ? "bg-samko-yellow text-industrial-dark" 
                      : "bg-gradient-to-br from-samko-yellow to-samko-gold text-industrial-dark shadow-md"
                  )}>
                    <product.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Product Name */}
                  <h3 className={cn(
                    "text-lg font-bold mb-3 leading-tight",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    {product.name}
                  </h3>
                  
                  {/* Description */}
                  <p className={cn(
                    "text-sm mb-4 grow",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    {product.description}
                  </p>
                  
                  {/* Use Case Badge */}
                  <div className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium",
                    isDark 
                      ? "bg-industrial-dark/50 text-samko-yellow border border-samko-yellow/20" 
                      : "bg-gradient-to-r from-red-50 to-orange-50 text-samko-dark-red border border-red-200"
                  )}>
                    <span className={cn(
                      "font-semibold",
                      isDark ? "text-samko-yellow/70" : "text-gray-500"
                    )}>Used in:</span>{" "}
                    {product.useCase}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
