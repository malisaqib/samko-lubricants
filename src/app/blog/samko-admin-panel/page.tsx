"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star,
  Search,
  Filter,
  ArrowLeft,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  LogOut,
  Loader2,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type BlogPost, type BlogCategory, defaultCategories } from "@/lib/blog";

type ViewMode = "list" | "create" | "edit";

export default function SecretAdminBlogPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories] = useState<BlogCategory[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Industry Trends",
    author: "",
    authorRole: "",
    image: "",
    featured: false,
    published: true,
    tags: "",
  });

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("samko_admin_token");
      if (!token) {
        router.replace("/blog/samko-admin-login");
        return;
      }

      const response = await fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (data.authenticated) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("samko_admin_token");
        router.replace("/blog/samko-admin-login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.replace("/blog/samko-admin-login");
    } finally {
      setCheckingAuth(false);
    }
  }, [router]);

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("samko_admin_token");
      router.replace("/blog/samko-admin-login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blog/posts?published=all");
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      showNotification("error", "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreatePost = async () => {
    try {
      const response = await fetch("/api/blog/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        showNotification("success", "Post created successfully!");
        resetForm();
        setViewMode("list");
        fetchPosts();
      } else {
        showNotification("error", data.error || "Failed to create post");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      showNotification("error", "Failed to create post");
    }
  };

  const handleUpdatePost = async () => {
    if (!selectedPost) return;
    
    try {
      const response = await fetch(`/api/blog/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        showNotification("success", "Post updated successfully!");
        resetForm();
        setViewMode("list");
        fetchPosts();
      } else {
        showNotification("error", data.error || "Failed to update post");
      }
    } catch (error) {
      console.error("Failed to update post:", error);
      showNotification("error", "Failed to update post");
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (data.success) {
        showNotification("success", "Post deleted successfully!");
        fetchPosts();
      } else {
        showNotification("error", data.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      showNotification("error", "Failed to delete post");
    }
  };

  const handleTogglePublished = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/blog/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        showNotification("success", post.published ? "Post unpublished" : "Post published");
        fetchPosts();
      }
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
    }
  };

  const handleToggleFeatured = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/blog/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !post.featured }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        showNotification("success", post.featured ? "Removed from featured" : "Added to featured");
        fetchPosts();
      }
    } catch (error) {
      console.error("Failed to toggle featured status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Industry Trends",
      author: "",
      authorRole: "",
      image: "",
      featured: false,
      published: true,
      tags: "",
    });
    setSelectedPost(null);
  };

  const startEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      authorRole: post.authorRole,
      image: post.image,
      featured: post.featured,
      published: post.published,
      tags: post.tags.join(", "),
    });
    setViewMode("edit");
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const inputClassName = cn(
    "w-full px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors",
    isDark 
      ? "bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-samko-yellow/50 focus:border-samko-yellow/50" 
      : "bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-samko-dark-red/50 focus:border-samko-dark-red/50"
  );

  const labelClassName = cn(
    "block text-sm font-medium mb-2",
    isDark ? "text-gray-300" : "text-gray-700"
  );

  // Loading/Auth check state
  if (!mounted || checkingAuth) {
    return (
      <div className={cn(
        "min-h-screen flex items-center justify-center",
        isDark ? "bg-industrial-darker" : "bg-gray-50"
      )}>
        <div className="text-center">
          <Loader2 className={cn(
            "w-10 h-10 animate-spin mx-auto mb-4",
            isDark ? "text-samko-yellow" : "text-samko-dark-red"
          )} />
          <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={cn("min-h-screen transition-colors", isDark ? "bg-industrial-darker" : "bg-gradient-to-b from-white via-gray-50 to-white")}>
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "fixed top-24 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg",
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          )}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </motion.div>
      )}

      {/* Header */}
      <section className="relative pt-32 pb-12">
        <div className={cn(
          "absolute inset-0",
          isDark ? "bg-gradient-to-b from-industrial-dark to-industrial-darker" : "bg-gradient-to-b from-gray-100 to-gray-50"
        )} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className={cn("w-5 h-5", isDark ? "text-green-400" : "text-green-600")} />
                <span className={cn(
                  "inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest",
                  isDark 
                    ? "text-samko-yellow border-l-2 border-samko-yellow bg-samko-yellow/10" 
                    : "text-samko-dark-red border-l-2 border-samko-dark-red bg-samko-red/5"
                )}>
                  Secure Admin Panel
                </span>
              </div>
              <h1 className={cn(
                "font-heading text-4xl font-semibold",
                isDark ? "text-white" : "text-gray-900"
              )}>
                Blog <span className={isDark ? "text-samko-yellow" : "text-samko-dark-red"}>Management</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {viewMode === "list" && (
                <button
                  onClick={() => { resetForm(); setViewMode("create"); }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-samko-yellow text-industrial-dark font-semibold text-sm hover:bg-samko-gold transition-colors rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  New Post
                </button>
              )}
              <button
                onClick={handleLogout}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors rounded-lg",
                  isDark 
                    ? "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                )}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === "list" ? (
            <>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )} />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(inputClassName, "pl-11")}
                  />
                </div>
                <div className="relative">
                  <Filter className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )} />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className={cn(inputClassName, "pl-11 pr-8 min-w-[200px]")}
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Posts Table */}
              <div className={cn(
                "rounded-xl overflow-hidden",
                isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-lg"
              )}>
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className={cn(
                      "w-8 h-8 animate-spin",
                      isDark ? "text-samko-yellow" : "text-samko-dark-red"
                    )} />
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className={isDark ? "text-gray-400" : "text-gray-500"}>No posts found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={cn(
                          "border-b",
                          isDark ? "border-white/10 bg-white/5" : "border-gray-100 bg-gray-50"
                        )}>
                          <th className={cn("px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-500")}>Post</th>
                          <th className={cn("px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-500")}>Category</th>
                          <th className={cn("px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-500")}>Author</th>
                          <th className={cn("px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-500")}>Status</th>
                          <th className={cn("px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-500")}>Actions</th>
                        </tr>
                      </thead>
                      <tbody className={cn("divide-y", isDark ? "divide-white/5" : "divide-gray-100")}>
                        {filteredPosts.map((post) => (
                          <tr 
                            key={post.id}
                            className={cn(
                              "transition-colors",
                              isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                            )}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div
                                  className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                                  style={{ backgroundImage: `url(${post.image})` }}
                                />
                                <div>
                                  <h3 className={cn(
                                    "font-medium line-clamp-1",
                                    isDark ? "text-white" : "text-gray-900"
                                  )}>
                                    {post.title}
                                  </h3>
                                  <p className={cn(
                                    "text-xs mt-1",
                                    isDark ? "text-gray-400" : "text-gray-500"
                                  )}>
                                    {new Date(post.publishedAt).toLocaleDateString()} • {post.readTime}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "inline-flex px-2 py-1 text-xs font-medium rounded-md",
                                isDark 
                                  ? "bg-samko-yellow/10 text-samko-yellow" 
                                  : "bg-samko-red/5 text-samko-dark-red"
                              )}>
                                {post.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <p className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-700")}>
                                {post.author}
                              </p>
                              <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                                {post.authorRole}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleTogglePublished(post)}
                                  className={cn(
                                    "p-1.5 rounded-md transition-colors",
                                    post.published
                                      ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                      : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
                                  )}
                                  title={post.published ? "Published" : "Draft"}
                                >
                                  {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() => handleToggleFeatured(post)}
                                  className={cn(
                                    "p-1.5 rounded-md transition-colors",
                                    post.featured
                                      ? "bg-samko-yellow/10 text-samko-yellow hover:bg-samko-yellow/20"
                                      : isDark 
                                        ? "bg-white/5 text-gray-500 hover:bg-white/10"
                                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                  )}
                                  title={post.featured ? "Featured" : "Not featured"}
                                >
                                  <Star className={cn("w-4 h-4", post.featured && "fill-current")} />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => startEdit(post)}
                                  className={cn(
                                    "p-2 rounded-md transition-colors",
                                    isDark 
                                      ? "hover:bg-white/10 text-gray-400 hover:text-white" 
                                      : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                                  )}
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="p-2 rounded-md hover:bg-red-500/10 text-red-500 hover:text-red-400 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Create/Edit Form */
            <div className={cn(
              "rounded-xl overflow-hidden",
              isDark ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200 shadow-lg"
            )}>
              <div className={cn(
                "flex items-center justify-between px-6 py-4 border-b",
                isDark ? "border-white/10" : "border-gray-100"
              )}>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => { resetForm(); setViewMode("list"); }}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      isDark 
                        ? "hover:bg-white/10 text-gray-400 hover:text-white" 
                        : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    )}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className={cn(
                    "text-xl font-semibold",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    {viewMode === "create" ? "Create New Post" : "Edit Post"}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { resetForm(); setViewMode("list"); }}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      isDark 
                        ? "bg-white/5 text-white hover:bg-white/10" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    <X className="w-4 h-4 inline mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={viewMode === "create" ? handleCreatePost : handleUpdatePost}
                    className="px-4 py-2 text-sm font-medium bg-samko-yellow text-industrial-dark rounded-lg hover:bg-samko-gold transition-colors"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    {viewMode === "create" ? "Publish" : "Update"}
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <label className={labelClassName}>Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter post title"
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className={labelClassName}>Excerpt *</label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Brief description of the post"
                        rows={3}
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className={labelClassName}>Content * (HTML supported)</label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your post content here. HTML tags are supported."
                        rows={15}
                        className={cn(inputClassName, "font-mono text-xs")}
                      />
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <div>
                      <label className={labelClassName}>Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={inputClassName}
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClassName}>Author Name *</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="Author name"
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className={labelClassName}>Author Role *</label>
                      <input
                        type="text"
                        value={formData.authorRole}
                        onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                        placeholder="e.g., Technical Director"
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className={labelClassName}>Featured Image URL</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://..."
                        className={inputClassName}
                      />
                      {formData.image && (
                        <div
                          className="mt-3 h-32 rounded-lg bg-cover bg-center"
                          style={{ backgroundImage: `url(${formData.image})` }}
                        />
                      )}
                    </div>

                    <div>
                      <label className={labelClassName}>Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="technology, news, guide"
                        className={inputClassName}
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.published}
                          onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                          className="w-4 h-4 accent-samko-yellow"
                        />
                        <span className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-700")}>
                          Publish immediately
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-4 h-4 accent-samko-yellow"
                        />
                        <span className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-700")}>
                          Featured post
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
