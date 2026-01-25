"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { Award, Globe, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: Award,
    value: 20,
    suffix: "+",
    label: "Years of Experience",
    description: "Pioneering lubrication solutions with expertise",
  },
  {
    icon: Globe,
    value: 500,
    suffix: "+",
    label: "Dealers Across Pakistan",
    description: "From Karachi to Peshawar, we're everywhere",
  },
  {
    icon: Shield,
    value: 100,
    suffix: "%",
    label: "Quality Guaranteed",
    description: "Engineered for Pakistani conditions",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function TrustStats() {
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
        : "bg-gradient-to-b from-white via-gray-50 to-white"
    )}>
      {/* Subtle accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-samko-yellow/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className={cn(
            "inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] mb-4",
            isDark 
              ? "text-samko-yellow border-l-2 border-samko-yellow bg-samko-yellow/10" 
              : "text-samko-dark-red border-l-2 border-samko-dark-red bg-samko-red/5"
          )}>
            At a Glance
          </span>
          <h2 className={cn(
            "font-heading text-4xl md:text-5xl font-semibold tracking-tight",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Trusted by <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Industry Leaders</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative p-8 rounded-2xl text-center transition-all duration-300",
                isDark 
                  ? "bg-white/5 hover:bg-white/10 border border-white/5" 
                  : "bg-white hover:shadow-xl border border-gray-200 shadow-lg"
              )}
            >
              {/* Icon */}
              <div className={cn(
                "inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6",
                isDark 
                  ? "bg-samko-yellow/10" 
                  : "bg-gradient-to-br from-red-50 to-red-100 border border-red-200"
              )}>
                <stat.icon className={cn(
                  "w-6 h-6",
                  isDark ? "text-samko-yellow" : "text-samko-dark-red"
                )} />
              </div>

              {/* Value */}
              <div className={cn(
                "text-5xl md:text-6xl font-heading font-semibold mb-3",
                isDark ? "text-white" : "text-gray-900"
              )}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <h3 className={cn(
                "text-lg font-semibold mb-2",
                isDark ? "text-white" : "text-gray-900"
              )}>
                {stat.label}
              </h3>

              {/* Description */}
              <p className={cn(
                "text-sm",
                isDark ? "text-gray-400" : "text-gray-600"
              )}>
                {stat.description}
              </p>

              {/* Accent line */}
              <div className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5",
                isDark ? "bg-samko-yellow/50" : "bg-samko-dark-red/50"
              )} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
