"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Prices", href: "/prices" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  
  // Check if we're on the home page (which has a hero with dark background)
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state
      setIsScrolled(currentScrollY > 20);
      
      // Hide on scroll down, show on scroll up (Aramco style)
      if (currentScrollY < 100) {
        // Always show navbar at the top of the page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down & past threshold - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHomePage
            ? isDark
              ? "bg-industrial-dark/95 backdrop-blur-lg shadow-xl border-b border-white/5"
              : "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/logo.jpeg"
                    alt="SAMKO Lubricants"
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className={cn(
                  "text-xl font-bold tracking-tight transition-colors duration-300",
                  (isScrolled || !isHomePage) && !isDark ? "text-samko-dark-red group-hover:text-samko-red" : "text-white group-hover:text-samko-yellow"
                )}>
                  SAMKO
                </span>
                <span className={cn(
                  "text-[10px] uppercase tracking-[0.2em] font-medium",
                  (isScrolled || !isHomePage) && !isDark ? "text-samko-dark-red" : isDark ? "text-samko-yellow/80" : "text-samko-yellow"
                )}>
                  Lubricants
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "group relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-250 ease-out",
                    pathname === link.href
                      ? (isScrolled || !isHomePage) && !isDark ? "text-samko-dark-red" : "text-samko-yellow"
                      : (isScrolled || !isHomePage) && !isDark 
                        ? "text-gray-700 hover:text-samko-dark-red" 
                        : "text-white/90 hover:text-samko-yellow"
                  )}
                >
                  {link.name}
                  {/* Hover underline animation - slides from left to right */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out origin-left",
                      (isScrolled || !isHomePage) && !isDark ? "bg-samko-dark-red" : "bg-samko-yellow",
                      pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className={cn(
                    "p-2.5 rounded-full transition-all duration-200 [&_svg]:stroke-current [&_svg]:stroke-2 [&_svg]:fill-none",
                    (isScrolled || !isHomePage) && !isDark 
                      ? "text-gray-600 hover:text-samko-dark-red" 
                      : "text-white/80 hover:text-samko-yellow"
                  )}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Moon className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Sun className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden md:block"
              >
                <Link
                  href="/contact"
                  className="btn-premium inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-samko-yellow to-samko-gold text-industrial-dark font-semibold text-sm rounded-md hover:shadow-lg hover:shadow-samko-yellow/20 transition-all duration-200"
                >
                  Get a Quote
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2 transition-colors",
                  (isScrolled || !isHomePage) && !isDark ? "text-gray-700" : "text-white"
                )}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed top-20 left-0 right-0 z-40 backdrop-blur-lg border-b lg:hidden overflow-hidden",
              isDark
                ? "bg-industrial-dark/98 border-white/5"
                : "bg-white/98 border-gray-200"
            )}
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                      pathname === link.href
                        ? isDark
                          ? "text-samko-yellow bg-samko-yellow/10"
                          : "text-samko-dark-red bg-samko-red/5"
                        : isDark
                          ? "text-white/70 hover:text-white hover:bg-white/5"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-3 bg-gradient-to-r from-samko-yellow to-samko-gold text-industrial-dark font-semibold rounded-md"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
