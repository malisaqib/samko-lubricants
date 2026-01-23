"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { 
  Droplets, 
  Shield,
  Zap,
  ArrowRight,
  Star,
  Sparkles,
  Award,
  ThumbsUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "SAMKO Super Engine Oil 34",
    description: "Premium heavy-duty diesel engine oil for commercial vehicles. Provides exceptional wear protection and engine cleanliness.",
    image: "/34 super engine oil.jpeg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "SAMKO Engine Oil 20W-50",
    description: "High-performance multi-grade engine oil for modern passenger vehicles. Excellent thermal stability.",
    image: "/engine-oil-20w50.jpeg",
    badge: "Popular",
  },
  {
    id: 3,
    name: "SAMKO Hydraulic Fluid",
    description: "Anti-wear hydraulic oil for industrial systems. Superior oxidation resistance and foam control.",
    image: "/hydraulic-fluid.jpeg",
    badge: "Industrial",
  },
  {
    id: 4,
    name: "SAMKO Pioneer Engine Oil",
    description: "Premium engine oil engineered for superior performance. Extended drain intervals and low volatility.",
    image: "/pioneer engine oil.jpeg",
    badge: "Premium",
  },
  {
    id: 5,
    name: "SAMKO Gear Lube",
    description: "Extreme pressure gear oil for heavy-duty transmissions. Maximum protection under high loads.",
    image: "/gear-lube.jpeg",
    badge: "Heavy Duty",
  },
  {
    id: 6,
    name: "SAMKO Lubricating Oil",
    description: "Multi-purpose lubricating oil for industrial applications. Versatile and cost-effective solution.",
    image: "/lubricating oil.jpeg",
    badge: "Versatile",
  },
  {
    id: 7,
    name: "SAMKO Power Oil",
    description: "High-performance oil for power transmission systems. Ensures smooth operation and long service life.",
    image: "/power-oil.jpeg",
    badge: "Performance",
  },
  {
    id: 8,
    name: "SAMKO Coolant",
    description: "Premium coolant for optimal engine temperature management. Long-life formula with corrosion protection.",
    image: "/coolant.jpeg",
    badge: "Essential",
  },
];

