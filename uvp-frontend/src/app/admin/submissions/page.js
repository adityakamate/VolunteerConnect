"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRequest, putRequest } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, CheckCircle2, Clock, Calendar, User, FileText, ChevronRight, XCircle, Search, Filter } from "lucide-react";

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("under_review");

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fetchSubmissions = async (tab) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const endpoint = tab === "approved" ? "/admin/submissions/approved" : "/admin/submissions/pending";
      const res = await getRequest(endpoint, { headers: { Authorization: `Bearer ${token}` } });
      const data = Array.isArray(res?.data) ? res.data : [];
      setSubmissions(data.map((s) => ({
        submissionId: s.submissionId ?? s.id,
        userName: s.userName ?? s.volunteerName ?? s.volunteer ?? "",
        taskName: s.taskName ?? s.taskTitle ?? s.task ?? "",
        submittedAt: s.submittedAt ?? s.submittedDate ?? s.createdAt,
        status: s.status ?? (tab === "approved" ? "APPROVED" : "UNDER_REVIEW"),
      })));
      setError(null);
    } catch (e) {
      console.error(e);
      setSubmissions([]);
      setError("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions(activeTab);
  }, [activeTab]);

  const tabs = [
    { id: "under_review", label: "Pending Review", icon: <Clock size={18} /> },
    { id: "approved", label: "Approved History", icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Access Submissions</h1>
          <p className="text-slate-500 text-lg mt-2">Review proof of work and manage volunteer approvals.</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200 w-fit"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm animate-pulse flex items-center justify-between">
                <div className="w-1/3 space-y-2">
                  <div className="h-5 bg-slate-100 rounded-full w-3/4" />
                  <div className="h-4 bg-slate-50 rounded-full w-1/2" />
                </div>
                <div className="h-10 w-24 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-red-200 text-red-500">
            <XCircle size={32} className="mx-auto mb-2" />
            <p>{error}</p>
          </div>
        ) : submissions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm"
          >
            <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileCheck size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">No submissions found</h3>
            <p className="text-slate-500 mt-2">
              {activeTab === 'approved' ? "No approved submissions yet." : "You're all caught up! No pending reviews."}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {submissions.map((s, idx) => (
                <motion.div
                  key={s.submissionId || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white rounded-[1.5rem] p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 border border-slate-100 hover:border-indigo-100 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 w-full text-center md:text-left space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {s.taskName}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <User size={14} className="text-indigo-400" />
                          {s.userName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-indigo-400" />
                          Submitted: {formatDate(s.submittedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/submissions/${s.submissionId}`}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm group-hover:shadow-md"
                      >
                        <span>Review Details</span>
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
