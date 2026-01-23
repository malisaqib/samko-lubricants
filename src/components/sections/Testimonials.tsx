"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "SAMKO lubricants have significantly improved our machinery efficiency. The quality is consistent and reliable.",
    author: "Ahmed Al-Rashid",
    role: "Operations Director",
    company: "Gulf Manufacturing Co.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop",
  },
  {
    quote: "We've been using SAMKO products for over 15 years. Their technical support and product quality are unmatched.",
    author: "Michael Chen",
    role: "Plant Manager",
    company: "Pacific Industries Ltd.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop",
  },
  {
    quote: "The transition to SAMKO lubricants reduced our maintenance costs by 30%. Highly recommended for any industrial operation.",
    author: "Sarah Johnson",
    role: "Chief Engineer",
    company: "Atlantic Heavy Industries",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop",
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
        : "bg-gray-50"
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
            Testimonials
          </span>
          <h2 className={cn(
            "font-heading text-4xl md:text-5xl font-semibold tracking-tight",
            isDark ? "text-white" : "text-gray-900"
          )}>
            What Our <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Clients</span> Say
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
                "relative p-8 rounded-sm",
                isDark 
                  ? "bg-white/5 border border-white/5" 
                  : "bg-white border border-gray-100 shadow-sm"
              )}
            >
              {/* Customer Image */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden mb-6 ring-2 ring-samko-yellow/30">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
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
