"use client";

import { motion } from "framer-motion";
import { BarChart3, Lock } from "lucide-react";

export default function AdminReportsPage() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white"
            >
                <div className="relative">
                    <div className="w-32 h-32 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                        <BarChart3 size={64} />
                    </div>
                    <div className="absolute top-0 right-0 bg-white p-2 rounded-full shadow-md border border-slate-100">
                        <Lock size={20} className="text-slate-400" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Analytics & Reports</h1>
                <p className="text-slate-500 text-lg max-w-md leading-relaxed">
                    Advanced reporting features are currently under development. Check back soon for detailed insights on volunteer engagement and task performance.
                </p>

                <div className="mt-8">
                    <button
                        disabled
                        className="px-8 py-3 rounded-2xl bg-slate-100 text-slate-400 font-bold cursor-not-allowed border border-slate-200"
                    >
                        Coming Soon
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
