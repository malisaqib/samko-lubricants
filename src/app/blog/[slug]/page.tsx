"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type BlogPost } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const [mounted, setMounted] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/posts?slug=${slug}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setPost(data.data);
      } else {
        setError("Post not found");
      }
    } catch (err) {
      console.error("Failed to fetch post:", err);
      setError("Failed to load post");
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

  if (loading) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", isDark ? "bg-industrial-darker" : "bg-white")}>
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-samko-yellow border-t-transparent" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={cn("min-h-screen flex flex-col items-center justify-center", isDark ? "bg-industrial-darker" : "bg-white")}>
        <h1 className={cn("text-2xl font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>
          {error || "Post not found"}
        </h1>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-samko-yellow hover:text-samko-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen transition-colors", isDark ? "bg-industrial-darker" : "bg-white")}>
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className={cn("absolute inset-0", isDark ? "bg-gradient-to-b from-industrial-dark to-industrial-darker" : "bg-gradient-to-b from-gray-100 to-white")} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            {/* Back Link */}
            <Link
              href="/blog"
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors",
                isDark ? "text-gray-400 hover:text-samko-yellow" : "text-gray-500 hover:text-samko-dark-red"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category */}
            <span className={cn(
              "inline-block px-3 py-1 text-xs font-semibold rounded-sm mb-6",
              isDark ? "bg-samko-yellow/10 text-samko-yellow" : "bg-samko-red/5 text-samko-dark-red"
            )}>
              {post.category}
            </span>

            {/* Title */}
            <h1 className={cn(
              "font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight",
              isDark ? "text-white" : "text-gray-900"
            )}>
              {post.title}
            </h1>

            {/* Meta */}
            <div className={cn(
              "flex flex-wrap items-center gap-6 text-sm",
              isDark ? "text-gray-400" : "text-gray-500"
            )}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
                <span className="text-gray-600">•</span>
                <span className="text-xs">{post.authorRole}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-64 md:h-96 lg:h-[28rem] rounded-sm overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            />
            <div className={cn(
              "absolute inset-0",
              isDark ? "bg-gradient-to-t from-industrial-darker/50 to-transparent" : "bg-gradient-to-t from-white/30 to-transparent"
            )} />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={cn(
              "prose prose-lg max-w-none",
              isDark 
                ? "prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-samko-yellow hover:prose-a:text-samko-gold prose-li:text-gray-300" 
                : "prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-samko-dark-red hover:prose-a:text-samko-red"
            )}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className={cn(
              "mt-12 pt-8 border-t",
              isDark ? "border-white/10" : "border-gray-200"
            )}>
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className={cn("w-4 h-4", isDark ? "text-gray-400" : "text-gray-500")} />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-sm",
                      isDark 
                        ? "bg-white/5 text-gray-300 hover:bg-white/10" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className={cn(
            "mt-8 pt-8 border-t flex items-center justify-between",
            isDark ? "border-white/10" : "border-gray-200"
          )}>
            <div>
              <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                Written by <span className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>{post.author}</span>
              </p>
              <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                {post.authorRole}
              </p>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-sm transition-colors",
                isDark 
                  ? "bg-white/5 text-gray-300 hover:bg-white/10" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className={cn("py-16", isDark ? "bg-industrial-dark" : "bg-gradient-to-b from-gray-50/50 to-white")}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={cn(
            "font-heading text-2xl font-semibold mb-4",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Explore More <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Insights</span>
          </h2>
          <p className={cn("mb-8", isDark ? "text-gray-400" : "text-gray-600")}>
            Discover more articles about industrial lubrication and maintenance
          </p>
          <Link
            href="/blog"
            className="btn-primary"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
