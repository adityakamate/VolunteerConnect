"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Heart, HandIcon } from 'lucide-react';

export default function DesignVariant3() {
    return (
        <div className="min-h-screen font-serif bg-[#FDFBF7] text-slate-800">
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-[#FDFBF7]/90 backdrop-blur-sm border-b border-slate-100">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="text-2xl font-serif font-medium tracking-tight text-slate-900">
                        volunteer.
                    </div>
                    <div className="text-xs font-sans text-slate-500 uppercase tracking-widest border border-slate-200 px-3 py-1 rounded-sm">Variant 3: Clean Minimal</div>
                    <div className="flex gap-8 text-sm font-sans font-medium text-slate-600">
                        <Link href="#" className="hover:text-slate-900">Manifesto</Link>
                        <Link href="#" className="hover:text-slate-900">Opportunities</Link>
                        <Link href="#" className="hover:text-slate-900">Stories</Link>
                    </div>
                </div>
            </header>

            <main className="pt-40 pb-20 px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                        <div className="space-y-10">
                            <h1 className="text-6xl lg:text-7xl font-light leading-[1.1] text-slate-900">
                                Small acts,<br />
                                <span className="italic font-normal text-stone-600">ripple effects.</span>
                            </h1>
                            <p className="text-xl text-slate-600 font-sans font-light leading-relaxed max-w-md">
                                We believe in the power of community. Connect with organizations that need your helping hand.
                            </p>
                            <div className="flex gap-6 font-sans">
                                <button className="text-slate-900 border-b border-slate-900 pb-1 hover:border-transparent transition-colors text-lg flex items-center gap-2">
                                    Start Helping <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="relative aspect-[4/5] bg-stone-100 rounded-sm overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                                <Leaf size={48} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-slate-200">
                        <div className="space-y-4">
                            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-4">
                                <Heart size={20} />
                            </div>
                            <h3 className="font-serif text-2xl">Compassion First</h3>
                            <p className="font-sans text-slate-600 leading-relaxed font-light">
                                Curated opportunities that prioritize human connection and meaningful assistance.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <Leaf size={20} />
                            </div>
                            <h3 className="font-serif text-2xl">Sustainable Growth</h3>
                            <p className="font-sans text-slate-600 leading-relaxed font-light">
                                Supporting projects that build long-term resilience in communities.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                <HandIcon size={20} />
                            </div>
                            <h3 className="font-serif text-2xl">Direct Action</h3>
                            <p className="font-sans text-slate-600 leading-relaxed font-light">
                                Removing barriers so you can start contributing immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
