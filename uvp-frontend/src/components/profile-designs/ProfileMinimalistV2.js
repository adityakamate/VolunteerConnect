"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Settings,
    LogOut,
    MapPin,
    Mail,
    Phone,
    Edit2,
    Camera,
    Quote
} from "lucide-react";

export default function ProfileMinimalistV2({ user, onLogout, onSave }) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar - Profile Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-white overflow-hidden relative">
                            <div className="h-32 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                            <div className="px-8 pb-8">
                                <div className="relative -mt-16 mb-6 flex justify-center">
                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-full bg-white p-1.5 shadow-2xl">
                                            <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-4xl font-bold text-slate-700 overflow-hidden">
                                                {user.name ? user.name.charAt(0).toUpperCase() : <User size={40} />}
                                            </div>
                                        </div>
                                        <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-lg border border-slate-100 text-slate-600 hover:text-violet-600 transition-colors">
                                            <Camera size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="text-center space-y-2 mb-8">
                                    <h1 className="text-2xl font-bold text-slate-900">{user.name || "Loading..."}</h1>
                                    <p className="text-slate-500 font-medium text-sm bg-slate-100 inline-block px-3 py-1 rounded-full">Volunteer</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-600 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                                            <Mail size={18} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Email</p>
                                            <p className="text-sm font-medium truncate">{user.email || "Not provided"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-slate-600 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 shrink-0">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Phone</p>
                                            <p className="text-sm font-medium">{user.phone || "Not provided"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-slate-600 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Location</p>
                                            <p className="text-sm font-medium">{user.location || "Not set"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Navigation Tabs (Horizontal) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-1.5 flex gap-1">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${activeTab === "overview"
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                    }`}
                            >
                                <User size={18} />
                                <span>Overview</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${activeTab === "settings"
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                    }`}
                            >
                                <Settings size={18} />
                                <span>Settings</span>
                            </button>
                            <button
                                onClick={onLogout}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 font-medium"
                            >
                                <LogOut size={18} />
                                <span>Sign Out</span>
                            </button>
                        </div>

                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-white p-8 md:p-10 min-h-[500px]"
                        >
                            {activeTab === "overview" && (
                                <div className="h-full flex flex-col">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back, {user.name ? user.name.split(' ')[0] : 'Volunteer'}! 👋</h2>
                                        <p className="text-slate-500">Here's a look at your profile information.</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl border border-slate-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Quote size={80} className="text-violet-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="w-1 h-6 bg-violet-500 rounded-full"></span>
                                            About Me
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-lg relative z-10">
                                            {user.bio || "You haven't written a bio yet. Go to settings to add one and tell the world about your volunteering journey!"}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === "settings" && (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                                                <Edit2 size={20} />
                                            </div>
                                            Edit Profile Details
                                        </h2>
                                    </div>

                                    <form onSubmit={onSave} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue={user.name}
                                                    name="name"
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    defaultValue={user.email}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    defaultValue={user.phone}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Location</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    defaultValue={user.location}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700 ml-1">Bio</label>
                                            <textarea
                                                defaultValue={user.bio}
                                                rows={4}
                                                name="bio"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none resize-none"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-600/20 transition-all duration-300"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
