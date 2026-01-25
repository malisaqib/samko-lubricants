"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Linkedin, 
  Instagram,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const footerLinks = {
  products: [
    { name: "Engine Oils", href: "/products?category=engine" },
    { name: "Hydraulic Fluids", href: "/products?category=hydraulic" },
    { name: "Gear Oils", href: "/products?category=gear" },
    { name: "Greases", href: "/products?category=greases" },
    { name: "Specialty Lubricants", href: "/products?category=specialty" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our History", href: "/about#history" },
    { name: "News & Updates", href: "/blog" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Become a Dealer", href: "/dealer" },
    { name: "Technical Support", href: "/contact" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/profile.php?id=100094002336180" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/talhatouseef/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/samkolubricants" },
];

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <footer className={cn(
      "relative pt-20 pb-8 transition-colors duration-300",
      isDark 
        ? "bg-industrial-darker" 
        : "bg-gradient-to-b from-gray-100 to-gray-50 border-t border-gray-200"
    )}>
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-samko-yellow via-samko-gold to-samko-red" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg">
                <img
                  src="/logo.jpeg"
                  alt="SAMKO Lubricants"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className={cn(
                  "text-xl font-bold tracking-tight",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  SAMKO
                </h3>
                <p className={cn(
                  "text-xs uppercase tracking-[0.2em]",
                  isDark ? "text-samko-yellow/80" : "text-samko-dark-red"
                )}>
                  Lubricants
                </p>
              </div>
            </Link>
            
            <p className={cn(
              "text-base leading-relaxed mb-8 max-w-md",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              For over 25 years, SAMKO Lubricants has been delivering premium 
              industrial lubrication solutions across Pakistan, 
              ensuring optimal performance and reliability.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  isDark ? "bg-white/5" : "bg-gray-100"
                )}>
                  <MapPin className={cn(
                    "w-4 h-4",
                    isDark ? "text-samko-yellow" : "text-samko-dark-red"
                  )} />
                </div>
                <span className={cn(
                  "text-sm",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  New Satellite Town, Sargodha, Pakistan
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  isDark ? "bg-white/5" : "bg-gray-100"
                )}>
                  <Phone className={cn(
                    "w-4 h-4",
                    isDark ? "text-samko-yellow" : "text-samko-dark-red"
                  )} />
                </div>
                <span className={cn(
                  "text-sm",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  +92 315 3210929
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  isDark ? "bg-white/5" : "bg-gray-100"
                )}>
                  <Mail className={cn(
                    "w-4 h-4",
                    isDark ? "text-samko-yellow" : "text-samko-dark-red"
                  )} />
                </div>
                <span className={cn(
                  "text-sm",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  samkolubricants@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h4 className={cn(
              "text-sm font-semibold uppercase tracking-wider mb-6",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors duration-200 inline-flex items-center group",
                      isDark 
                        ? "text-gray-400 hover:text-samko-yellow" 
                        : "text-gray-600 hover:text-samko-dark-red"
                    )}
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={cn(
              "text-sm font-semibold uppercase tracking-wider mb-6",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors duration-200 inline-flex items-center group",
                      isDark 
                        ? "text-gray-400 hover:text-samko-yellow" 
                        : "text-gray-600 hover:text-samko-dark-red"
                    )}
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className={cn(
              "text-sm font-semibold uppercase tracking-wider mb-6",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors duration-200 inline-flex items-center group",
                      isDark 
                        ? "text-gray-400 hover:text-samko-yellow" 
                        : "text-gray-600 hover:text-samko-dark-red"
                    )}
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={cn(
          "pt-8 border-t",
          isDark ? "border-white/10" : "border-gray-200"
        )}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className={cn(
              "text-sm",
              isDark ? "text-gray-500" : "text-gray-500"
            )}>
              © {new Date().getFullYear()} SAMKO Lubricants. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
                    isDark 
                      ? "bg-white/5 text-gray-400 hover:bg-samko-yellow hover:text-industrial-dark" 
                      : "bg-gray-100 text-gray-500 hover:bg-samko-yellow hover:text-industrial-dark"
                  )}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className={cn(
                  "text-sm transition-colors duration-200",
                  isDark 
                    ? "text-gray-500 hover:text-gray-300" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={cn(
                  "text-sm transition-colors duration-200",
                  isDark 
                    ? "text-gray-500 hover:text-gray-300" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
