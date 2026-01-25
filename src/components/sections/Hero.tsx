"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    label: "Heavy Duty",
    title: "Powering Pakistan's",
    titleHighlight: "Workhorses",
    subtitle: "Premium lubricants trusted by truck drivers and transporters across Pakistan's highways.",
    image: "/slide1_f.png",
  },
  {
    id: 2,
    label: "Transport Fleet",
    title: "Keeping Fleets",
    titleHighlight: "Running Strong",
    subtitle: "Trusted by Mazda trucks and transport fleets delivering goods across the nation.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2070",
  },
  {
    id: 3,
    label: "Everyday Transport",
    title: "Fueling Pakistan's",
    titleHighlight: "Streets",
    subtitle: "From loader rickshaws to motorcycles, keeping everyday transport running smoothly.",
    image: "/slide_3_f.png",
  },
  {
    id: 4,
    label: "Engine Performance",
    title: "Maximum",
    titleHighlight: "Protection",
    subtitle: "Advanced formulations that protect engines, reduce wear, and extend machine life.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2070",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const slideDuration = 3500; // 3.5 seconds - single source of truth

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgressKey((prev) => prev + 1);
  }, []);

  // Auto-advance slides - always runs
  useEffect(() => {
    const interval = setInterval(nextSlide, slideDuration);
    return () => clearInterval(interval);
  }, [nextSlide, slideDuration]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />
          {/* Gradient Overlay - Clean corporate style */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-8"
              >
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-samko-yellow border-l-2 border-samko-yellow bg-samko-yellow/10">
                    {slides[currentSlide].label}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight"
                >
                  {slides[currentSlide].title}
                  <br />
                  <span className="text-samko-yellow">{slides[currentSlide].titleHighlight}</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed font-light"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <Link
                    href="/products"
                    className="btn-primary"
                  >
                    Explore Products
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="btn-secondary btn-secondary-dark"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Button - Left (Previous) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white/70 hover:text-white bg-black/30 hover:bg-black/50 border border-white/20 hover:border-white/40 transition-all duration-200 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Navigation Button - Right (Next) */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white/70 hover:text-white bg-black/30 hover:bg-black/50 border border-white/20 hover:border-white/40 transition-all duration-200 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-6">
            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-32">
              <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-samko-yellow"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: slideDuration / 1000, ease: "linear" }}
                  key={progressKey}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators - Bottom Center */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-samko-yellow w-8"
                : "bg-white/30 hover:bg-white/50 w-2"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
