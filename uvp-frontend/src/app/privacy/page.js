"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 lg:py-24">

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link href="/auth/register" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium transition-colors">
                        <ArrowLeft size={20} />
                        <span>Back to Register</span>
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-900/20 mb-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full -mt-10 -mr-10 blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-600/20 rounded-full -mb-10 -ml-10 blur-2xl delay-700" />

                    <div className="relative z-10 text-white">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                <Shield size={32} />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/10 text-indigo-200 text-sm font-bold uppercase tracking-wider">
                                Effective: Dec 2025
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            We are committed to protecting your personal information and your right to privacy.
                        </p>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-12"
                >
                    <section className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 mt-1">
                                <Eye size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">1. Information We Collect</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our services, or otherwise when you contact us. This includes:
                                </p>
                                <ul className="mt-3 space-y-2 pl-4 text-slate-600">
                                    <li className="list-disc leading-relaxed">Name, Email, Phone Number, and Contact Data.</li>
                                    <li className="list-disc leading-relaxed">Credentials (passwords and security info).</li>
                                    <li className="list-disc leading-relaxed">Profile Data (skills, interests, location).</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 mt-1">
                                <Database size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">2. How We Use Your Information</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 mt-1">
                                <Lock size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">3. Data Security</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 mt-1">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">4. Contact Us</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    If you have questions or comments about this policy, you may email us at <a href="mailto:privacy@volunteersconnect.org" className="text-indigo-600 font-bold hover:underline">privacy@volunteersconnect.org</a>.
                                </p>
                            </div>
                        </div>
                    </section>

                </motion.div>
            </div>
        </div>
    );
}
