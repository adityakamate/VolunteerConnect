"use client";

import { useEffect, useMemo, useState } from "react";
import { getRequest, putRequest } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Search, Download, Ban, CheckCircle, FileBadge, Calendar, User, Briefcase } from "lucide-react";

export default function AdminCertificatesPage() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await getRequest("/admin/certificates", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res?.data) ? res.data : [];
        setItems(
          data.map((c) => ({
            id: c.certificateId ?? c.id,
            user: c.userName ?? c.user ?? "",
            task: c.taskName ?? c.task ?? "",
            date: c.issueDate ?? c.date ?? "",
            userId: c.userId,
            taskId: c.taskId,
            blocked: c.blocked ?? false,
          }))
        );
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((i) =>
      [i.user, i.task, i.date].some((x) => String(x).toLowerCase().includes(q))
    );
  }, [items, query]);

  const toggleBlockStatus = async (item) => {
    if (!window.confirm(item.blocked ? "Unblock this certificate?" : "Block this certificate (revoke)?")) return;
    try {
      await putRequest(`/admin/update-block-status/${item.id}`);
      setItems((prev) =>
        prev.map((c) =>
          c.id === item.id ? { ...c, blocked: !c.blocked } : c
        )
      );
    } catch (e) {
      console.error(e);
      alert("Failed to update certificate status");
    }
  };

  const download = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const response = await getRequest(`/volunteer/certificates/download/${item.userId}/${item.taskId}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Certificate-${item.task}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error(e);
      alert("Failed to download certificate");
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
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Certificates Issued</h1>
          <p className="text-slate-500 text-lg mt-2">Manage and view certificates issued to volunteers.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={20} />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search certificates..."
            className="w-full md:w-80 pl-11 pr-5 py-3 rounded-2xl bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm transition-all outline-none font-medium text-slate-700 placeholder:text-slate-400"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border-b border-slate-50 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="w-1/4 h-5 bg-slate-100 rounded-md" />
                  <div className="w-1/3 h-4 bg-slate-50 rounded-md" />
                </div>
                <div className="w-20 h-8 bg-slate-100 rounded-lg" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-96 text-center p-8">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <Ban size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{error}</h3>
            <p className="text-slate-500">Please try refreshing the page.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center p-8">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No certificates found</h3>
            <p className="text-slate-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Certificate ID</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Recipient</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Task</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`group border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${c.blocked ? 'opacity-60 bg-red-50/10' : ''}`}
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <FileBadge size={16} />
                          </div>
                          <span className="font-bold text-slate-700 text-sm">#{c.id}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-slate-400" />
                          <span className="font-medium text-slate-900">{c.user}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-slate-400" />
                          <span className="font-medium text-slate-700">{c.task}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar size={14} className="text-slate-400" />
                          {c.date}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => download(c)}
                            className="p-2 rounded-xl text-green-600 hover:bg-green-50 transition-colors"
                            title="Download PDF"
                          >
                            <Download size={18} />
                          </button>
                          <button
                            onClick={() => toggleBlockStatus(c)}
                            className={`p-2 rounded-xl transition-colors ${c.blocked ? 'text-blue-600 hover:bg-blue-50' : 'text-red-600 hover:bg-red-50'}`}
                            title={c.blocked ? "Unblock" : "Revoke / Block"}
                          >
                            {c.blocked ? <CheckCircle size={18} /> : <Ban size={18} />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
