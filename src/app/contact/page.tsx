"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { cn } from "@/lib/utils";

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_dow6usj";
const EMAILJS_TEMPLATE_ID = "template_iat8ked";
const EMAILJS_PUBLIC_KEY = "CU8xcRhLF2dPVuyh_";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      // Send email directly from browser using EmailJS
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: formData.name,
            reply_to: formData.email,
            company: formData.company || "Not provided",
            phone: formData.phone || "Not provided",
            subject: formData.subject || "SAMKO Website Inquiry",
            message: formData.message,
          },
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        const errorText = await response.text();
        console.error("EmailJS error:", errorText);
        setError("Failed to send message. Please try WhatsApp instead.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try WhatsApp instead.");
    } finally {
      setIsSubmitting(false);
    }
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
              Contact Us
            </span>
            <h1 className={cn("font-heading text-4xl md:text-6xl font-semibold mb-6", isDark ? "text-white" : "text-gray-900")}>
              Get in <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Touch</span>
            </h1>
            <p className={cn("text-xl max-w-2xl mx-auto", isDark ? "text-gray-400" : "text-gray-600")}>
              Our team is ready to help with your lubrication needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div>
                <h2 className={cn("font-heading text-2xl font-semibold mb-6", isDark ? "text-white" : "text-gray-900")}>Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, title: "Address", content: "New Satellite Town, Sargodha, Pakistan" },
                    { icon: Phone, title: "Phone / WhatsApp", content: "+92 315 3210929" },
                    { icon: Mail, title: "Email", content: "samkolubricants@gmail.com" },
                    { icon: Clock, title: "Hours", content: "Mon-Sat: 9AM-6PM PKT" },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", isDark ? "bg-samko-yellow/10" : "bg-gradient-to-br from-red-100 to-red-50 border border-red-200 shadow-sm")}>
                        <item.icon className={cn("w-5 h-5", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                      </div>
                      <div>
                        <h3 className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>{item.title}</h3>
                        <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <div className={cn("rounded-2xl p-8", isDark ? "bg-white/5 border border-white/5" : "bg-gray-50 border border-gray-100")}>
                <h2 className={cn("font-heading text-2xl font-semibold mb-6", isDark ? "text-white" : "text-gray-900")}>Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { name: "name", label: "Full Name *", type: "text", required: true },
                      { name: "email", label: "Email *", type: "email", required: true },
                      { name: "company", label: "Company", type: "text", required: false },
                      { name: "phone", label: "Phone", type: "tel", required: false },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>{field.label}</label>
                        <input type={field.type} value={formData[field.name as keyof typeof formData]} required={field.required}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className={cn("w-full px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200",
                            isDark ? "bg-white/5 border border-white/10 text-white focus:ring-samko-yellow/50 focus:border-samko-yellow/30" : "bg-white border border-gray-200 text-gray-900 focus:ring-samko-dark-red/50 focus:border-samko-dark-red/30")} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>Subject</label>
                    <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={cn("w-full px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200",
                        isDark ? "bg-white/5 border border-white/10 text-white focus:ring-samko-yellow/50 focus:border-samko-yellow/30" : "bg-white border border-gray-200 text-gray-900 focus:ring-samko-dark-red/50 focus:border-samko-dark-red/30")} />
                  </div>
                  <div>
                    <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>Message *</label>
                    <textarea rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required
                      className={cn("w-full px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 resize-none transition-all duration-200",
                        isDark ? "bg-white/5 border border-white/10 text-white focus:ring-samko-yellow/50 focus:border-samko-yellow/30" : "bg-white border border-gray-200 text-gray-900 focus:ring-samko-dark-red/50 focus:border-samko-dark-red/30")} />
                  </div>
                  
                  {/* Error Message */}
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  {/* Success Message */}
                  {submitted && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                      ✓ Message sent successfully! We will contact you shortly.
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button 
                      type="submit" 
                      className={cn(
                        "flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                        submitted
                          ? "bg-green-600 text-white"
                          : isDark 
                            ? "bg-samko-yellow hover:bg-samko-gold text-black" 
                            : "bg-samko-dark-red hover:bg-samko-red text-white shadow-lg"
                      )}
                      disabled={isSubmitting || submitted}
                    >
                      {submitted ? (
                        <><Mail className="w-4 h-4" /> Message Sent!</>
                      ) : isSubmitting ? (
                        <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </button>
                    
                    {/* WhatsApp Alternative */}
                    <a 
                      href={`https://wa.me/923153210929?text=${encodeURIComponent(`Hi SAMKO! I'm ${formData.name || 'interested'} from ${formData.company || 'a company'}. ${formData.message || 'I would like to inquire about your products.'}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 bg-green-600 hover:bg-green-500 text-white"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp Us
                    </a>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
