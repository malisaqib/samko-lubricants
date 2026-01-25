"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AdminLoginPage() {
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("samko_admin_token");
      if (token) {
        const response = await fetch("/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.authenticated) {
          router.replace("/blog/samko-admin-panel");
          return;
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setCheckingAuth(false);
    }
  };

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage for client-side auth
        localStorage.setItem("samko_admin_token", data.token);
        router.replace("/blog/samko-admin-panel");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || checkingAuth) {
    return (
      <div className={cn(
        "min-h-screen flex items-center justify-center",
        isDark ? "bg-industrial-darker" : "bg-gray-50"
      )}>
        <Loader2 className={cn(
          "w-8 h-8 animate-spin",
          isDark ? "text-samko-yellow" : "text-samko-dark-red"
        )} />
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4",
      isDark 
        ? "bg-gradient-to-br from-industrial-darker via-industrial-dark to-industrial-darker" 
        : "bg-gradient-to-br from-gray-100 via-white to-gray-100"
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative w-full max-w-md p-8 rounded-2xl",
          isDark 
            ? "bg-gray-900/80 border border-white/10 backdrop-blur-xl" 
            : "bg-white border border-gray-200 shadow-2xl"
        )}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <Image
              src="/logo.png"
              alt="SAMKO Lubricants"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className={cn(
            "text-2xl font-bold mb-2",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Admin Access
          </h1>
          <p className={cn(
            "text-sm",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>
            Sign in to manage blog content
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg mb-6",
              isDark ? "bg-red-500/10 border border-red-500/20" : "bg-red-50 border border-red-200"
            )}
          >
            <AlertCircle className={cn("w-5 h-5 flex-shrink-0", isDark ? "text-red-400" : "text-red-500")} />
            <p className={cn("text-sm", isDark ? "text-red-400" : "text-red-600")}>{error}</p>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className={cn(
              "block text-sm font-medium mb-2",
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              Username
            </label>
            <div className="relative">
              <User className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5",
                isDark ? "text-gray-500" : "text-gray-400"
              )} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all",
                  isDark 
                    ? "bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-samko-yellow/50" 
                    : "bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-samko-dark-red/50"
                )}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={cn(
              "block text-sm font-medium mb-2",
              isDark ? "text-gray-300" : "text-gray-700"
            )}>
              Password
            </label>
            <div className="relative">
              <Lock className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5",
                isDark ? "text-gray-500" : "text-gray-400"
              )} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className={cn(
                  "w-full pl-11 pr-12 py-3 rounded-lg outline-none transition-all",
                  isDark 
                    ? "bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-samko-yellow/50" 
                    : "bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-samko-dark-red/50"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors",
                  isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"
                )}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2",
              isDark 
                ? "bg-samko-yellow text-black hover:bg-samko-gold disabled:opacity-50" 
                : "bg-samko-dark-red text-white hover:bg-samko-red disabled:opacity-50"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className={cn(
          "text-center text-xs mt-6",
          isDark ? "text-gray-500" : "text-gray-400"
        )}>
          Authorized personnel only
        </p>
      </motion.div>
    </div>
  );
}
