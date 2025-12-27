"use client";

import { useEffect, useMemo, useState } from "react";
import { getRequest } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserX, UserCheck, Trash2, User, Mail, Phone, MapPin, Shield, RefreshCw } from "lucide-react";

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await getRequest("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(Array.isArray(res?.data) ? res.data : []);
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.name, u.email, u.phone, u.location].some((x) => String(x || "").toLowerCase().includes(q))
    );
  }, [users, query]);

  const removeUser = (id) => {
    if (!window.confirm("Delete this user? This action cannot be undone.")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleBlock = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === "ACTIVE" ? "BLOCKED" : "ACTIVE" } : u)));
    alert("User status updated (Simulation)");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 text-lg mt-2">Manage user accounts, permissions, and security.</p>
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
            placeholder="Search users..."
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
              <UserX size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{error}</h3>
            <p className="text-slate-500">Please try refreshing the page.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center p-8">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No users found</h3>
            <p className="text-slate-500">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((u, i) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 flex items-center justify-center font-bold text-lg shadow-sm">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{u.name}</p>
                            {/* <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mt-1 ${u.status === 'BLOCKED' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'BLOCKED' ? 'bg-red-500' : 'bg-green-500'}`} />
                              {u.status || 'ACTIVE'}
                            </span> */}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                            <Mail size={14} className="text-slate-400" />
                            {u.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                            <Phone size={14} className="text-slate-400" />
                            {u.phone || "Not provided"}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                          <MapPin size={16} className="text-slate-400" />
                          {u.location || "Unknown"}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleBlock(u.id)}
                            className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Toggle Block Status"
                          >
                            <Shield size={18} />
                          </button>
                          <button
                            onClick={() => alert("Reset password triggered")}
                            className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Reset Password"
                          >
                            <RefreshCw size={18} />
                          </button>
                          <button
                            onClick={() => removeUser(u.id)}
                            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
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
