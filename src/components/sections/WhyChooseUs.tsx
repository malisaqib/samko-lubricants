"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Leaf, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Made for Pakistani Roads",
    description: "Formulated for extreme heat, dusty conditions & stop-go traffic of our cities",
  },
  {
    icon: Shield,
    title: "Trusted by Mechanics",
    description: "Ask any local workshop - they know SAMKO delivers real results",
  },
  {
    icon: Leaf,
    title: "Fair Pricing",
    description: "Premium quality at prices that make sense for Pakistani consumers",
  },
  {
    icon: Award,
    title: "From Sargodha, For Pakistan",
    description: "Proudly manufactured locally with quality you can trust",
  },
];



export default function WhyChooseUs() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <section className={cn(
      "relative py-24 transition-colors duration-300",
      isDark 
        ? "bg-industrial-dark" 
        : "bg-gradient-to-br from-white via-red-50/30 to-white"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={cn(
              "inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] mb-4",
              isDark 
                ? "text-samko-yellow border-l-2 border-samko-yellow bg-samko-yellow/10" 
                : "text-samko-dark-red border-l-2 border-samko-dark-red bg-samko-red/5"
            )}>
              Why Choose Us
            </span>

            <h2 className={cn(
              "font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-6",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Engineered for{" "}
              <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>
                Pakistan
              </span>
            </h2>

            <p className={cn(
              "text-lg mb-8 leading-relaxed",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              From rickshaws in Karachi to trucks on the Karakoram Highway — SAMKO keeps 
              Pakistan moving. We understand your engines because we're from here.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                    isDark 
                      ? "bg-samko-yellow/10" 
                      : "bg-gradient-to-br from-red-100 to-red-50 border border-red-200 shadow-sm"
                  )}>
                    <feature.icon className={cn(
                      "w-5 h-5",
                      isDark ? "text-samko-yellow" : "text-samko-dark-red"
                    )} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-semibold mb-1",
                      isDark ? "text-white" : "text-gray-900"
                    )}>
                      {feature.title}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="btn-primary"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right Content - Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Image 1 - Mechanic at work */}
            <div className={cn(
              "relative h-72 overflow-hidden rounded-2xl group",
              isDark ? "ring-1 ring-white/10" : "shadow-lg"
            )}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1974)` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className={cn(
                  "text-sm font-semibold",
                  "text-white"
                )}>
                  🔧 Trusted by Mechanics
                </p>
                <p className="text-white/80 text-xs mt-1">
                  Every workshop across Pakistan
                </p>
              </div>
            </div>

            {/* Image 2 - Oil/Engine */}
            <div className={cn(
              "relative h-72 overflow-hidden rounded-2xl group",
              isDark ? "ring-1 ring-white/10" : "shadow-lg"
            )}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(/whyus2.png)` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className={cn(
                  "text-sm font-semibold",
                  "text-white"
                )}>
                  🚗 Made for Every Vehicle
                </p>
                <p className="text-white/80 text-xs mt-1">
                  Cars, bikes, trucks & more
                </p>
              </div>
            </div>

            {/* Image 3 - Trucks/Highway */}
            <div className={cn(
              "relative h-72 overflow-hidden rounded-2xl group",
              isDark ? "ring-1 ring-white/10" : "shadow-lg"
            )}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(whyus3.png)` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className={cn(
                  "text-sm font-semibold",
                  "text-white"
                )}>
                  🚛 Long Haul Ready
                </p>
                <p className="text-white/80 text-xs mt-1">
                  Lahore to Karachi, non-stop
                </p>
              </div>
            </div>

            {/* Image 4 - Quality */}
            <div className={cn(
              "relative h-72 overflow-hidden rounded-2xl group",
              isDark ? "ring-1 ring-white/10" : "shadow-lg"
            )}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(whyus4.png)` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className={cn(
                  "text-sm font-semibold",
                  "text-white"
                )}>
                  ⭐ Premium Quality
                </p>
                <p className="text-white/80 text-xs mt-1">
                  Made in Sargodha with pride
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
