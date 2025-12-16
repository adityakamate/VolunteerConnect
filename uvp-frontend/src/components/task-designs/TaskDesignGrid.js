"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Users, Clock, ArrowRight, MapPin } from "lucide-react";

export default function TaskDesignGrid({ tasks, loading, activeTab, onTabChange, tabs }) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                            Find Opportunities
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg">
                            Discover ways to give back to your community.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 inline-flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        // Loading Skeletons
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/60 border border-white h-[400px] animate-pulse">
                                <div className="h-48 bg-slate-100 rounded-3xl mb-6"></div>
                                <div className="h-6 bg-slate-100 rounded-full w-3/4 mb-4"></div>
                                <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>
                            </div>
                        ))
                    ) : tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <motion.div
                                key={task.taskId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                                className="group bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-white overflow-hidden hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-300 flex flex-col"
                            >
                                {/* Image / Cover */}
                                <div className="h-52 relative overflow-hidden bg-slate-100">
                                    {task.imageUrl ? (
                                        <img
                                            src={task.imageUrl}
                                            alt={task.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                                            <span className="text-white/30 font-bold text-6xl select-none">
                                                {task.title.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-white/50 uppercase tracking-wider">
                                        {task.status}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-violet-600 transition-colors">
                                        {task.title}
                                    </h3>

                                    <div className="space-y-3 mb-8 flex-1">
                                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                                            <Calendar size={16} className="text-violet-500" />
                                            <span>{new Date(task.startDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                                            <Users size={16} className="text-fuchsia-500" />
                                            <span>{task.capacity} volunteers needed</span>
                                        </div>
                                        {task.location && (
                                            <div className="flex items-center gap-3 text-slate-500 text-sm">
                                                <MapPin size={16} className="text-blue-500" />
                                                <span className="truncate">{task.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        href={`/volunteer/tasks/${task.taskId}`}
                                        className="w-full py-4 rounded-xl bg-slate-50 text-slate-900 font-bold flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300"
                                    >
                                        View Details
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                                <Clock size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">No tasks found</h3>
                            <p className="text-slate-500 mt-2">Check back later for new opportunities.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
