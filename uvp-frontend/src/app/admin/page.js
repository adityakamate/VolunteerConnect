"use client";

import { useEffect, useState } from "react";
import { getRequest } from "@/lib/api";
import { motion } from "framer-motion";
import { Users, Building2, Calendar, CheckCircle, XCircle, Activity, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await getRequest("/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res?.data || null);
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totals = {
    totalUsers: stats?.totalUsers ?? 0,
    totalOrganizations: stats?.totalOrganizations ?? 0,
    totalTasks: stats?.totalTasks ?? 0,
    completedTasks: stats?.completedTasks ?? 0,
    closedTasks: stats?.closedTasks ?? 0,
  };

  const completionRate = totals.totalTasks ? Math.round((totals.completedTasks / totals.totalTasks) * 100) : 0;
  const closureRate = totals.totalTasks ? Math.round((totals.closedTasks / totals.totalTasks) * 100) : 0;

  const statCards = [
    {
      label: "Total Users",
      value: totals.totalUsers,
      icon: <Users size={24} />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600",
      delay: 0
    },
    {
      label: "Organizations",
      value: totals.totalOrganizations,
      icon: <Building2 size={24} />,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50 text-emerald-600",
      delay: 0.1
    },
    {
      label: "Total Tasks",
      value: totals.totalTasks,
      icon: <Calendar size={24} />,
      color: "bg-violet-500",
      lightColor: "bg-violet-50 text-violet-600",
      delay: 0.2
    },
    {
      label: "Completed",
      value: totals.completedTasks,
      icon: <CheckCircle size={24} />,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50 text-indigo-600",
      delay: 0.3
    },
    {
      label: "Closed",
      value: totals.closedTasks,
      icon: <XCircle size={24} />,
      color: "bg-rose-500",
      lightColor: "bg-rose-50 text-rose-600",
      delay: 0.4
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-14 shadow-2xl shadow-slate-900/20">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-indigo-200 text-sm font-medium w-fit">
            <Activity size={14} className="text-indigo-300" />
            <span>Pre-release Admin Build</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Overview of platform activity, user growth, and task management metrics.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 animate-pulse h-32">
              <div className="h-10 w-10 bg-slate-100 rounded-xl mb-4" />
              <div className="h-6 w-1/2 bg-slate-100 rounded-md mb-2" />
              <div className="h-8 w-3/4 bg-slate-50 rounded-md" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
              className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.lightColor} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                {stat.label === "Completed" && (
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {completionRate}%
                  </span>
                )}
                {stat.label === "Closed" && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
                    {closureRate}%
                  </span>
                )}
              </div>
              <div>
                <p className="text-slate-500 font-medium text-sm mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Charts / Insights Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white flex flex-col"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Platform Health</h3>
              <p className="text-slate-500 text-sm">Key performance indicators</p>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>Task Completion Rate</span>
                <span>{completionRate}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-slate-700">
                <span>Task Closure Rate</span>
                <span>{closureRate}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${closureRate}%` }}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-auto">
              <p className="text-sm text-slate-600 italic">
                "High task completion rates indicate an active volunteer base. Keep monitoring pending applications."
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-center items-center text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -mb-10 -ml-10 blur-2xl" />

          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
              <Activity size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold">Quick Analysis</h3>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto mt-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <p className="text-3xl font-bold">{(totals.totalTasks / (totals.totalOrganizations || 1)).toFixed(1)}</p>
                <p className="text-xs text-indigo-200 uppercase tracking-wider font-bold mt-1">Avg Tasks / Org</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <p className="text-3xl font-bold">{(totals.totalOrganizations / (totals.totalUsers || 1) * 100).toFixed(1)}%</p>
                <p className="text-xs text-indigo-200 uppercase tracking-wider font-bold mt-1">Org Ratio</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
