"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/api";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);

    try {
      const data = Object.fromEntries(formData.entries());
      const response = await postRequest("/auth/login", data);

      if (response.status === 200) {
        const { token, role } = response.data;
        localStorage.setItem("token", token);
        if (role === "volunteer") {
          router.push("/volunteer/profile");
        } else {
          router.push("/admin");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[120px] delay-1000 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10 px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 p-8 md:p-10 border border-white/50">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 mb-6 text-white"
            >
              <Lock size={32} />
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-slate-500 font-medium">
              Sign in to continue your journey
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 group-focus-within:scale-110 transition-all duration-300 ease-out" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide"
                />
              </div>

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
            </div>

            <div className="flex items-center justify-end">
              {/* <Link href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                Forgot password?
              </Link> */}
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
                  Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline transition-all">
                Create Account
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors inline-flex items-center gap-1 uppercase tracking-wider">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
