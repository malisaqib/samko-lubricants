"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Building2, TrendingUp, Award, Users, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  { icon: TrendingUp, title: "Competitive Margins", description: "Industry-leading profit margins on all products" },
  { icon: Award, title: "Premium Products", description: "Access to our complete range of certified products" },
  { icon: Users, title: "Marketing Support", description: "Co-branded marketing materials and campaigns" },
  { icon: Building2, title: "Territory Rights", description: "Exclusive distribution rights in your region" },
];

const requirements = [
  "Established business presence in your region",
  "Adequate storage and distribution facilities",
  "Commitment to maintain inventory levels",
  "Dedicated sales team for lubricant products",
  "Financial stability and good credit standing",
];

export default function DealerPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", country: "", message: "" });
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dealer application:", formData);
    alert("Thank you for your application. Our partnership team will contact you within 48 hours.");
  };

  return (
    <div className={cn("min-h-screen transition-colors", isDark ? "bg-industrial-darker" : "bg-gradient-to-b from-white via-gray-50 to-white")}>
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className={cn("absolute inset-0", isDark ? "bg-gradient-to-b from-industrial-dark to-industrial-darker" : "bg-gradient-to-b from-red-50/50 to-white")} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className={cn("inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] mb-6",
              isDark ? "text-samko-yellow border-l-2 border-samko-yellow bg-samko-yellow/10" : "text-samko-dark-red border-l-2 border-samko-dark-red bg-samko-red/5")}>
              Partnership
            </span>
            <h1 className={cn("font-heading text-4xl md:text-6xl font-semibold mb-6", isDark ? "text-white" : "text-gray-900")}>
              Become a <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Dealer</span>
            </h1>
            <p className={cn("text-xl max-w-2xl mx-auto", isDark ? "text-gray-400" : "text-gray-600")}>
              Join our global network of authorized distributors
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className={cn("py-20", isDark ? "bg-industrial-dark" : "bg-gray-50")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className={cn("font-heading text-4xl font-semibold", isDark ? "text-white" : "text-gray-900")}>
              Partner <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Benefits</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div key={benefit.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className={cn("rounded-2xl p-6 text-center transition-all duration-300", isDark ? "bg-white/5 border border-white/5" : "bg-white border border-gray-200 shadow-lg hover:shadow-xl")}>
                <div className={cn("w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4", isDark ? "bg-samko-yellow/10" : "bg-gradient-to-br from-red-100 to-red-50 border border-red-200")}>
                  <benefit.icon className={cn("w-6 h-6", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                </div>
                <h3 className={cn("text-lg font-semibold mb-2", isDark ? "text-white" : "text-gray-900")}>{benefit.title}</h3>
                <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Application */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className={cn("font-heading text-3xl font-semibold mb-6", isDark ? "text-white" : "text-gray-900")}>Requirements</h2>
              <div className={cn("rounded-2xl p-8", isDark ? "bg-white/5 border border-white/5" : "bg-white border border-gray-200 shadow-lg")}>
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className={cn("w-5 h-5 mt-0.5 flex-shrink-0", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                      <span className={isDark ? "text-gray-300" : "text-gray-700"}>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className={cn("font-heading text-3xl font-semibold mb-6", isDark ? "text-white" : "text-gray-900")}>Apply Now</h2>
              <div className={cn("rounded-2xl p-8", isDark ? "bg-white/5 border border-white/5" : "bg-white border border-gray-200 shadow-lg")}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: "name", label: "Full Name", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "company", label: "Company Name", type: "text" },
                    { name: "phone", label: "Phone", type: "tel" },
                    { name: "country", label: "Country/Region", type: "text" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>{field.label}</label>
                      <input type={field.type} value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className={cn("w-full px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200",
                          isDark ? "bg-white/5 border border-white/10 text-white focus:ring-samko-yellow/50 focus:border-samko-yellow/30" : "bg-white border border-gray-200 text-gray-900 focus:ring-samko-dark-red/50 focus:border-samko-dark-red/30")} />
                    </div>
                  ))}
                  <div>
                    <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>Additional Information</label>
                    <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={cn("w-full px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 resize-none transition-all duration-200",
                        isDark ? "bg-white/5 border border-white/10 text-white focus:ring-samko-yellow/50 focus:border-samko-yellow/30" : "bg-white border border-gray-200 text-gray-900 focus:ring-samko-dark-red/50 focus:border-samko-dark-red/30")} />
                  </div>
                  <button type="submit"
                    className="btn-submit w-full justify-center">
                    <span>Submit Application</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
