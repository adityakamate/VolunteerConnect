"use client";
import { useState, useEffect } from "react";
import { postRequest } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Calendar, Users, ArrowRight, MapPin, Clock, ChevronRight, AlertCircle, Sparkles, Search } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("open");

  const tabs = [
    { id: "open", label: "Open Tasks", status: "OPEN" },
    { id: "closed", label: "Closed", status: "CLOSED" }
  ];

  const fetchTasks = async (status = "OPEN") => {
    try {
      setLoading(true);
      const response = await postRequest(
        `/volunteer/tasks/${status}`,
        {}
      );
      const data = response?.data || [];
      setTasks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== "applied") {
      const tab = tabs.find(t => t.id === tabId);
      if (tab) {
        fetchTasks(tab.status);
      }
    }
  };

  useEffect(() => {
    fetchTasks("OPEN");
  }, []);

  // Helper to format date safely
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  if (error) return (
    <div className="flex items-center justify-center p-8 rounded-2xl bg-red-50 text-red-600 border border-red-100 shadow-sm max-w-2xl mx-auto mt-10">
      <AlertCircle className="mr-3 text-xl" />
      <span className="font-medium">{error}</span>
    </div>
  );

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section with Glass Effect */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-16 shadow-2xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-violet-200 text-sm font-medium">
                <Sparkles size={14} className="text-yellow-300" />
                <span>Make a difference today</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Volunteer Tasks
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                Discover opportunities to contribute your skills and passion to meaningful causes in your community.
              </p>
            </div>

            {/* Glass Tabs */}
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden ${activeTab === tab.id
                      ? "text-slate-900 shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
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
                    key={task.taskId}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.01, y: -5 }}
                    className="group relative bg-white rounded-[2.5rem] p-5 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-violet-500/20 border border-white transition-all duration-500 flex flex-col md:flex-row gap-8 overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="w-full md:w-72 h-56 md:h-auto shrink-0 relative overflow-hidden rounded-[2rem]">
                      <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                      {task.imageUrl ? (
                        <img
                          src={task.imageUrl}
                          alt={task.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-6xl">
                          {task.title.charAt(0)}
                        </div>
                      )}

                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-xl border border-white/20 ${task.status === 'OPEN'
                            ? 'bg-emerald-500/90 text-white'
                            : 'bg-slate-800/90 text-white'
                          }`}>
                          {task.status}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 py-2 flex flex-col justify-between relative z-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                          <Clock size={14} className="text-violet-500" />
                          <span>Posted recently</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors leading-tight">
                          {task.title}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 text-sm font-semibold text-slate-600 group-hover:bg-violet-50 group-hover:text-violet-700 group-hover:border-violet-100 transition-colors">
                            <Calendar size={16} />
                            <span>{new Date(task.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 text-sm font-semibold text-slate-600 group-hover:bg-fuchsia-50 group-hover:text-fuchsia-700 group-hover:border-fuchsia-100 transition-colors">
                            <Users size={16} />
                            <span>{task.capacity} spots</span>
                          </div>
                          {task.location && (
                            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 text-sm font-semibold text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-100 transition-colors">
                              <MapPin size={16} />
                              <span className="truncate max-w-[150px]">{task.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Area */}
                      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                        <Link
                          href={`/volunteer/tasks/${task.taskId}`}
                          className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden transition-all hover:shadow-lg hover:shadow-violet-500/30"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                          <span className="relative z-10">View Details</span>
                          <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
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
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">No tasks found</h3>
                <p className="text-slate-500 mt-2">We couldn't find any tasks matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
