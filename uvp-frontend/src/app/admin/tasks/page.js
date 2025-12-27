"use client";

import { useEffect, useState } from "react";
import { getRequest } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar, Users, Briefcase, LayoutList, Building2, CheckCircle, Clock, XCircle, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminTasksPage() {
  const [orgTypes, setOrgTypes] = useState([
    "OLDAGE", "CHILDREN", "NGO", "DISABLED", "EDUCATION",
    "ORPHANAGE", "HEALTH", "ENVIRONMENT", "OTHER",
  ]);
  const [selectedType, setSelectedType] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizationsByType = async () => {
      if (!selectedType) {
        setOrganizations([]);
        setSelectedOrgId("");
        setTasks([]);
        return;
      }
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await getRequest(`/admin/organizations?type=${encodeURIComponent(selectedType)}`);
        const data = Array.isArray(res?.data) ? res.data : [];
        setOrganizations(data.map((o) => ({ id: o.orgId ?? o.id, name: o.name ?? o.organizationName ?? `Org ${o.orgId ?? o.id}` })));
        setSelectedOrgId("");
        setTasks([]);
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load organizations");
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizationsByType();
  }, [selectedType]);

  useEffect(() => {
    const fetchTasksForOrg = async () => {
      if (!selectedOrgId) {
        setTasks([]);
        return;
      }
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const tRes = await getRequest(`/admin/tasks/${selectedOrgId}`, { headers: { Authorization: `Bearer ${token}` } });
        const data = Array.isArray(tRes?.data) ? tRes.data : [];
        const orgName = organizations.find((o) => String(o.id) === String(selectedOrgId))?.name || "";
        setTasks(
          data.map((t) => ({
            id: t.taskId ?? t.id,
            title: t.title,
            ngo: orgName,
            status: t.status,
            capacity: t.capacity,
            startDate: t.startDate,
            endDate: t.endDate,
            description: t.description || "No description available",
            imageUrl: "http://localhost:8080/"+t.images
          }))
        );
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasksForOrg();
  }, [selectedOrgId, organizations]);

  const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "CLOSED": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Task Management</h1>
          <p className="text-slate-500 text-lg mt-2">Browse and manage volunteer tasks across organizations.</p>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-white"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Filter size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Filter Tasks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">Organization Type</label>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 font-medium focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
              >
                <option value="">Select Type...</option>
                {orgTypes.map((t) => (
                  <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>
                ))}
              </select>
              <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">Organization</label>
            <div className="relative">
              <select
                value={selectedOrgId}
                onChange={(e) => setSelectedOrgId(e.target.value)}
                disabled={!selectedType || organizations.length === 0}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 font-medium focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{!selectedType ? 'Select type first' : (organizations.length ? 'Select Organization...' : 'No organizations found')}</option>
                {organizations.map((o) => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
              <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Task List */}
      <div>
        {loading ? (
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
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
            <XCircle size={32} className="mx-auto mb-2" />
            <p>{error}</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <LayoutList size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">No tasks found</h3>
            <p className="text-slate-500 mt-2">Try selecting a different organization.</p>
          </div>
        ) : (
          <motion.div layout className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id || index}
                  initial={{ opacity: 0, y: 20 }}
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
                      {task.capacity ?? 0} spots
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {task.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                        {task.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                        <Calendar size={16} className="text-indigo-400" />
                        <span>{formatDate(task.startDate)} - {formatDate(task.endDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                        <Building2 size={16} className="text-indigo-400" />
                        <span>{task.ngo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 flex flex-col gap-3">
                    {/* Placeholder for future admin actions */}
                    {/* <button className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-colors text-sm">
                      <Eye size={18} /> View Details
                    </button> */}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
