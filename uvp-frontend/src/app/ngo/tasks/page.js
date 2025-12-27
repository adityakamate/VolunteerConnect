"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { postRequest } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, LayoutList, History, AlertCircle, Calendar, Users, Edit3, Lock, Eye } from "lucide-react";

export default function NGOTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("open");

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const tabs = [
    { id: "open", label: "Active Tasks", status: "OPEN", icon: <LayoutList size={18} /> },
    { id: "closed", label: "Task History", status: "CLOSED", icon: <History size={18} /> }
  ];

  const fetchTasks = async (status = "OPEN") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await postRequest(`/organization/tasks/${status}`, {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(res.data || []);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(activeTab === "open" ? "OPEN" : "CLOSED");
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCloseTask = async (taskId) => {
    if (!confirm("Are you sure you want to close this task?")) return;
    try {
      const res = await postRequest("/organization/task/close/" + taskId);
      if (res.status === 200 || res.status === 201) {
        alert("Task closed successfully!");
        fetchTasks(activeTab === "open" ? "OPEN" : "CLOSED");
      } else {
        alert("Failed to close task.");
      }
    } catch (err) {
      console.error("Error closing task:", err);
      alert("Failed to close task.");
    }
  };

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Access Tasks</h1>
            <p className="text-slate-500 text-lg mt-2">Create and manage volunteering opportunities.</p>
          </motion.div>

          {activeTab === 'open' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link
                href="/ngo/tasks/create"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-105 transition-all"
              >
                <Plus size={20} />
                <span>Create New Task</span>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Task List */}
        <div>
          {loading ? (
            <div className="flex flex-col gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 animate-pulse flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-64 h-48 md:h-40 bg-slate-100 rounded-[2rem] shrink-0"></div>
                  <div className="flex-1 w-full space-y-3">
                    <div className="w-2/3 h-6 bg-slate-100 rounded-full"></div>
                    <div className="w-1/2 h-4 bg-slate-50 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-red-200 text-red-500">
              <AlertCircle size={32} className="mx-auto mb-2" />
              <p>{error}</p>
            </div>
          ) : tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm"
            >
              <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <LayoutList size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">No {activeTab} tasks</h3>
              <p className="text-slate-500 mt-2">
                {activeTab === 'open' ? "Get started by creating a new volunteering task." : "Closed tasks will appear here."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="flex flex-col gap-6"
            >
              <AnimatePresence mode="popLayout">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.taskId || task.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-[2.5rem] p-4 md:p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 border border-white hover:border-indigo-100 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center"
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-72 aspect-video md:aspect-auto md:h-48 rounded-[2rem] bg-indigo-50 overflow-hidden shrink-0">
                      {task.imageUrl ? (
                        <img
                          src={task.imageUrl}
                          alt={task.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-indigo-300">
                          <LayoutList size={48} />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                        {task.capacity} spots
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {task.title}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                          {task.description || "No description provided."}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                          <Calendar size={16} className="text-indigo-400" />
                          <span>{formatDate(task.startDate)} - {formatDate(task.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                          <Users size={16} className="text-indigo-400" />
                          <span>{task.appliedCount || 0} Applicants</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full md:w-48 flex flex-col gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                      {task.status === "OPEN" && (
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={`/ngo/tasks/edit/${task.taskId}`}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors"
                          >
                            <Edit3 size={16} /> Edit
                          </Link>
                          <button
                            onClick={() => handleCloseTask(task.taskId)}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors"
                          >
                            <Lock size={16} /> Close
                          </button>
                        </div>
                      )}
                      <Link
                        href={`/ngo/tasks/${task.taskId}`}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all text-sm"
                      >
                        <Eye size={18} /> View Page
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
