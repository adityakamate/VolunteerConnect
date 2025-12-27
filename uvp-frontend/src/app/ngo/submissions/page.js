"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Hourglass, CheckCircle2, FileText, Calendar, User, Eye, AlertCircle } from "lucide-react";
import { getRequest } from "@/lib/api";

export default function NGOAllSubmissionsPage() {
  const [submissions, setSubmitting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("under_review");

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fetchSubmissions = async (tab) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const endpoint = tab === "approved" ? "/organization/submission/approved" : "/organization/submission/in-process";
      const res = await getRequest(endpoint, { headers: { Authorization: `Bearer ${token}` } });
      const data = res?.data || [];
      if (Array.isArray(data)) {
        setSubmitting(data);
      } else {
        setSubmitting([]);
      }
      setError(null);
    } catch (e) {
      console.error(e);
      setSubmitting([]);
      // Don't show error on empty lists, just empty state
      if (e.response?.status !== 404) {
        setError("Could not load submissions");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions(activeTab);
  }, [activeTab]);

  const tabs = [
    { id: "under_review", label: "Under Review", icon: <Hourglass size={18} /> },
    { id: "approved", label: "Approved History", icon: <CheckCircle2 size={18} /> },
  ];

  const filteredSubmissions = submissions || [];

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Submissions</h1>
            <p className="text-slate-500 text-lg mt-2">Review proof of work from volunteers and issue certificates.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm animate-pulse flex items-center justify-between">
                  <div className="space-y-2 w-1/3">
                    <div className="h-5 bg-slate-100 rounded-md w-3/4" />
                    <div className="h-4 bg-slate-50 rounded-md w-1/2" />
                  </div>
                  <div className="h-10 w-24 bg-slate-100 rounded-xl" />
                </div>
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Something went wrong</h3>
              <p className="text-slate-500 mt-2">{error}</p>
            </motion.div>
          ) : filteredSubmissions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm"
            >
              <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                {activeTab === 'approved' ? (
                  <CheckCircle2 size={48} />
                ) : (
                  <FileText size={48} />
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">No submissions found</h3>
              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                {activeTab === 'approved'
                  ? "You haven't approved any submissions yet."
                  : "There are no pending submissions to review at the moment."}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredSubmissions.map((s, idx) => (
                  <motion.div
                    key={s.submissionId ?? s.id ?? idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[1.5rem] p-5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 border border-slate-100 hover:border-indigo-100 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Icon/Image Placeholder */}
                      <div className="hidden md:flex shrink-0 w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl items-center justify-center">
                        <FileText size={28} />
                      </div>

                      <div className="flex-1 w-full md:w-auto text-center md:text-left space-y-2 md:space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {s.taskName || "Untitled Task"}
                        </h3>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5">
                            <User size={14} className="text-indigo-400" />
                            {s.userName || "Unknown Volunteer"}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-indigo-400" />
                            {formatDate(s.submittedAt)}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${s.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : s.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                        {s.status}
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/ngo/submissions/${s.submissionId ?? s.id}`}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                      >
                        <Eye size={18} />
                        <span>Review</span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
