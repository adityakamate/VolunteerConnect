"use client";
import { useEffect, useState } from "react";
import { deleteRequest, postRequest } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Calendar, Users, ArrowRight, MapPin, Clock, ChevronRight, AlertCircle, CheckCircle, XCircle, Hourglass, FileText } from "lucide-react";

export default function VolunteerAppliedTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [withdrawingId, setWithdrawingId] = useState(null);

  const tabs = [
    { id: "pending", label: "Pending", status: "PENDING" },
    { id: "approved", label: "Approved", status: "APPROVED" },
    { id: "rejected", label: "Rejected", status: "REJECTED" }
  ];

  const fetchApplied = async (status) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await postRequest(`/volunteer/get/applications/${status}`, {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res?.data || [];
      setTasks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (e) {
      setTasks([]);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplied(activeTab);
  }, [activeTab]);

  const handleWithdraw = async (applicationId) => {
    try {
      if (!applicationId) return;
      const confirmWithdraw = window.confirm('Are you sure you want to withdraw this application?');
      if (!confirmWithdraw) return;

      setWithdrawingId(applicationId);
      await deleteRequest('/volunteer/application/withdraw/' + applicationId);
      await fetchApplied(activeTab);
    } catch (e) {
      console.error(e);
      alert('Failed to withdraw application. Please try again.');
    } finally {
      setWithdrawingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'bg-emerald-500/90 text-white shadow-emerald-200';
      case 'REJECTED': return 'bg-red-500/90 text-white shadow-red-200';
      default: return 'bg-amber-500/90 text-white shadow-amber-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle size={14} className="mr-1.5" />;
      case 'REJECTED': return <XCircle size={14} className="mr-1.5" />;
      default: return <Hourglass size={14} className="mr-1.5" />;
    }
  };

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section with Glass Effect */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-16 shadow-2xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-blue-200 text-sm font-medium">
                <FileText size={14} className="text-blue-300" />
                <span>Track your journey</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                My Applications
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                Keep track of your volunteer applications and their current status.
              </p>
            </div>

            {/* Glass Tabs */}
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden ${activeTab === tab.id
                      ? "text-slate-900 shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabApplied"
                      className="absolute inset-0 bg-white"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* List Content */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-white h-56 animate-pulse flex items-center gap-8">
                    <div className="w-64 h-44 bg-slate-100 rounded-[2rem] shrink-0"></div>
                    <div className="flex-1 space-y-5">
                      <div className="h-8 bg-slate-100 rounded-full w-1/3"></div>
                      <div className="h-5 bg-slate-100 rounded-full w-1/4"></div>
                      <div className="h-12 bg-slate-100 rounded-2xl w-40 mt-6"></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : tasks.length > 0 ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6"
              >
                {tasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.01, y: -5 }}
                    className="group relative bg-white rounded-[2.5rem] p-5 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-500/20 border border-white transition-all duration-500 flex flex-col md:flex-row gap-8 overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="w-full md:w-72 h-56 md:h-auto shrink-0 relative overflow-hidden rounded-[2rem]">
                      <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                      {task.image || task.imageUrl ? (
                        <img
                          src={task.image || task.imageUrl}
                          alt={task.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-6xl">
                          {task.title ? task.title.charAt(0) : 'A'}
                        </div>
                      )}

                      {/* Floating Status Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-xl border border-white/20 flex items-center ${getStatusColor(task.status)}`}>
                          {getStatusIcon(task.status)}
                          {task.status}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 py-2 flex flex-col justify-between relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                          <Clock size={14} className="text-blue-500" />
                          <span>Applied recently</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                          {task.title}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 text-sm font-semibold text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-100 transition-colors">
                            <Calendar size={16} />
                            <span>Start: {task.startDate ? new Date(task.startDate).toLocaleDateString() : 'TBD'}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 text-sm font-semibold text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-100 transition-colors">
                            <Calendar size={16} />
                            <span>End: {task.endDate ? new Date(task.endDate).toLocaleDateString() : 'TBD'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Area */}
                      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                        <Link
                          href={`/volunteer/tasks/${task.taskId}`}
                          className="group/btn relative inline-flex items-center gap-3 px-6 py-3 bg-slate-100 text-slate-900 rounded-2xl font-bold overflow-hidden transition-all hover:bg-slate-900 hover:text-white"
                        >
                          <span className="relative z-10">View Details</span>
                          <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>

                        {task.status === 'PENDING' && (
                          <button
                            onClick={() => handleWithdraw(task.applicationId)}
                            disabled={withdrawingId === task.applicationId}
                            className="px-6 py-3 rounded-2xl border-2 border-red-100 text-red-500 text-sm font-bold hover:bg-red-50 hover:border-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {withdrawingId === task.applicationId ? 'Withdrawing...' : 'Withdraw'}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
              >
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">No applications found</h3>
                <p className="text-slate-500 mt-2">
                  {activeTab === 'pending' && 'You have no pending applications.'}
                  {activeTab === 'approved' && 'No approved applications yet.'}
                  {activeTab === 'rejected' && 'No rejected applications.'}
                </p>
                <Link
                  href="/volunteer/tasks"
                  className="inline-block mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
                >
                  Browse Tasks
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
