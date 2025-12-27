"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/api";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'VOLUNTEER',
      };

      const response = await postRequest("/auth/register", userData);

      if (response.status === 200) {
        router.push("/auth/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("User already exists or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans overflow-hidden relative py-6">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[120px] delay-700 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10 px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 p-8 md:p-10 border border-white/50">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg shadow-indigo-500/30 mb-6 text-white"
            >
              <User size={32} />
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
            <p className="mt-2 text-slate-500 font-medium">
              Join the community of changemakers
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="relative group">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 group-focus-within:scale-110 transition-all duration-300 ease-out" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 group-focus-within:scale-110 transition-all duration-300 ease-out" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 group-focus-within:scale-110 transition-all duration-300 ease-out" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 group-focus-within:scale-110 transition-all duration-300 ease-out" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 px-1">
              <div className="relative flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                />
              </div>
              <label htmlFor="terms" className="text-xs text-slate-500 font-medium leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                <>
                  Create Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors inline-flex items-center gap-1 uppercase tracking-wider">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
