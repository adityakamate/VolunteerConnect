"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Zap, Globe, Shield } from 'lucide-react';

export default function DesignVariant2() {
    return (
        <div className="min-h-screen font-sans bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-xl">V</div>
                        <span className="text-xl font-bold tracking-tight">VolunteerConnect</span>
                    </div>
                    <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest border border-indigo-900 bg-indigo-950/50 px-3 py-1 rounded-full">Variant 2: Bold Dark</div>
                </div>
            </header>

            <main className="relative z-10 pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center max-w-4xl mx-auto space-y-10">
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                            IMPACT.<br />
                            SCALED.
                        </h1>

                        <p className="text-xl sm:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                            The next-generation platform for social change. We bridge the gap between passion and action with verified organizations.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg tracking-wide transition-all uppercase skew-x-[-12deg] hover:skew-x-[-6deg]">
                                <span className="skew-x-[12deg] hover:skew-x-[6deg] inline-block">Join The Mission</span>
                            </button>
                            <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-slate-700 hover:border-white text-white font-bold text-lg tracking-wide transition-all uppercase skew-x-[-12deg] hover:skew-x-[-6deg]">
                                <span className="skew-x-[12deg] hover:skew-x-[6deg] inline-block">For NGOs</span>
                            </button>
                        </div>

                        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-indigo-500/50 transition-colors group">
                                <Zap className="w-10 h-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold mb-2">Instant Matching</h3>
                                <p className="text-slate-500">AI-driven algorithms to find the perfect volunteer opportunity for your skills.</p>
                            </div>
                            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-indigo-500/50 transition-colors group">
                                <Shield className="w-10 h-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold mb-2">Verified NGOs</h3>
                                <p className="text-slate-500">Every organization is vetted to ensure your time makes a real, safe impact.</p>
                            </div>
                            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-indigo-500/50 transition-colors group">
                                <Globe className="w-10 h-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                                <p className="text-slate-500">From local community drives to international relief efforts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
