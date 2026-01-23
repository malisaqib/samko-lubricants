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
    title: "High Performance",
    description: "Engineered for maximum efficiency and protection in demanding conditions",
  },
  {
    icon: Shield,
    title: "Proven Reliability",
    description: "Tested and trusted by industries worldwide for over four decades",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable formulations that meet environmental standards",
  },
  {
    icon: Award,
    title: "Certified Quality",
    description: "ISO certified manufacturing processes and quality control",
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
        : "bg-white"
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
              The Trusted Name in{" "}
              <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>
                Industrial Lubrication
              </span>
            </h2>

            <p className={cn(
              "text-lg mb-8 leading-relaxed",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              For over 40 years, SAMKO has been at the forefront of lubrication technology, 
              delivering products that exceed industry standards and customer expectations.
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
                    "flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center",
                    isDark 
                      ? "bg-samko-yellow/10" 
                      : "bg-samko-red/5"
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
              className="group inline-flex items-center gap-2 px-6 py-3 bg-samko-yellow text-industrial-dark font-semibold text-sm hover:bg-samko-gold transition-colors duration-200"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Content - Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
              "relative p-8 rounded-sm",
              isDark 
                ? "bg-white/5 border border-white/5" 
                : "bg-gray-50 border border-gray-100"
            )}
          >
            {/* Image */}
            <div className="relative h-64 mb-8 overflow-hidden rounded-sm">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070)` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">
                  State-of-the-art manufacturing facility
                </p>
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
