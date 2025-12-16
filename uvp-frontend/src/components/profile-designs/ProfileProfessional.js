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
    Briefcase,
    FileText,
    Activity,
    BarChart2
} from "lucide-react";

export default function ProfileProfessional({ user, onLogout, onSave }) {
    const [activeSection, setActiveSection] = useState("dashboard");

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans text-slate-800">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <div className="text-xl font-bold tracking-tight">Volunteer<span className="text-blue-500">Portal</span></div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <button
                        onClick={() => setActiveSection("dashboard")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeSection === "dashboard" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                    >
                        <Activity size={18} /> Dashboard
                    </button>
                    <button
                        onClick={() => setActiveSection("profile")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeSection === "profile" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                    >
                        <User size={18} /> My Profile
                    </button>
                    <button
                        onClick={() => setActiveSection("settings")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeSection === "settings" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                    >
                        <Settings size={18} /> Settings
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8">
                    <h1 className="text-lg font-semibold text-slate-800 capitalize">{activeSection}</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-medium text-slate-900">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="max-w-5xl mx-auto"
                    >
                        {activeSection === "dashboard" && (
                            <div className="space-y-6">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-medium text-slate-500">Total Tasks</h3>
                                            <Briefcase size={20} className="text-blue-500" />
                                        </div>
                                        <div className="text-3xl font-bold text-slate-900">{user.completedTasks || 0}</div>
                                        <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                            ↑ 12% from last month
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-medium text-slate-500">Certificates</h3>
                                            <FileText size={20} className="text-purple-500" />
                                        </div>
                                        <div className="text-3xl font-bold text-slate-900">{user.certificatesEarned || 0}</div>
                                        <div className="text-xs text-slate-400 mt-2">Verified credentials</div>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-medium text-slate-500">Impact Score</h3>
                                            <BarChart2 size={20} className="text-green-500" />
                                        </div>
                                        <div className="text-3xl font-bold text-slate-900">98.5</div>
                                        <div className="text-xs text-slate-400 mt-2">Top 5% of volunteers</div>
                                    </div>
                                </div>

                                {/* Recent Activity Table Mockup */}
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 border-b border-slate-200">
                                        <h3 className="font-semibold text-slate-800">Recent Activity</h3>
                                    </div>
                                    <div className="p-6 text-center text-slate-500 py-12">
                                        No recent activity to display.
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === "profile" && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="w-32 h-32 rounded-lg bg-slate-100 flex items-center justify-center text-4xl text-slate-400 flex-shrink-0">
                                        {user.name ? user.name.charAt(0).toUpperCase() : <User />}
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                                            <p className="text-slate-500">{user.location}</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                            <div className="flex items-center gap-3 text-slate-600">
                                                <Mail size={18} /> {user.email}
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600">
                                                <Phone size={18} /> {user.phone || "N/A"}
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <h3 className="font-semibold text-slate-900 mb-2">Bio</h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {user.bio || "No biography provided."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === "settings" && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                                <div className="px-6 py-4 border-b border-slate-200">
                                    <h3 className="font-semibold text-slate-800">Account Settings</h3>
                                </div>
                                <div className="p-6">
                                    <form onSubmit={onSave} className="max-w-2xl space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue={user.name}
                                                    name="name"
                                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Email</label>
                                                <input
                                                    type="email"
                                                    defaultValue={user.email}
                                                    name="email"
                                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Phone</label>
                                                <input
                                                    type="text"
                                                    defaultValue={user.phone}
                                                    name="phone"
                                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Location</label>
                                                <input
                                                    type="text"
                                                    defaultValue={user.location}
                                                    name="location"
                                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Bio</label>
                                            <textarea
                                                defaultValue={user.bio}
                                                name="bio"
                                                rows={4}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
