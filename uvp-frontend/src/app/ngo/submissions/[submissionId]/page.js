"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRequest, putRequest } from "@/lib/api";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Loader2, AlertTriangle, Image as ImageIcon, User, Calendar, Mail, Phone, Clock } from "lucide-react";

export default function NGOViewSubmissionPage() {
  const params = useParams();
  const router = useRouter();
  const { submissionId } = params || {};

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approving, setApproving] = useState(false);

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleString();
  };

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`/organization/submission/${submissionId}`);
      const data = res?.data;
      if (data) {
        setSubmission({
          submissionId: data.submissionId ?? submissionId,
          volunteerName: data.volunteerName ?? data.userName ?? "",
          volunteerEmail: data.volunteerEmail ?? data.email ?? "",
          volunteerPhone: data.volunteerPhone ?? "",
          taskTitle: data.taskTitle ?? data.taskName ?? "",
          submittedAt: data.submittedAt ?? data.submittedDate ?? data.createdAt,
          status: data.status,
          proofFileUrl: data.proofFileUrl ?? data.fileUrl ?? "",
        });
      } else {
        setSubmission(null);
        setError("Submission not found");
      }
    } catch (e) {
      console.error(e);
      setSubmission(null);
      setError("Failed to load submission");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (submissionId) fetchSubmission();
  }, [submissionId]);

  const handleApprove = async () => {
    try {
      const confirmIssue = window.confirm("Approve this submission?");
      if (!confirmIssue) return;
      setApproving(true);
      await putRequest(`/organization/update-submission/${submissionId}`, {});
      alert("Submission approved successfully");
      router.push("/ngo/submissions");
    } catch (e) {
      console.error(e);
      alert("Failed to approve submission. It might already be processed.");
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Nav & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
          <button
            onClick={() => router.back()}
            className="self-start flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold"
          >
            <ArrowLeft size={20} />
            <span>Back to List</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Submission Details</h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm font-semibold text-slate-600">
              <Clock size={16} className="text-indigo-500" />
              Submitted: {loading ? "..." : formatDate(submission?.submittedAt)}
            </div>
          </div>
        </motion.div>

        {loading && (
          <div className="h-96 flex flex-col items-center justify-center bg-white rounded-[2rem] shadow-sm border border-slate-100">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
            <p className="text-slate-500 font-medium">Retrieving submission proof...</p>
          </div>
        )}

        {error && (
          <div className="h-64 flex flex-col items-center justify-center bg-red-50 rounded-[2rem] border border-red-100 text-red-600">
            <AlertTriangle size={32} className="mb-2" />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {!loading && !error && submission && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Proof Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-4"
            >
              <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
                <div className="flex items-center gap-2 mb-4 px-4 pt-2">
                  <ImageIcon className="text-indigo-600" size={20} />
                  <h2 className="text-lg font-bold text-slate-900">Proof of Work</h2>
                </div>

                <div className="bg-slate-50 rounded-[2rem] border-2 border-slate-100 min-h-[400px] flex items-center justify-center overflow-hidden relative">
                  {submission.proofFileUrl ? (
                    <img
                      src={submission.proofFileUrl}
                      alt="Proof"
                      className="w-full h-auto object-contain max-h-[600px]"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <ImageIcon size={64} className="mx-auto mb-4 opacity-50" />
                      <p className="font-medium">No image attached</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Details & Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white space-y-8">
                {/* Task & Volunteer Info */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Task</h3>
                  <p className="text-xl font-bold text-slate-900 leading-tight mb-6">{submission.taskTitle}</p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Volunteer</p>
                        <p className="font-bold text-slate-700">{submission.volunteerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600">
                        <Mail size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                        <p className="font-bold text-slate-700 truncate">{submission.volunteerEmail}</p>
                      </div>
                    </div>

                    {submission.volunteerPhone && (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600">
                          <Phone size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase">Phone</p>
                          <p className="font-bold text-slate-700">{submission.volunteerPhone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Status & Actions */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Current Status</h3>
                  <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold ${submission.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                    }`}>
                    {submission.status === "APPROVED" ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <Clock size={20} />
                    )}
                    {submission.status}
                  </div>
                </div>

                {submission.status !== "APPROVED" && (
                  <button
                    onClick={handleApprove}
                    disabled={approving}
                    className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                  >
                    {approving ? (
                      <>
                        <Loader2 className="animate-spin" /> Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 /> Approve & Close
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
