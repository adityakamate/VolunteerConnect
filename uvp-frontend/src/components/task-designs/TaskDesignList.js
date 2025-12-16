"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Users, ArrowRight, MapPin, Clock, ChevronRight } from "lucide-react";

export default function TaskDesignList({ tasks, loading, activeTab, onTabChange, tabs }) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-slate-900">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
                            Volunteer Tasks
                        </h1>
                        <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
                            Browse available opportunities and find the perfect way to contribute to your community today.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 inline-flex gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                                        ? "bg-slate-900 text-white shadow-lg transform scale-105"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List Content */}
                <div className="space-y-6">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-48 animate-pulse flex items-center gap-8">
                                <div className="w-48 h-36 bg-slate-100 rounded-2xl shrink-0"></div>
                                <div className="flex-1 space-y-4">
                                    <div className="h-6 bg-slate-100 rounded-full w-1/3"></div>
                                    <div className="h-4 bg-slate-100 rounded-full w-1/4"></div>
                                    <div className="h-10 bg-slate-100 rounded-xl w-32 mt-4"></div>
                                </div>
                            </div>
                        ))
                    ) : tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <motion.div
                                key={task.taskId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                className="group relative bg-white rounded-[2.5rem] p-4 md:p-5 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-violet-200/40 border border-white transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-8 overflow-hidden"
                            >
                                {/* Hover Gradient Background Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-50/0 via-violet-50/0 to-violet-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Image / Icon */}
                                <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-inner">
                                    {task.imageUrl ? (
                                        <img
                                            src={task.imageUrl}
                                            alt={task.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-5xl shadow-inner">
                                            {task.title.charAt(0)}
                                        </div>
                                    )}
                                    {/* Status Badge Overlay */}
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${task.status === 'OPEN'
                                                ? 'bg-emerald-500/90 text-white'
                                                : 'bg-slate-500/90 text-white'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 py-2 md:py-4 min-w-0 flex flex-col justify-between relative z-10">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            <Clock size={12} />
                                            <span>Posted {Math.floor((new Date() - new Date(task.createdAt)) / (1000 * 60 * 60))}h ago</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors leading-tight">
                                            {task.title}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-slate-600 font-medium">
                                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                <Calendar size={16} className="text-violet-500" />
                                                <span>{new Date(task.startDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                <Users size={16} className="text-fuchsia-500" />
                                                <span>{task.capacity} spots</span>
                                            </div>
                                            {task.location && (
                                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                    <MapPin size={16} className="text-blue-500" />
                                                    <span className="truncate max-w-[200px]">{task.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Area */}
                                    <div className="mt-6 flex items-center justify-between">
                                        <Link
                                            href={`/volunteer/tasks/${task.taskId}`}
                                            className="inline-flex items-center gap-2 text-slate-900 font-bold group/link"
                                        >
                                            <span className="group-hover/link:text-violet-600 transition-colors">View Details</span>
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover/link:bg-violet-600 group-hover/link:text-white transition-all duration-300">
                                                <ChevronRight size={16} />
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                {/* Desktop Arrow Indicator (Right Side) */}
                                <div className="hidden md:flex items-center pr-6 text-slate-300 group-hover:text-violet-400 transition-colors group-hover:translate-x-1 duration-300">
                                    <ArrowRight size={32} strokeWidth={1.5} />
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <Clock size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">No tasks found</h3>
                            <p className="text-slate-500 mt-2">Try changing the filter or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
