"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Used SAMKO oil in my Mehran, now the engine runs super smooth. No more noise, no more problems.",
    author: "Usman Ali",
    role: "Taxi Driver",
    company: "Lahore",
    initials: "UA",
  },
  {
    quote: "I only recommend SAMKO at my workshop. Customers are happy and there are no complaints. 100% quality.",
    author: "Haji Rasheed",
    role: "Workshop Owner",
    company: "Sargodha Auto Workshop",
    initials: "HR",
  },
  {
    quote: "I drive trucks from Karachi to Peshawar. SAMKO gear oil gives good mileage and I don't worry about engine problems.",
    author: "Muhammad Aslam",
    role: "Truck Driver",
    company: "15 years experience",
    initials: "MA",
  },
];

export default function Testimonials() {
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
          className="text-center mb-16"
        >
          <span className={cn(
            "inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] mb-4",
            isDark 
              ? "text-samko-yellow border-l-2 border-samko-yellow bg-samko-yellow/10" 
              : "text-samko-dark-red border-l-2 border-samko-dark-red bg-samko-red/5"
          )}>
            Customer Reviews
          </span>
          <h2 className={cn(
            "font-heading text-4xl md:text-5xl font-semibold tracking-tight",
            isDark ? "text-white" : "text-gray-900"
          )}>
            What Our <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Customers</span> Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative p-8 rounded-2xl",
                isDark 
                  ? "bg-white/5 border border-white/5" 
                  : "bg-white border-l-4 border-l-samko-dark-red border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
              )}
            >
              {/* Customer Initials */}
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-6 text-xl font-bold",
                isDark 
                  ? "bg-samko-yellow/20 text-samko-yellow ring-2 ring-samko-yellow/30" 
                  : "bg-samko-dark-red text-white ring-2 ring-samko-dark-red/30"
              )}>
                {testimonial.initials}
              </div>

              {/* Quote */}
              <p className={cn(
                "text-lg mb-8 leading-relaxed",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className={cn(
                "pt-6 border-t",
                isDark ? "border-white/10" : "border-gray-100"
              )}>
                <p className={cn(
                  "font-semibold",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  {testimonial.author}
                </p>
                <p className={cn(
                  "text-sm",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
