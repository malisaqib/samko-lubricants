"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CTASection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070)`,
          }}
        />
        <div className="absolute inset-0 bg-industrial-dark/90" />
      </div>

      {/* Accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-samko-yellow via-samko-gold to-samko-red" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-samko-yellow border-l-2 border-samko-yellow bg-samko-yellow/10 mb-4">
              Get Started
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Ready to Optimize Your{" "}
              <span className="text-samko-yellow">Operations?</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Contact our team of lubrication experts to find the perfect solution 
              for your industrial needs. We offer personalized consultations and 
              competitive pricing for bulk orders.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-samko-yellow text-industrial-dark font-semibold text-sm hover:bg-samko-gold transition-colors duration-200"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dealer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/30 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/50 transition-all duration-200"
              >
                Become a Dealer
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-sm bg-samko-yellow flex items-center justify-center">
                <Phone className="w-5 h-5 text-industrial-dark" />
              </div>
              <div>
                <p className="text-sm text-white/60">Call us directly</p>
                <p className="text-xl font-semibold text-white">+971 4 123 4567</p>
              </div>
            </div>

            <div className="space-y-4 text-white/70">
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-samko-yellow" />
                24/7 Technical Support
              </p>
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-samko-yellow" />
                Free Product Consultation
              </p>
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-samko-yellow" />
                Bulk Order Discounts Available
              </p>
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-samko-yellow" />
                Regional Delivery Network
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
