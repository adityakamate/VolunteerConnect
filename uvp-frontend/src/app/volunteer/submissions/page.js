"use client";
import { useState, useEffect } from "react";
import { postRequest } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, History, FileText, CheckCircle, Clock, XCircle, FileUp, Sparkles, AlertCircle, Loader2 } from "lucide-react";

export default function SubmissionsPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTask, setSelectedTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await postRequest("/volunteer/applications", {}, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchSubmissions = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await postRequest("/volunteer/submissions", {}, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setSubmissions(response.data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "upload", label: "Upload Proof", icon: Upload },
    { id: "history", label: "Submission History", icon: History }
  ];

  useEffect(() => {
    fetchTasks();
    fetchSubmissions();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedTask) {
      alert("Please select a task and upload a file before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("applicationId", selectedTask);
      formData.append("file", selectedFile);

      await postRequest("/volunteer/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsSubmitting(false);
      alert("Submission successful");
      setSelectedFile(null);
      setSelectedTask("");
      fetchSubmissions();
      // Switch to history tab to show the new submission
      setActiveTab("history");
    } catch (error) {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section with Glass Effect */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-16 shadow-2xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-indigo-200 text-sm font-medium">
                <Sparkles size={14} className="text-indigo-300" />
                <span>Track your impact</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Proof Submissions
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                Upload evidence of your volunteer work and verify your contributions.
              </p>
            </div>

            {/* Glass Tabs */}
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden flex items-center gap-2 ${activeTab === tab.id
                      ? "text-slate-900 shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabSubmission"
                      className="absolute inset-0 bg-white"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <tab.icon size={16} />
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "upload" ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Submission Form */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white relative overflow-hidden">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <FileUp size={20} />
                    </div>
                    Submit New Proof
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Task Selection */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 ml-1">Select Completed Task</label>
                      <div className="relative">
                        <select
                          value={selectedTask}
                          onChange={(e) => setSelectedTask(e.target.value)}
                          className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl px-5 py-4 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer hover:bg-slate-100"
                        >
                          <option value="" disabled>-- Choose Task --</option>
                          {tasks.map((task) => (
                            <option key={task.applicationId} value={task.applicationId}>
                              {task.title}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 ml-1">Upload Proof (Image/PDF)</label>
                      <div className="relative group">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*,.pdf"
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className={`block w-full border-2 border-dashed rounded-[2rem] p-10 text-center cursor-pointer transition-all duration-300 ${selectedFile
                              ? "border-emerald-400 bg-emerald-50/30"
                              : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50"
                            }`}
                        >
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all ${selectedFile ? "bg-emerald-100 text-emerald-600" : "bg-indigo-50 text-indigo-500 group-hover:scale-110"
                            }`}>
                            {selectedFile ? <CheckCircle size={28} /> : <Upload size={28} />}
                          </div>
                          <p className="text-lg font-semibold text-slate-900 mb-1">
                            {selectedFile ? selectedFile.name : "Click to upload or drag & drop"}
                          </p>
                          <p className={`text-sm ${selectedFile ? "text-emerald-600" : "text-slate-500"}`}>
                            {selectedFile ? "File selected ready for upload" : "PNG, JPG, PDF up to 10MB"}
                          </p>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedFile || !selectedTask}
                      className="w-full bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Upload size={20} />
                          Submit Proof
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Guidelines */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-500/20">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles size={20} className="text-indigo-200" />
                    Submission Guidelines
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Upload clear photos or documents showing your volunteer work",
                      "Include timestamps or location details when possible",
                      "Ensure files are under 10MB and in supported formats",
                      "Review will be completed within 2-3 business days"
                    ].map((guide, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                        <CheckCircle size={16} className="text-emerald-300 mt-0.5 shrink-0" />
                        <p className="text-sm font-medium leading-relaxed opacity-90">{guide}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4 text-slate-400">
                  <Loader2 size={40} className="animate-spin text-indigo-500" />
                  <p>Loading your history...</p>
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <History size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">No submissions yet</h3>
                  <p className="text-slate-500 mt-2">Upload your first proof of completion to get started!</p>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="mt-8 px-8 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-colors"
                  >
                    Upload Proof
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {submissions.map((submission, index) => (
                    <motion.div
                      key={submission.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{submission.taskTitle || "Untitled Task"}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full">
                            <Clock size={14} />
                            {new Date(submission.submittedDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full">
                            <FileUp size={14} />
                            {submission.fileName}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${submission.status === "Approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : submission.status === "Under Review"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                          {submission.status === "Approved" ? <CheckCircle size={14} /> :
                            submission.status === "Under Review" ? <Clock size={14} /> :
                              <XCircle size={14} />}
                          {submission.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
