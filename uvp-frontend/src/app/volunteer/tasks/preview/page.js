"use client";
import { useState, useEffect } from "react";
import { postRequest } from "@/lib/api";
import { Palette, LayoutGrid, List, Star } from "lucide-react";
import TaskDesignGrid from "@/components/task-designs/TaskDesignGrid";
import TaskDesignList from "@/components/task-designs/TaskDesignList";
import TaskDesignFeatured from "@/components/task-designs/TaskDesignFeatured";

export default function TaskPreviewPage() {
    const [selectedDesign, setSelectedDesign] = useState("grid");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("open");

    const fetchTasks = async (status = "OPEN") => {
        try {
            setLoading(true);
            const response = await postRequest(
                `/volunteer/tasks/${status}`,
                {}
            );
            setTasks(response.data);
        } catch (err) {
            console.error("Failed to load tasks", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks("OPEN");
    }, []);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        const status = tabId === "open" ? "OPEN" : "CLOSED"; // Simplified for preview
        fetchTasks(status);
    };

    const tabs = [
        { id: "open", label: "Open Tasks" },
        { id: "closed", label: "Closed Tasks" }
    ];

    const renderDesign = () => {
        const props = { tasks, loading, activeTab, onTabChange: handleTabChange, tabs };
        switch (selectedDesign) {
            case "grid": return <TaskDesignGrid {...props} />;
            case "list": return <TaskDesignList {...props} />;
            case "featured": return <TaskDesignFeatured {...props} />;
            default: return <TaskDesignGrid {...props} />;
        }
    };

    return (
        <div className="relative">
            {/* Floating Design Switcher */}
            <div className="fixed bottom-6 right-6 z-50 bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col gap-3 max-w-xs animate-in slide-in-from-bottom-10 fade-in duration-500">
                <div className="flex items-center gap-2 font-bold text-gray-800 pb-2 border-b border-gray-100">
                    <Palette size={20} className="text-indigo-600" />
                    <span>Layout Switcher</span>
                </div>
                <div className="space-y-2">
                    <button
                        onClick={() => setSelectedDesign("grid")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${selectedDesign === "grid"
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        <LayoutGrid size={18} />
                        1. Modern Grid
                    </button>
                    <button
                        onClick={() => setSelectedDesign("list")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${selectedDesign === "list"
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        <List size={18} />
                        2. Clean List
                    </button>
                    <button
                        onClick={() => setSelectedDesign("featured")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${selectedDesign === "featured"
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        <Star size={18} />
                        3. Featured View
                    </button>
                </div>
                <div className="text-xs text-gray-400 mt-2 text-center">
                    Select a layout to preview it live.
                </div>
            </div>

            {/* Render the selected component */}
            {renderDesign()}
        </div>
    );
}
