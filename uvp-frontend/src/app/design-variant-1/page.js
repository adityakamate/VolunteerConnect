"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Building2, Heart, Globe, Sparkles } from 'lucide-react';

export default function DesignVariant1() {
    return (
        <div className="min-h-screen font-sans bg-slate-50 relative overflow-hidden text-slate-900">
            {/* Animated Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[100px] delay-1000 animate-pulse" />
            </div>

            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    <nav className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg shadow-indigo-500/5 px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-600 p-2 rounded-xl text-white">
                                <Sparkles size={20} fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-700">
                                Volunteer<span className="font-extrabold">Connect</span>
                            </span>
                        </div>
                        <div className="text-xs font-mono text-indigo-500 uppercase tracking-widest border border-indigo-100 bg-indigo-50 px-3 py-1 rounded-full">Variant 1: Modern Glass</div>
                    </nav>
                </div>
            </header>

            <main className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 mb-32">
                        <div className="flex-1 text-center lg:text-left space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold tracking-wide uppercase">
                                <span className="relative flex h-2.5 w-2.5 mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                                </span>
                                Make a Real Difference
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                                Connect. Contribute. <br className="hidden lg:block" />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                                    Change the World.
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                Join a vibrant community of changemakers. Find opportunities that match your passion, or mobilize volunteers for your cause.
                            </p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <button className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-3">
                                    Start Volunteering <ArrowRight size={20} />
                                </button>
                                <button className="px-8 py-4 rounded-2xl bg-white text-slate-700 border border-slate-200 font-bold text-lg shadow-sm hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all">
                                    Partner with Us
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-lg lg:max-w-xl relative">
                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[80px] -z-10" />
                            <div className="relative bg-white/60 backdrop-blur-md rounded-[3rem] border border-white/60 p-6 shadow-2xl shadow-indigo-900/10">
                                <div className="w-full h-80 bg-indigo-100 rounded-[2.5rem] flex items-center justify-center text-indigo-300">
                                    <Users size={64} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
