"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Truck, 
  Cog, 
  Droplets,
  Shield,
  ThermometerSun,
  Wind,
  Weight,
  Route,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Fuel,
  Settings,
  Gauge,
  Factory
} from "lucide-react";
import { cn } from "@/lib/utils";

// Vehicle/Machinery we serve
const vehiclesServed = [
  { 
    icon: "🏍️", 
    title: "CD 70 & Motorcycles", 
    description: "Reliable oils for daily commuters and delivery riders across Pakistan",
    gradient: "from-yellow-500 to-orange-500"
  },
  { 
    icon: "🛺", 
    title: "Loader Rickshaws", 
    description: "Heavy-duty protection for qingqi and loader rickshaws",
    gradient: "from-red-500 to-pink-500"
  },
  { 
    icon: "🚚", 
    title: "Shehzore & Mini Trucks", 
    description: "Tough lubricants for Shehzore, Mazda, and mini trucks",
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    icon: "🚛", 
    title: "Heavy Cargo Trucks", 
    description: "Premium diesel oils for long-haul cargo trucks",
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    icon: "⚙️", 
    title: "Hydraulic Machinery", 
    description: "Specialized hydraulic oils for construction equipment",
    gradient: "from-purple-500 to-violet-500"
  },
];

// Product categories
const products = [
  { icon: Droplets, title: "Engine Oils", items: ["20W50", "SAE-50", "Diesel Oils"] },
  { icon: Fuel, title: "Coolants", items: ["High Grade Coolant", "Anti-Freeze"] },
  { icon: Settings, title: "Gear & Transmission", items: ["Gear Lube", "ATF Fluids"] },
  { icon: Gauge, title: "Hydraulic Oils", items: ["ISO Grades", "Anti-Wear"] },
];

// Trust factors
const trustFactors = [
  { icon: Factory, title: "Locally Produced", description: "Made in Sargodha, Pakistan with quality raw materials" },
  { icon: Truck, title: "Tested on Pakistani Vehicles", description: "Formulated for our roads, our heat, our conditions" },
  { icon: Shield, title: "Quality Without Compromise", description: "Affordable pricing with premium protection" },
  { icon: Wrench, title: "Workshop Trusted", description: "Recommended by mechanics and operators nationwide" },
];

