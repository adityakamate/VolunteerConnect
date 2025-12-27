"use client";

import { useEffect, useState } from "react";
import { postRequest, putRequest } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Users, AlertCircle, Search, Filter, Phone, Mail, Calendar, CheckCircle, XCircle, Clock, X } from "lucide-react";

export default function NGOVolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [actionLoadingId, setActionLoadingId] = useState(null);

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

  const fetchVolunteers = async (tab) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const endpoint = tab === "pending" ? "/organization/pending/application" : "/organization/applications/get";
      const res = await postRequest(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });
      setVolunteers(res.data || []);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Failed to load volunteers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers(activeTab);
  }, [activeTab]);

  const handleUpdateStatus = async (applicationId, status) => {
    if (!applicationId || !status) return;
    if (status === "REJECTED" && !confirm("Reject this application?")) return;
    if (status === "APPROVED" && !confirm("Approve this application?")) return;

    try {
      setActionLoadingId(applicationId);
      await putRequest(`/organization/set/${applicationId}/${status}`);
      await fetchVolunteers(activeTab);
      if (selectedVolunteer) closeModal(); // Close modal if open
    } catch (e) {
      console.error(e);
      alert(`Failed to update status to ${status}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const openModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVolunteer(null);
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
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Volunteers</h1>
            <p className="text-slate-500 text-lg mt-2">Manage applications and view your volunteer workforce.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200"
          >
            {[
              { id: "all", label: "All Lists", icon: <Users size={18} /> },
              { id: "pending", label: "Pending Requests", icon: <Clock size={18} /> },
            ].map((tab) => (
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
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-red-200 text-red-500">
              <AlertCircle size={32} className="mx-auto mb-2" />
              <p>{error}</p>
            </div>
          ) : volunteers.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-200 shadow-sm">
              <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">No {activeTab === "pending" ? "pending requests" : "volunteers"} found</h3>
              <p className="text-slate-500 mt-2">
                {activeTab === "pending" ? "All caught up! No new applications to review." : "Volunteers who apply to your tasks will show up here."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {volunteers.map((v, idx) => (
                  <motion.div
                    key={v.applicationId ?? idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-[1.5rem] p-5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 border border-slate-100 hover:border-indigo-100 transition-all duration-300 cursor-pointer"
                    onClick={() => openModal(v)}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="flex-1 w-full text-center md:text-left space-y-2 md:space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {v.name}
                        </h3>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
                          <span>Applied for: <strong className="text-slate-700">{v.taskName || v.taskTitle}</strong></span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-indigo-400" />
                            {formatDate(v.appliedAt || v.appliedDate)}
                          </span>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                        {activeTab === "pending" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateStatus(v.applicationId, "APPROVED")}
                              disabled={actionLoadingId === v.applicationId}
                              className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                              title="Approve"
                            >
                              <CheckCircle size={20} />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(v.applicationId, "REJECTED")}
                              disabled={actionLoadingId === v.applicationId}
                              className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                              title="Reject"
                            >
                              <XCircle size={20} />
                            </button>
                          </div>
                        ) : (
                          <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${v.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : v.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                            }`}>
                            {v.status}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Volunteer Details Modal */}
      <AnimatePresence>
        {showModal && selectedVolunteer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 md:p-10 space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-1">{selectedVolunteer.name}</h2>
                    <p className="text-slate-500 font-medium">{selectedVolunteer.email}</p>
                  </div>
                  <button onClick={closeModal} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                    <X size={20} className="text-slate-600" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applied For</p>
                      <p className="font-bold text-slate-800">{selectedVolunteer.taskTitle || selectedVolunteer.taskName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                      <p className="font-bold text-slate-800">{selectedVolunteer.phone || "-"}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applied Date</p>
                      <p className="font-bold text-slate-800">{formatDate(selectedVolunteer.appliedDate || selectedVolunteer.appliedAt)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience</p>
                      <p className="font-bold text-slate-800">{selectedVolunteer.experience || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                {selectedVolunteer.skills && selectedVolunteer.skills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedVolunteer.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Motivation</p>
                  <div className="p-4 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed text-sm font-medium">
                    {selectedVolunteer.motivation || "No motivation provided."}
                  </div>
                </div>

                {/* Modal Actions */}
                {activeTab === "pending" && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleUpdateStatus(selectedVolunteer.applicationId, "APPROVED")}
                      disabled={actionLoadingId === selectedVolunteer.applicationId}
                      className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-500/20 active:scale-95 disabled:opacity-50"
                    >
                      <CheckCircle size={18} /> Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedVolunteer.applicationId, "REJECTED")}
                      disabled={actionLoadingId === selectedVolunteer.applicationId}
                      className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors active:scale-95 disabled:opacity-50"
                    >
                      <XCircle size={18} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
