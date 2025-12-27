"use client";
import React, { useEffect, useState } from "react";
import { getRequest } from "@/lib/api";
import { motion } from "framer-motion";
import { Download, Medal, Sparkles, Loader2, Calendar } from "lucide-react";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await getRequest("/volunteer/certification", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res && res.data) {
          setCertificates(res.data);
        } else {
          console.error("Failed to fetch certificates");
        }
      } catch (err) {
        console.error("Error fetching certificates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const downloadPDF = async (cert) => {
    try {
      const response = await getRequest(
        `/volunteer/certificates/download/${cert.userId}/${cert.taskId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Certificate-${cert.taskName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading PDF:", err.response?.data || err.message);
    }
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section with Glass Effect */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-16 shadow-2xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-fuchsia-200 text-sm font-medium">
                <Sparkles size={14} className="text-fuchsia-300" />
                <span>Your Achievements</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Certificates
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                View and download the certificates you've earned through your volunteering journey.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-white font-medium">
              <Medal size={20} className="text-yellow-400" />
              <span>{certificates.length} Earned</span>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] p-6 h-96 shadow-sm border border-white animate-pulse flex flex-col gap-4">
                  <div className="w-full h-48 bg-slate-100 rounded-[2rem]"></div>
                  <div className="w-2/3 h-6 bg-slate-100 rounded-full mt-4"></div>
                  <div className="w-1/2 h-4 bg-slate-100 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : certificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Medal size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">No certificates yet</h3>
              <p className="text-slate-500 mt-2">Complete tasks and submit proofs to earn certificates.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.certificateId}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-fuchsia-500/20 border border-white transition-all duration-300 flex flex-col"
                >
                  <div className="relative w-full aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden mb-6 flex items-center justify-center group-hover:border-fuchsia-100 transition-colors">
                    {cert.qrCode ? (
                      <img
                        src={`data:image/png;base64,${cert.qrCode}`}
                        alt="Certificate QR"
                        className="w-48 h-48 object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <Medal size={64} className="text-slate-200" />
                    )}

                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-yellow-400">
                        <Medal size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-fuchsia-600 transition-colors line-clamp-2">
                      {cert.taskName}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Calendar size={14} />
                      Issued {formatDate(cert.issueDate)}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <button
                      onClick={() => downloadPDF(cert)}
                      className="w-full relative group/btn flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 px-6 rounded-xl font-bold overflow-hidden hover:shadow-lg hover:shadow-fuchsia-500/25 transition-all active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <Download size={18} />
                        Download PDF
                      </span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