const features = [
  {
    icon: Shield,
    title: "Maximum Protection",
    description: "Advanced formulations that protect against wear, corrosion, and deposits",
  },
  {
    icon: Zap,
    title: "Peak Performance",
    description: "Engineered to deliver optimal performance in extreme conditions",
  },
  {
    icon: Droplets,
    title: "Superior Quality",
    description: "Premium base oils and additives for exceptional lubrication",
  },
  {
    icon: Award,
    title: "Trusted Brand",
    description: "Decades of experience serving Pakistan's industrial needs",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-industrial-darker" : "bg-gray-50"
    )}>
      {/* Hero Section with Floating Elements */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className={cn(
          "absolute inset-0",
          isDark 
            ? "bg-gradient-to-br from-industrial-dark via-industrial-darker to-industrial-dark" 
            : "bg-gradient-to-br from-gray-100 via-white to-gray-100"
        )} />
        
        {/* Floating Decorative Elements */}
        <motion.div 
          className={cn(
            "absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl",
            isDark ? "bg-samko-yellow/10" : "bg-samko-yellow/20"
          )}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={cn(
            "absolute bottom-10 left-10 w-96 h-96 rounded-full blur-3xl",
            isDark ? "bg-samko-gold/5" : "bg-samko-gold/10"
          )}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] mb-6 rounded-full",
                isDark 
                  ? "text-samko-yellow bg-samko-yellow/10 border border-samko-yellow/20" 
                  : "text-samko-dark-red bg-samko-red/5 border border-samko-dark-red/20"
              )}
            >
              <Sparkles className="w-4 h-4" />
              Premium Quality
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={cn(
                "font-heading text-4xl md:text-6xl lg:text-7xl font-semibold mb-6",
                isDark ? "text-white" : "text-gray-900"
              )}
            >
              Our <span className={cn(
                "relative inline-block",
                isDark ? "text-samko-yellow" : "text-samko-dark-red"
              )}>
                Products
                <motion.span 
                  className={cn(
                    "absolute -bottom-2 left-0 h-1 rounded-full",
                    isDark ? "bg-samko-yellow" : "bg-samko-dark-red"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className={cn(
                "text-lg md:text-xl max-w-2xl mx-auto",
                isDark ? "text-gray-400" : "text-gray-600"
              )}
            >
              Comprehensive lubrication solutions engineered for every industrial application across Pakistan
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className={cn(
        "relative py-8 border-y",
        isDark 
          ? "bg-industrial-dark/50 border-white/5" 
          : "bg-white border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg cursor-default transition-all duration-300",
                  isDark 
                    ? "hover:bg-white/5" 
                    : "hover:bg-gray-50 hover:shadow-lg"
                )}
              >
                <motion.div 
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                    isDark 
                      ? "bg-samko-yellow/10 text-samko-yellow" 
                      : "bg-samko-red/10 text-samko-dark-red"
                  )}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className={cn(
                    "font-semibold text-sm",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    {feature.title}
                  </h3>
                  <p className={cn(
                    "text-xs",
                    isDark ? "text-gray-500" : "text-gray-500"
                  )}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={cn(
              "font-heading text-3xl md:text-4xl font-semibold mb-4",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Explore Our Range
            </h2>
            <p className={cn(
              "text-lg max-w-xl mx-auto",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              Quality lubricants for every engine and machine
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className={cn(
                  "relative h-full rounded-xl overflow-hidden transition-all duration-500",
                  isDark 
                    ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-samko-yellow/50 hover:shadow-2xl hover:shadow-samko-yellow/10" 
                    : "bg-white border border-gray-200 hover:border-samko-dark-red/30 hover:shadow-2xl hover:shadow-gray-300/50"
                )}>
                  {/* Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 z-10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <span className={cn(
                      "inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full",
                      isDark 
                        ? "bg-samko-yellow text-industrial-dark" 
                        : "bg-samko-dark-red text-white"
                    )}>
                      <Star className="w-3 h-3" />
                      {product.badge}
                    </span>
                  </motion.div>

                  {/* Product Image */}
                  <div className={cn(
                    "relative h-52 overflow-hidden",
                    isDark 
                      ? "bg-gradient-to-br from-industrial-dark to-industrial-darker" 
                      : "bg-gradient-to-br from-gray-100 to-white"
                  )}>
                    {/* Glow Effect on Hover */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      isDark 
                        ? "bg-gradient-to-t from-samko-yellow/20 via-transparent to-transparent" 
                        : "bg-gradient-to-t from-samko-dark-red/10 via-transparent to-transparent"
                    )} />
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-6 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={cn(
                      "text-lg font-bold mb-3 transition-colors duration-300 leading-tight",
                      isDark 
                        ? "text-white group-hover:text-samko-yellow" 
                        : "text-gray-900 group-hover:text-samko-dark-red"
                    )}>
                      {product.name}
                    </h3>
                    <p className={cn(
                      "text-sm leading-relaxed",
                      isDark ? "text-gray-400" : "text-gray-600"
                    )}>
                      {product.description}
                    </p>
                    
                    {/* Animated Line on Hover */}
                    <motion.div 
                      className={cn(
                        "mt-4 h-0.5 rounded-full",
                        isDark ? "bg-samko-yellow" : "bg-samko-dark-red"
                      )}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      style={{ transformOrigin: "left", scaleX: 0 }}
                    />
                  </div>

                  {/* Hover Border Glow */}
                  <div className={cn(
                    "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    isDark 
                      ? "shadow-[inset_0_0_30px_rgba(255,193,7,0.1)]" 
                      : "shadow-[inset_0_0_30px_rgba(178,34,34,0.05)]"
                  )} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={cn(
        "py-20",
        isDark ? "bg-industrial-dark" : "bg-white"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { value: "25+", label: "Years Experience" },
              { value: "1000+", label: "Happy Customers" },
              { value: "50+", label: "Product Varieties" },
              { value: "100%", label: "Quality Assured" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div 
                  className={cn(
                    "text-4xl md:text-5xl font-bold mb-2",
                    isDark ? "text-samko-yellow" : "text-samko-dark-red"
                  )}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <p className={cn(
                  "text-sm font-medium",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={cn(
        "py-20",
        isDark ? "bg-industrial-darker" : "bg-gray-50"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={cn(
              "font-heading text-3xl md:text-4xl font-semibold mb-4",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Why Choose SAMKO?
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description: "Every product meets strict quality standards for optimal engine protection and performance.",
              },
              {
                icon: ThumbsUp,
                title: "Customer Satisfaction",
                description: "Trusted by thousands of customers across Pakistan for reliable lubrication solutions.",
              },
              {
                icon: Zap,
                title: "Maximum Efficiency",
                description: "Our oils reduce friction, minimize wear, and maximize your machinery's lifespan.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={cn(
                  "relative p-8 rounded-xl text-center transition-all duration-300 cursor-default overflow-hidden",
                  isDark 
                    ? "bg-white/5 border border-white/10 hover:border-samko-yellow/30" 
                    : "bg-white border border-gray-200 hover:shadow-xl"
                )}
              >
                {/* Background Glow */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  isDark 
                    ? "bg-gradient-to-br from-samko-yellow/10 to-transparent" 
                    : "bg-gradient-to-br from-samko-red/5 to-transparent"
                )} />
                
                <motion.div 
                  className={cn(
                    "relative w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center",
                    isDark 
                      ? "bg-samko-yellow/10 text-samko-yellow" 
                      : "bg-samko-red/10 text-samko-dark-red"
                  )}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-8 h-8" />
                </motion.div>
                <h3 className={cn(
                  "relative text-xl font-bold mb-3",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  {item.title}
                </h3>
                <p className={cn(
                  "relative text-sm",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-samko-yellow via-samko-gold to-samko-yellow" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="font-heading text-3xl md:text-5xl font-semibold text-industrial-dark mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Power Your Machines?
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-industrial-dark/70 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Get in touch with our experts to find the perfect lubricant for your specific needs
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-industrial-dark text-white font-semibold text-base rounded-lg hover:bg-industrial-darker transition-all duration-300 hover:shadow-2xl hover:shadow-industrial-dark/30"
              >
                Contact Our Experts
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
