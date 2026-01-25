"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Calendar, ArrowRight, Clock, BookOpen, TrendingUp, Sparkles, Fuel, Wrench, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import { type BlogPost } from "@/lib/blog";

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const { resolvedTheme } = useTheme();
  
  const categories = [
    { name: "All", icon: BookOpen },
    { name: "Industry Trends", icon: TrendingUp },
    { name: "Technical Guide", icon: Wrench },
    { name: "Maintenance", icon: Fuel },
    { name: "Company News", icon: Newspaper },
  ];

  useEffect(() => {
    setMounted(true);
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/blog/posts?published=true");
      const data = await response.json();
      if (data.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

  if (!mounted) return null;

  return (
    <div className={cn("min-h-screen transition-colors", isDark ? "bg-industrial-darker" : "bg-gray-50")}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className={cn(
          "absolute inset-0",
          isDark 
            ? "bg-gradient-to-br from-industrial-dark via-industrial-darker to-industrial-dark" 
            : "bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"
        )} />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className={cn("w-5 h-5", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
              <span className={cn(
                "text-sm font-semibold uppercase tracking-widest",
                isDark ? "text-samko-yellow" : "text-samko-dark-red"
              )}>
                SAMKO Knowledge Hub
              </span>
            </div>
            
            <h1 className={cn(
              "font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Insights for{" "}
              <span className={cn(
                "relative",
                isDark ? "text-samko-yellow" : "text-samko-dark-red"
              )}>
                Pakistani Industry
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 4 50 7 100 7C150 7 150 1 200 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className={cn(
              "text-lg md:text-xl max-w-2xl mx-auto",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              Practical tips, technical guides, and industry updates from Pakistan&apos;s trusted lubricant experts. 
              Real knowledge for real problems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className={cn(
        "sticky top-20 z-30 py-4 backdrop-blur-xl border-b",
        isDark 
          ? "bg-industrial-darker/90 border-white/10" 
          : "bg-white/90 border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === category.name
                      ? isDark 
                        ? "bg-samko-yellow text-black" 
                        : "bg-samko-dark-red text-white"
                      : isDark
                        ? "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && activeCategory === "All" && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className={cn("w-5 h-5", isDark ? "text-samko-yellow" : "text-samko-dark-red")} />
                <span className={cn(
                  "text-sm font-semibold uppercase tracking-wider",
                  isDark ? "text-samko-yellow" : "text-samko-dark-red"
                )}>
                  Featured Article
                </span>
              </div>
              
              <Link href={`/blog/${featuredArticle.slug}`}>
                <div className={cn(
                  "group relative rounded-2xl overflow-hidden",
                  isDark 
                    ? "bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 hover:border-samko-yellow/30" 
                    : "bg-white border border-gray-200 shadow-xl hover:shadow-2xl"
                )}>
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 lg:h-96 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${featuredArticle.image})` }}
                      />
                      <div className={cn(
                        "absolute inset-0",
                        isDark 
                          ? "bg-gradient-to-r from-transparent via-transparent to-gray-900/80 lg:bg-gradient-to-r" 
                          : "bg-gradient-to-t from-white/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/80"
                      )} />
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={cn(
                          "px-3 py-1 text-xs font-semibold rounded-full",
                          isDark ? "bg-samko-yellow/10 text-samko-yellow" : "bg-red-100 text-samko-dark-red"
                        )}>
                          {featuredArticle.category}
                        </span>
                        <span className={cn(
                          "flex items-center gap-1 text-xs",
                          isDark ? "text-gray-500" : "text-gray-400"
                        )}>
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      </div>
                      
                      <h2 className={cn(
                        "text-2xl lg:text-3xl font-bold mb-4 transition-colors",
                        isDark 
                          ? "text-white group-hover:text-samko-yellow" 
                          : "text-gray-900 group-hover:text-samko-dark-red"
                      )}>
                        {featuredArticle.title}
                      </h2>
                      
                      <p className={cn(
                        "text-base mb-6 line-clamp-3",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        {featuredArticle.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                            isDark ? "bg-samko-yellow/20 text-samko-yellow" : "bg-samko-dark-red/10 text-samko-dark-red"
                          )}>
                            {featuredArticle.author.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className={cn(
                              "text-sm font-medium",
                              isDark ? "text-white" : "text-gray-900"
                            )}>
                              {featuredArticle.author}
                            </p>
                            <p className={cn(
                              "text-xs",
                              isDark ? "text-gray-500" : "text-gray-500"
                            )}>
                              {formatDate(featuredArticle.publishedAt)}
                            </p>
                          </div>
                        </div>
                        
                        <div className={cn(
                          "flex items-center gap-2 text-sm font-medium transition-colors",
                          isDark 
                            ? "text-samko-yellow group-hover:text-samko-gold" 
                            : "text-samko-dark-red group-hover:text-samko-red"
                        )}>
                          Read Article
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={cn(
                  "rounded-2xl overflow-hidden animate-pulse",
                  isDark ? "bg-white/5" : "bg-white shadow-lg"
                )}>
                  <div className={cn("h-48", isDark ? "bg-white/10" : "bg-gray-200")} />
                  <div className="p-6 space-y-4">
                    <div className={cn("h-4 w-20 rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                    <div className={cn("h-6 w-full rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                    <div className={cn("h-4 w-3/4 rounded", isDark ? "bg-white/10" : "bg-gray-200")} />
                  </div>
                </div>
              ))}
            </div>
          ) : regularArticles.length === 0 ? (
            <div className={cn(
              "text-center py-20 rounded-2xl",
              isDark ? "bg-white/5" : "bg-white shadow-lg"
            )}>
              <BookOpen className={cn(
                "w-16 h-16 mx-auto mb-4",
                isDark ? "text-gray-600" : "text-gray-300"
              )} />
              <p className={cn(
                "text-lg font-medium mb-2",
                isDark ? "text-gray-400" : "text-gray-500"
              )}>
                No articles in this category yet
              </p>
              <p className={cn(
                "text-sm",
                isDark ? "text-gray-600" : "text-gray-400"
              )}>
                Check back soon for new content
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => (
                <motion.article 
                  key={article.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${article.slug}`}>
                    <div className={cn(
                      "h-full rounded-2xl overflow-hidden transition-all duration-300",
                      isDark 
                        ? "bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-white/5 hover:border-samko-yellow/30 hover:shadow-xl hover:shadow-samko-yellow/5" 
                        : "bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:border-samko-red/20"
                    )}>
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${article.image})` }}
                        />
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-t",
                          isDark ? "from-gray-900 via-gray-900/50 to-transparent" : "from-white/80 via-transparent to-transparent"
                        )} />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={cn(
                            "px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm",
                            isDark 
                              ? "bg-black/50 text-samko-yellow border border-samko-yellow/20" 
                              : "bg-white/90 text-samko-dark-red"
                          )}>
                            {article.category}
                          </span>
                        </div>
                        
                        {/* Read Time */}
                        <div className="absolute bottom-4 right-4">
                          <span className={cn(
                            "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm",
                            isDark ? "bg-black/50 text-white" : "bg-white/90 text-gray-700"
                          )}>
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                        
                        {/* Featured Badge */}
                        {article.featured && (
                          <div className="absolute top-4 right-4">
                            <span className="px-2 py-1 bg-samko-yellow text-black text-xs font-bold rounded">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className={cn(
                          "text-lg font-bold mb-3 line-clamp-2 transition-colors",
                          isDark 
                            ? "text-white group-hover:text-samko-yellow" 
                            : "text-gray-900 group-hover:text-samko-dark-red"
                        )}>
                          {article.title}
                        </h3>
                        
                        <p className={cn(
                          "text-sm mb-4 line-clamp-2",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          {article.excerpt}
                        </p>
                        
                        {/* Author & Date */}
                        <div className="flex items-center justify-between pt-4 border-t border-dashed"
                          style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                        >
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                              isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-700"
                            )}>
                              {article.author.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className={cn(
                              "text-sm",
                              isDark ? "text-gray-400" : "text-gray-600"
                            )}>
                              {article.author.split(" ")[0]}
                            </span>
                          </div>
                          
                          <span className={cn(
                            "text-xs flex items-center gap-1",
                            isDark ? "text-gray-500" : "text-gray-400"
                          )}>
                            <Calendar className="w-3 h-3" />
                            {formatDate(article.publishedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "relative rounded-3xl overflow-hidden",
            isDark 
              ? "bg-gradient-to-br from-samko-yellow/10 via-samko-gold/5 to-samko-orange/10 border border-samko-yellow/20" 
              : "bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border border-red-100"
          )}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-samko-yellow/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-samko-orange/20 to-transparent rounded-full blur-3xl" />
            </div>
            
            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6",
                  isDark ? "bg-samko-yellow/20 text-samko-yellow" : "bg-white text-samko-dark-red shadow-md"
                )}>
                  <Sparkles className="w-4 h-4" />
                  Weekly Industry Updates
                </div>
                
                <h2 className={cn(
                  "font-heading text-3xl md:text-4xl font-bold mb-4",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  Stay Ahead of the Curve
                </h2>
                
                <p className={cn(
                  "text-lg mb-8",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  Get practical tips, price updates, and industry news delivered to your inbox. 
                  No spam, just useful content for Pakistani businesses.
                </p>
                
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className={cn(
                      "flex-1 px-5 py-4 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all",
                      isDark 
                        ? "bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:ring-samko-yellow/50 focus:border-samko-yellow/50" 
                        : "bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-samko-dark-red/50 focus:border-samko-dark-red/50 shadow-lg"
                    )}
                  />
                  <button 
                    type="submit"
                    className={cn(
                      "px-8 py-4 rounded-xl font-semibold text-sm transition-all",
                      isDark 
                        ? "bg-samko-yellow text-black hover:bg-samko-gold" 
                        : "bg-samko-dark-red text-white hover:bg-samko-red shadow-lg"
                    )}
                  >
                    Subscribe
                  </button>
                </form>
                
                <p className={cn(
                  "text-xs mt-4",
                  isDark ? "text-gray-600" : "text-gray-400"
                )}>
                  Join 2,000+ Pakistani businesses. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
