"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { postRequest } from "@/lib/api";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaBuilding, FaMapMarkerAlt, FaPhone, FaEdit, FaFileAlt, FaGlobe } from "react-icons/fa";
import { LayoutDashboard, Users, FileCheck, ExternalLink, Mail, Phone, MapPin, Building2, Pencil, Globe } from "lucide-react";

export default function NGOProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    type: "",
    address: "",
    contact: "",
    description: "",
    image: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await postRequest("/organization/get", {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(res.data);
      } catch (e) {
        console.error("Failed to fetch profile:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen w-full font-sans text-slate-900 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section with Glass Effect */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-16 shadow-2xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-indigo-200 text-sm font-medium">
                <LayoutDashboard size={14} className="text-indigo-300" />
                <span>Organization Profile</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {loading ? "Welcome..." : `Welcome, ${profile.name}`}
              </h1>
              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                Manage your organization's profile, tasks, and volunteer applications from here.
              </p>
            </div>

            <Link
              href="/ngo/profile/edit"
              className="group flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95"
            >
              <Pencil size={18} className="text-indigo-600 group-hover:scale-110 transition-transform" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-white"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="relative group shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center overflow-hidden shadow-sm">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <Building2 size={64} className="text-indigo-300" />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-slate-100">
                  <div className="bg-green-100 p-1.5 rounded-lg">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">About Us</h2>
                    {!loading && profile.type && (
                      <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                        {profile.type.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {loading ? "Loading..." : profile.description || "No description provided yet."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm text-indigo-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-sm font-semibold text-slate-700">{loading ? "..." : profile.address || "Not set"}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm text-indigo-600">
                      <Globe size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Type</p>
                      <p className="text-sm font-semibold text-slate-700">{loading ? "..." : profile.type || "Not set"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact & Quick Actions Card */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-10 -mr-10 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -mb-10 -ml-10 blur-xl" />

              <h3 className="text-xl font-bold mb-6 relative z-10">Contact Info</h3>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-indigo-200 font-medium mb-0.5">Email Address</p>
                    <p className="text-sm font-bold truncate">{loading ? "..." : profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 font-medium mb-0.5">Phone Number</p>
                    <p className="text-sm font-bold">{loading ? "..." : profile.contact || "Not set"}</p>
                  </div>
                </div>
              </div>
            </motion.div>


          </div>
        </div>
      </div>
    </div>
  );
}
