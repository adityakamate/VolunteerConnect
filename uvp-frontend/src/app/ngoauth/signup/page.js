"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { postRequest } from "@/lib/api";
import { Building2, Mail, Lock, MapPin, Phone, FileText, ArrowRight, Loader2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NGOSignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await postRequest("/auth/orgregister", data);
      if (res.status === 200) {
        router.push("/ngoauth/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed or organization already exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans overflow-hidden relative py-6">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] delay-1000 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10 px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-900/10 p-8 md:p-10 border border-white/50">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 mb-6 text-white"
            >
              <Building2 size={32} />
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Organization Registration</h2>
            <p className="mt-2 text-slate-500 font-medium">
              Join us to amplify your social impact
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div className="relative group md:col-span-2">
                <Building2 className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Organization Name"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
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
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide"
                />
              </div>

              {/* Type */}
              <div className="relative group">
                <Users className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors pointer-events-none" />
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 text-sm font-semibold tracking-wide appearance-none cursor-pointer"
                >
                  <option value="">Select Type</option>
                  <option value="OLDAGE">Old Age Care</option>
                  <option value="CHILDREN">Children Care</option>
                  <option value="DISABLED">Disabled Care</option>
                  <option value="EDUCATION">Education</option>
                  <option value="ORPHANAGE">Orphanage</option>
                  <option value="NGO">NGO</option>
                  <option value="HEALTH">Health</option>
                  <option value="ENVIRONMENT">Environment</option>
                  <option value="OTHER">Other</option>
                </select>
                <div className="absolute right-4 top-4 w-2 h-2 border-r-2 border-b-2 border-indigo-300 rotate-45 pointer-events-none group-focus-within:border-indigo-600 transition-colors" />
              </div>

              {/* Phone */}
              <div className="relative group">
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  required
                  placeholder="Contact Number"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide"
                />
              </div>

              {/* Address */}
              <div className="relative group md:col-span-2">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="Full Address"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide"
                />
              </div>

              {/* Description */}
              <div className="relative group md:col-span-2">
                <FileText className="absolute left-4 top-3.5 h-5 w-5 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
                <textarea
                  id="description"
                  name="description"
                  placeholder="Organization Description (Optional)"
                  rows="3"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 focus:scale-[1.02] transition-all duration-200 ease-out text-slate-900 placeholder:text-slate-400 text-sm font-semibold tracking-wide resize-none"
                />
              </div>

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
                  Register Organization <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">
              Already have an organization account?{" "}
              <Link href="/ngoauth/login" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors inline-flex items-center gap-1 uppercase tracking-wider">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