// Pakistani driving challenges
const challenges = [
  { icon: ThermometerSun, title: "Extreme Heat", description: "45°C+ summers" },
  { icon: Wind, title: "Dust & Sand", description: "Harsh road conditions" },
  { icon: Weight, title: "Heavy Loads", description: "Overloaded vehicles" },
  { icon: Route, title: "Long Routes", description: "Intercity journeys" },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className={cn("min-h-screen transition-colors overflow-hidden", isDark ? "bg-industrial-darker" : "bg-gray-50")}>
      
      {/* ==================== HERO SECTION ==================== */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className={cn(
            "absolute inset-0",
            isDark 
              ? "bg-gradient-to-br from-industrial-darker via-industrial-dark to-industrial-darker" 
              : "bg-gradient-to-br from-gray-100 via-white to-yellow-50"
          )} />
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(${isDark ? '#FFD700' : '#B91C1C'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#FFD700' : '#B91C1C'} 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "absolute top-32 right-[15%] w-32 h-32 rounded-full blur-3xl",
              isDark ? "bg-samko-yellow/20" : "bg-samko-red/10"
            )}
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={cn(
              "absolute bottom-32 left-[10%] w-48 h-48 rounded-full blur-3xl",
              isDark ? "bg-samko-red/15" : "bg-samko-yellow/20"
            )}
          />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="mb-6">
                  <span className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
                    isDark 
                      ? "bg-samko-yellow/10 text-samko-yellow border border-samko-yellow/20" 
                      : "bg-samko-red/10 text-samko-dark-red border border-samko-red/20"
                  )}>
                    <MapPin className="w-4 h-4" />
                    Proudly Made in Pakistan
                  </span>
                </motion.div>
                
                <motion.h1 
                  variants={fadeInUp}
                  className={cn(
                    "font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight",
                    isDark ? "text-white" : "text-gray-900"
                  )}
                >
                  Lubricants Built for{" "}
                  <span className={cn(
                    "relative inline-block",
                    isDark ? "text-samko-yellow" : "text-samko-dark-red"
                  )}>
                    Pakistan's
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className={cn(
                        "absolute -bottom-2 left-0 right-0 h-1 rounded-full origin-left",
                        isDark ? "bg-samko-yellow" : "bg-samko-dark-red"
                      )}
                    />
                  </span>{" "}
                  Roads & Machines
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className={cn(
                    "text-lg md:text-xl mb-8 leading-relaxed max-w-xl",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}
                >
                  From the CD 70s on city streets to heavy-duty cargo trucks on motorways — 
                  Samko Lubricants keeps Pakistan moving with oils made for our conditions.
                </motion.p>

                {/* Challenges Pills */}
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-8">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm",
                        isDark 
                          ? "bg-white/5 border border-white/10 text-gray-300" 
                          : "bg-white border border-gray-200 text-gray-700 shadow-sm"
                      )}
                    >
                      <challenge.icon className={cn("w-4 h-4", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                      <span className="font-medium">{challenge.title}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Link 
                    href="/products"
                    className={cn(
                      "inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all group",
                      isDark 
                        ? "bg-samko-yellow text-industrial-dark hover:bg-samko-gold hover:shadow-lg hover:shadow-samko-yellow/20" 
                        : "bg-samko-dark-red text-white hover:bg-samko-red hover:shadow-lg hover:shadow-samko-red/30"
                    )}
                  >
                    Explore Our Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Visual - Animated Vehicle Showcase */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="relative w-full aspect-square">
                  {/* Central rotating glow */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={cn(
                      "absolute inset-8 rounded-full",
                      isDark 
                        ? "bg-gradient-to-r from-samko-yellow/20 via-transparent to-samko-red/20" 
                        : "bg-gradient-to-r from-samko-yellow/30 via-transparent to-samko-red/30"
                    )}
                  />
                  
                  {/* Orbiting vehicle icons */}
                  {vehiclesServed.map((vehicle, index) => {
                    const angle = (index / vehiclesServed.length) * 2 * Math.PI - Math.PI / 2;
                    const radius = 42;
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);
                    
                    return (
                      <motion.div
                        key={vehicle.title}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.15 }}
                        whileHover={{ scale: 1.15 }}
                        className={cn(
                          "absolute w-20 h-20 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-shadow",
                          isDark 
                            ? "bg-white/10 backdrop-blur-sm border border-white/10 hover:border-samko-yellow/50" 
                            : "bg-white shadow-lg border border-gray-100 hover:shadow-xl hover:border-samko-red/30"
                        )}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <span className="text-3xl mb-1">{vehicle.icon}</span>
                        <span className={cn(
                          "text-[10px] font-medium text-center px-1 leading-tight",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          {vehicle.title.split(' ')[0]}
                        </span>
                      </motion.div>
                    );
                  })}

                  {/* Center Logo/Text */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className={cn(
                      "absolute inset-0 m-auto w-36 h-36 rounded-full flex flex-col items-center justify-center",
                      isDark 
                        ? "bg-gradient-to-br from-samko-yellow to-samko-gold shadow-2xl shadow-samko-yellow/30" 
                        : "bg-gradient-to-br from-samko-dark-red to-samko-red shadow-2xl shadow-samko-red/30"
                    )}
                  >
                    <span className={cn(
                      "text-2xl font-bold",
                      isDark ? "text-industrial-dark" : "text-white"
                    )}>SAMKO</span>
                    <span className={cn(
                      "text-xs font-medium",
                      isDark ? "text-industrial-dark/70" : "text-white/80"
                    )}>Lubricants</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={cn(
              "w-6 h-10 rounded-full border-2 flex justify-center pt-2",
              isDark ? "border-white/30" : "border-gray-400"
            )}
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={cn(
                "w-1 h-2 rounded-full",
                isDark ? "bg-samko-yellow" : "bg-samko-dark-red"
              )}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== OUR STORY SECTION ==================== */}
      <section className={cn("py-24 relative", isDark ? "bg-industrial-dark" : "bg-white")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Story Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <span className={cn(
                "inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6",
                isDark 
                  ? "bg-samko-yellow/10 text-samko-yellow" 
                  : "bg-samko-red/10 text-samko-dark-red"
              )}>
                Our Story
              </span>
              
              <h2 className={cn(
                "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
                isDark ? "text-white" : "text-gray-900"
              )}>
                Born in{" "}
                <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Sargodha</span>,
                <br />Built for Pakistan
              </h2>
              
              <div className={cn("space-y-4 text-lg leading-relaxed", isDark ? "text-gray-300" : "text-gray-600")}>
                <p>
                  Samko Lubricants started with a simple mission — to create lubricants that truly work 
                  for Pakistani vehicles and conditions. Not imported formulas that don't understand our heat. 
                  Not overpriced oils that burden our drivers.
                </p>
                <p>
                  We know the challenges our truck drivers, rickshaw operators, and mechanics face every day. 
                  The 45°C summers. The dusty roads. The heavy loads. The engines that need to keep running 
                  no matter what.
                </p>
                <p className="font-medium">
                  That's why every Samko product is formulated and tested right here in Pakistan, 
                  for the real conditions our vehicles face.
                </p>
              </div>

              {/* Location Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className={cn(
                  "inline-flex items-center gap-3 mt-8 px-6 py-4 rounded-xl",
                  isDark 
                    ? "bg-white/5 border border-white/10" 
                    : "bg-gray-50 border border-gray-200"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  isDark ? "bg-samko-yellow/20" : "bg-samko-red/10"
                )}>
                  <MapPin className={cn("w-6 h-6", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                </div>
                <div>
                  <p className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>
                    New Satellite Town, Sargodha
                  </p>
                  <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                    Punjab, Pakistan
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Visual Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Challenge Cards */}
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={cn(
                      "p-6 rounded-2xl transition-shadow",
                      isDark 
                        ? "bg-white/5 border border-white/10 hover:border-samko-yellow/30 hover:shadow-lg hover:shadow-samko-yellow/5" 
                        : "bg-gray-50 border border-gray-100 hover:border-samko-red/30 hover:shadow-lg"
                    )}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                      isDark ? "bg-samko-yellow/10" : "bg-samko-red/10"
                    )}>
                      <challenge.icon className={cn(
                        "w-7 h-7",
                        isDark ? "text-samko-yellow" : "text-samko-dark-red"
                      )} />
                    </div>
                    <h3 className={cn(
                      "text-xl font-bold mb-1",
                      isDark ? "text-white" : "text-gray-900"
                    )}>
                      {challenge.title}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )}>
                      {challenge.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Decorative element */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className={cn(
                  "absolute -z-10 -top-10 -right-10 w-40 h-40 rounded-full blur-3xl",
                  isDark ? "bg-samko-yellow/10" : "bg-samko-red/10"
                )}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== WHAT WE SERVE SECTION ==================== */}
      <section className={cn("py-24 relative overflow-hidden", isDark ? "bg-industrial-darker" : "bg-gray-50")}>
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: ["-10%", "10%"], y: ["10%", "-10%"] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className={cn(
              "absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-30",
              isDark ? "bg-samko-yellow/10" : "bg-samko-yellow/20"
            )}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className={cn(
              "inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6",
              isDark 
                ? "bg-samko-yellow/10 text-samko-yellow" 
                : "bg-samko-red/10 text-samko-dark-red"
            )}>
              What We Serve
            </span>
            <h2 className={cn(
              "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Oils for{" "}
              <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Every</span>{" "}
              Pakistani Vehicle
            </h2>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              From motorcycles to heavy machinery — we've got the right lubricant for your engine
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {vehiclesServed.map((vehicle, index) => (
              <motion.div
                key={vehicle.title}
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
                className={cn(
                  "group relative p-6 rounded-2xl text-center cursor-pointer overflow-hidden",
                  isDark 
                    ? "bg-white/5 border border-white/10 hover:border-samko-yellow/50" 
                    : "bg-white border border-gray-200 hover:border-samko-red/50 shadow-sm hover:shadow-xl"
                )}
              >
                {/* Hover gradient overlay */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  `bg-gradient-to-br ${vehicle.gradient}`
                )} style={{ opacity: 0.05 }} />
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-5xl mb-4 inline-block"
                >
                  {vehicle.icon}
                </motion.div>
                
                <h3 className={cn(
                  "font-bold text-lg mb-2 group-hover:translate-y-0 transition-transform",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  {vehicle.title}
                </h3>
                
                <p className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  {vehicle.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-1 origin-left",
                    `bg-gradient-to-r ${vehicle.gradient}`
                  )}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== PRODUCT PHILOSOPHY SECTION ==================== */}
      <section className={cn("py-24 relative", isDark ? "bg-industrial-dark" : "bg-white")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Product Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.title}
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "p-6 rounded-2xl",
                    isDark 
                      ? "bg-white/5 border border-white/10" 
                      : "bg-gray-50 border border-gray-200"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    isDark ? "bg-samko-yellow" : "bg-samko-dark-red"
                  )}>
                    <product.icon className={cn(
                      "w-6 h-6",
                      isDark ? "text-industrial-dark" : "text-white"
                    )} />
                  </div>
                  <h3 className={cn(
                    "font-bold text-lg mb-3",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    {product.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {product.items.map((item) => (
                      <li 
                        key={item}
                        className={cn(
                          "text-sm flex items-center gap-2",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}
                      >
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isDark ? "bg-samko-yellow" : "bg-samko-dark-red"
                        )} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <span className={cn(
                "inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6",
                isDark 
                  ? "bg-samko-yellow/10 text-samko-yellow" 
                  : "bg-samko-red/10 text-samko-dark-red"
              )}>
                Our Products
              </span>
              
              <h2 className={cn(
                "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
                isDark ? "text-white" : "text-gray-900"
              )}>
                Quality That{" "}
                <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Protects</span>
              </h2>
              
              <div className={cn("space-y-4 text-lg", isDark ? "text-gray-300" : "text-gray-600")}>
                <p>
                  Every Samko product is designed with one goal: <strong>keep your engine protected longer</strong>. 
                  No fancy marketing talk — just real protection that works.
                </p>
                <p>
                  Our range covers everything from engine oils and coolants to gear lubricants 
                  and hydraulic fluids. All formulated for durability and long service intervals.
                </p>
              </div>

              {/* Features list */}
              <div className="mt-8 space-y-3">
                {[
                  "Engine protection in extreme heat",
                  "Extended drain intervals",
                  "Compatible with all Pakistani vehicles",
                  "Workshop recommended formulas"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className={cn(
                      "w-5 h-5 flex-shrink-0",
                      isDark ? "text-samko-yellow" : "text-samko-dark-red"
                    )} />
                    <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== WHY TRUST SAMKO SECTION ==================== */}
      <section className={cn("py-24 relative overflow-hidden", isDark ? "bg-industrial-darker" : "bg-gray-50")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className={cn(
              "inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6",
              isDark 
                ? "bg-samko-yellow/10 text-samko-yellow" 
                : "bg-samko-red/10 text-samko-dark-red"
            )}>
              Why Choose Us
            </span>
            <h2 className={cn(
              "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Why Customers{" "}
              <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Trust</span>{" "}
              Samko
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {trustFactors.map((factor, index) => (
              <motion.div
                key={factor.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className={cn(
                  "relative p-8 rounded-2xl text-center group overflow-hidden",
                  isDark 
                    ? "bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-samko-yellow/30" 
                    : "bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-samko-red/30"
                )}
              >
                {/* Animated background */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl",
                    isDark ? "bg-samko-yellow/20" : "bg-samko-red/10"
                  )}
                />
                
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6",
                      isDark 
                        ? "bg-samko-yellow/10 group-hover:bg-samko-yellow/20" 
                        : "bg-samko-red/10 group-hover:bg-samko-red/20"
                    )}
                  >
                    <factor.icon className={cn(
                      "w-8 h-8",
                      isDark ? "text-samko-yellow" : "text-samko-dark-red"
                    )} />
                  </motion.div>
                  
                  <h3 className={cn(
                    "font-bold text-xl mb-3",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    {factor.title}
                  </h3>
                  
                  <p className={cn(
                    "text-sm leading-relaxed",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    {factor.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section className={cn("py-24 relative", isDark ? "bg-industrial-dark" : "bg-white")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className={cn(
              "inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6",
              isDark 
                ? "bg-samko-yellow/10 text-samko-yellow" 
                : "bg-samko-red/10 text-samko-dark-red"
            )}>
              Get In Touch
            </span>
            <h2 className={cn(
              "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Contact{" "}
              <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Samko</span>
            </h2>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              Have questions? Want to become a dealer? We're here to help.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <motion.a
              href="https://maps.google.com/?q=New+Satellite+Town+Sargodha+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={cn(
                "p-6 rounded-2xl text-center group cursor-pointer transition-all",
                isDark 
                  ? "bg-white/5 border border-white/10 hover:border-samko-yellow/50 hover:bg-white/10" 
                  : "bg-gray-50 border border-gray-200 hover:border-samko-red/50 hover:shadow-lg"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4 transition-colors",
                isDark 
                  ? "bg-samko-yellow/10 group-hover:bg-samko-yellow/20" 
                  : "bg-samko-red/10 group-hover:bg-samko-red/20"
              )}>
                <MapPin className={cn("w-6 h-6", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
              </div>
              <h3 className={cn("font-bold text-lg mb-2", isDark ? "text-white" : "text-gray-900")}>
                Address
              </h3>
              <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                New Satellite Town,<br />Sargodha, Pakistan
              </p>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+923153210929"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={cn(
                "p-6 rounded-2xl text-center group cursor-pointer transition-all",
                isDark 
                  ? "bg-white/5 border border-white/10 hover:border-samko-yellow/50 hover:bg-white/10" 
                  : "bg-gray-50 border border-gray-200 hover:border-samko-red/50 hover:shadow-lg"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4 transition-colors",
                isDark 
                  ? "bg-samko-yellow/10 group-hover:bg-samko-yellow/20" 
                  : "bg-samko-red/10 group-hover:bg-samko-red/20"
              )}>
                <Phone className={cn("w-6 h-6", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
              </div>
              <h3 className={cn("font-bold text-lg mb-2", isDark ? "text-white" : "text-gray-900")}>
                Phone
              </h3>
              <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                +92 315 3210929
              </p>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:samkolubricants@gmail.com"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={cn(
                "p-6 rounded-2xl text-center group cursor-pointer transition-all",
                isDark 
                  ? "bg-white/5 border border-white/10 hover:border-samko-yellow/50 hover:bg-white/10" 
                  : "bg-gray-50 border border-gray-200 hover:border-samko-red/50 hover:shadow-lg"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4 transition-colors",
                isDark 
                  ? "bg-samko-yellow/10 group-hover:bg-samko-yellow/20" 
                  : "bg-samko-red/10 group-hover:bg-samko-red/20"
              )}>
                <Mail className={cn("w-6 h-6", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
              </div>
              <h3 className={cn("font-bold text-lg mb-2", isDark ? "text-white" : "text-gray-900")}>
                Email
              </h3>
              <p className={cn("text-sm break-all", isDark ? "text-gray-400" : "text-gray-600")}>
                samkolubricants@gmail.com
              </p>
            </motion.a>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={cn(
                "p-6 rounded-2xl text-center",
                isDark 
                  ? "bg-white/5 border border-white/10" 
                  : "bg-gray-50 border border-gray-200"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4",
                isDark ? "bg-samko-yellow/10" : "bg-samko-red/10"
              )}>
                <span className={cn("text-2xl")}>🌐</span>
              </div>
              <h3 className={cn("font-bold text-lg mb-4", isDark ? "text-white" : "text-gray-900")}>
                Follow Us
              </h3>
              <div className="flex justify-center gap-4">
                <motion.a
                  href="https://facebook.com/SamkoLubricants"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    isDark 
                      ? "bg-white/10 hover:bg-samko-yellow/20 text-white hover:text-samko-yellow" 
                      : "bg-gray-200 hover:bg-samko-red/20 text-gray-700 hover:text-samko-dark-red"
                  )}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://instagram.com/Samkolubricants"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    isDark 
                      ? "bg-white/10 hover:bg-samko-yellow/20 text-white hover:text-samko-yellow" 
                      : "bg-gray-200 hover:bg-samko-red/20 text-gray-700 hover:text-samko-dark-red"
                  )}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CLOSING CTA SECTION ==================== */}
      <section className="relative py-24 overflow-hidden">
        {/* Gradient Background */}
        <div className={cn(
          "absolute inset-0",
          isDark 
            ? "bg-gradient-to-br from-samko-yellow via-samko-gold to-samko-orange" 
            : "bg-gradient-to-br from-samko-dark-red via-samko-red to-samko-orange"
        )} />
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Animated shapes */}
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-black/10 blur-3xl"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Cog className={cn("w-10 h-10", isDark ? "text-industrial-dark" : "text-white")} />
            </motion.div>

            <h2 className={cn(
              "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
              isDark ? "text-industrial-dark" : "text-white"
            )}>
              Samko Lubricants
            </h2>
            
            <p className={cn(
              "text-xl md:text-2xl font-medium mb-4",
              isDark ? "text-industrial-dark/80" : "text-white/90"
            )}>
              Powering Pakistan's Engines, Every Day.
            </p>
            
            <p className={cn(
              "text-lg mb-10 max-w-2xl mx-auto",
              isDark ? "text-industrial-dark/70" : "text-white/80"
            )}>
              From Sargodha to every corner of Pakistan — trusted by drivers, 
              mechanics, and businesses who keep the nation moving.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/products"
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all",
                    isDark 
                      ? "bg-industrial-dark text-white hover:bg-industrial-darker" 
                      : "bg-white text-samko-dark-red hover:bg-gray-100"
                  )}
                >
                  View Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/contact"
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all border-2",
                    isDark 
                      ? "border-industrial-dark text-industrial-dark hover:bg-industrial-dark/10" 
                      : "border-white text-white hover:bg-white/10"
                  )}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
