"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Users, ArrowRight, MapPin, Star, Clock } from "lucide-react";

export default function TaskDesignFeatured({ tasks, loading, activeTab, onTabChange, tabs }) {
    const featuredTask = tasks.length > 0 ? tasks[0] : null;
    const otherTasks = tasks.length > 0 ? tasks.slice(1) : [];

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                            Featured Opportunities
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg">
                            Handpicked tasks for you to make an impact.
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

                {loading ? (
                    <div className="space-y-8">
                        <div className="h-[400px] bg-white rounded-[2.5rem] animate-pulse"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="h-64 bg-white rounded-[2rem] animate-pulse"></div>
                            <div className="h-64 bg-white rounded-[2rem] animate-pulse"></div>
                            <div className="h-64 bg-white rounded-[2rem] animate-pulse"></div>
                        </div>
                    </div>
                ) : tasks.length > 0 ? (
                    <div className="space-y-12">
                        {/* Featured Task (First Item) */}
                        {featuredTask && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300/50 text-white group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>
                                {featuredTask.imageUrl && (
                                    <img
                                        src={featuredTask.imageUrl}
                                        alt={featuredTask.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                    />
                                )}

                                <div className="relative z-20 p-8 md:p-16 max-w-3xl space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold text-white">
                                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                        Featured Opportunity
                                    </div>

                                    <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                        {featuredTask.title}
                                    </h2>

                                    <div className="flex flex-wrap gap-6 text-slate-300 text-lg">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={20} className="text-violet-400" />
                                            <span>{new Date(featuredTask.startDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={20} className="text-fuchsia-400" />
                                            <span>{featuredTask.capacity} volunteers needed</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Link
                                            href={`/volunteer/tasks/${featuredTask.taskId}`}
                                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-violet-50 transition-colors"
                                        >
                                            View Details
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Other Tasks Grid */}
                        {otherTasks.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">More Opportunities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {otherTasks.map((task, index) => (
                                        <motion.div
                                            key={task.taskId}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ y: -5 }}
                                            className="bg-white rounded-[2rem] p-6 shadow-lg shadow-slate-100 border border-white hover:shadow-xl transition-all duration-300 flex flex-col"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl font-bold text-slate-300">
                                                    {task.title.charAt(0)}
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${task.status === 'OPEN' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
                                                    }`}>
                                                    {task.status}
                                                </span>
                                            </div>

                                            <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 flex-1">
                                                {task.title}
                                            </h4>

                                            <div className="space-y-2 mb-6 text-sm text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    <span>{new Date(task.startDate).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={14} />
                                                    <span className="truncate">{task.location || "Remote"}</span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/volunteer/tasks/${task.taskId}`}
                                                className="w-full py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-bold text-center hover:border-slate-900 hover:text-slate-900 transition-colors"
                                            >
                                                View
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                            <Clock size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No tasks found</h3>
                        <p className="text-slate-500 mt-2">Check back later for new opportunities.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
