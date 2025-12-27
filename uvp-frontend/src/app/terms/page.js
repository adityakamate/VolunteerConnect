"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, FileText, Gavel, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
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
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-white mb-8"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                            <Gavel size={32} />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold uppercase tracking-wider">
                            Last Updated: Dec 2025
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
                        Please read these terms carefully before using our volunteering platform. By using our service, you agree to be bound by these terms.
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-12"
                >
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">1</span>
                            Acceptance of Terms
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">2</span>
                            User Responsibilities
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            As a user of this platform, whether as a volunteer or an organization, you agree to:
                        </p>
                        <ul className="space-y-3 pl-12 text-slate-600">
                            <li className="list-disc leading-relaxed pl-2">Provide accurate and up-to-date information during registration.</li>
                            <li className="list-disc leading-relaxed pl-2">Maintain the confidentiality of your account credentials.</li>
                            <li className="list-disc leading-relaxed pl-2">Respect the rights and dignity of other users and organizations.</li>
                            <li className="list-disc leading-relaxed pl-2">Use the platform only for lawful and intended volunteering purposes.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">3</span>
                            Privacy & Data Usage
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Your privacy is important to us. Our data collection and usage practices are described in our <Link href="/privacy" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>. By using our service, you consent to the collection and use of information as detailed therein.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">4</span>
                            Limitation of Liability
                        </h2>
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex items-start gap-4">
                            <AlertCircle size={24} className="text-amber-600 shrink-0 mt-1" />
                            <p className="text-amber-800 text-sm leading-relaxed font-medium">
                                This platform is provided "as is" without any warranties. We shall not be liable for any damages arising out of or in connection with the use of this website. We do not guarantee the accuracy of content provided by third-party organizations.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-slate-100">
                        <p className="text-slate-500 text-center text-sm">
                            If you have any questions about these Terms, please contact us at <a href="mailto:legal@volunteersconnect.org" className="text-indigo-600 font-bold hover:underline">legal@volunteersconnect.org</a>.
                        </p>
                    </section>

                </motion.div>
            </div>
        </div>
    );
}
