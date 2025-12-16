"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Settings,
    LogOut,
    MapPin,
    Mail,
    Award,
    CheckCircle,
    Edit2,
    Shield
} from "lucide-react";

export default function ProfileMinimalist({ user, onLogout, onSave }) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar - Profile Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200"></div>
                            <div className="px-8 pb-8">
                                <div className="relative -mt-16 mb-6">
                                    <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg mx-auto lg:mx-0">
                                        <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center text-4xl font-bold text-gray-700">
                                            {user.name ? user.name.charAt(0).toUpperCase() : <User />}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center lg:text-left space-y-2">
                                    <h1 className="text-2xl font-bold text-gray-900">{user.name || "Loading..."}</h1>
                                    <div className="flex items-center justify-center lg:justify-start text-gray-500 gap-2">
                                        <Mail size={16} />
                                        <span className="text-sm">{user.email || "No email provided"}</span>
                                    </div>
                                    <div className="flex items-center justify-center lg:justify-start text-gray-500 gap-2">
                                        <MapPin size={16} />
                                        <span className="text-sm">{user.location || "Location not set"}</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="p-3 bg-gray-50 rounded-2xl">
                                            <div className="text-2xl font-bold text-gray-800">{user.completedTasks || 0}</div>
                                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Tasks</div>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-2xl">
                                            <div className="text-2xl font-bold text-gray-800">{user.certificatesEarned || 0}</div>
                                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Certificates</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab("overview")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "overview"
                                        ? "bg-gray-900 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <User size={18} />
                                    <span className="font-medium">Overview</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("settings")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === "settings"
                                        ? "bg-gray-900 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <Settings size={18} />
                                    <span className="font-medium">Settings</span>
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
                                >
                                    <LogOut size={18} />
                                    <span className="font-medium">Sign Out</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="lg:col-span-8">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[600px]"
                        >
                            {activeTab === "overview" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <User className="text-gray-400" size={24} />
                                            About Me
                                        </h2>
                                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            {user.bio || "No bio added yet."}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === "settings" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            <Edit2 className="text-gray-400" size={24} />
                                            Edit Profile
                                        </h2>
                                    </div>

                                    <form onSubmit={onSave} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue={user.name}
                                                    name="name"
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    defaultValue={user.email}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    defaultValue={user.phone}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Location</label>
                                                <input
                                                    type="text"
                                                    name="location"
                                                    defaultValue={user.location}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 transition-all outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Bio</label>
                                            <textarea
                                                defaultValue={user.bio}
                                                rows={4}
                                                name="bio"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-0 transition-all outline-none resize-none"
                                            />
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                type="submit"
                                                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
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
