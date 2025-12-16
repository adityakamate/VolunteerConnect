"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useName } from "@/context/NameContext";
import { postRequest } from "@/lib/api";
import ProfileMinimalist from "@/components/profile-designs/ProfileMinimalist";
// import ProfileGamified from "@/components/profile-designs/ProfileGamified";
import ProfileMinimalistV2 from "@/components/profile-designs/ProfileMinimalistV2";
import ProfileProfessional from "@/components/profile-designs/ProfileProfessional";
import { Palette } from "lucide-react";

export default function DesignPreviewPage() {
    const [selectedDesign, setSelectedDesign] = useState("minimalist-v2");
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        completedTasks: 0,
        certificatesEarned: 0,
        bio: ''
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { setName } = useName();
    const router = useRouter();

    // --- Auth & Data Fetching Logic (Same as original) ---
    const verifyToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
            return false;
        }
        return true;
    };

    const getProfile = async () => {
        if (!isAuthenticated) return;
        const token = localStorage.getItem("token");
        try {
            const response = await postRequest(
                "/volunteer/profile",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            let data = response.data;
            setName(data.name);
            setUser(data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    useEffect(() => {
        const authStatus = verifyToken();
        setIsAuthenticated(authStatus);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            getProfile();
        }
    }, [isAuthenticated]);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        router.push("/");
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        try {
            const token = localStorage.getItem("token");
            await postRequest("/volunteer/profile/edit", data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            alert("Profile updated successfully");
            getProfile();
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to update profile");
        }
    }

    if (!isAuthenticated) return null;

    // --- Render Selected Design ---
    const renderDesign = () => {
        const props = { user, onLogout: handleLogOut, onSave: handleSave };
        switch (selectedDesign) {
            case "minimalist": return <ProfileMinimalist {...props} />;
            case "minimalist-v2": return <ProfileMinimalistV2 {...props} />;
            case "professional": return <ProfileProfessional {...props} />;
            default: return <ProfileMinimalistV2 {...props} />;
        }
    };

    return (
        <div className="relative">
            {/* Floating Design Switcher */}
            <div className="fixed bottom-6 right-6 z-50 bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 flex flex-col gap-3 max-w-xs animate-in slide-in-from-bottom-10 fade-in duration-500">
                <div className="flex items-center gap-2 font-bold text-gray-800 pb-2 border-b border-gray-100">
                    <Palette size={20} className="text-indigo-600" />
                    <span>Design Switcher</span>
                </div>
                <div className="space-y-2">
                    <button
                        onClick={() => setSelectedDesign("minimalist")}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedDesign === "minimalist"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        1. Modern Minimalist (Original)
                    </button>
                    <button
                        onClick={() => setSelectedDesign("minimalist-v2")}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedDesign === "minimalist-v2"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        2. Modern Minimalist V2 (Enhanced)
                    </button>
                    <button
                        onClick={() => setSelectedDesign("professional")}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedDesign === "professional"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        3. Professional Dashboard
                    </button>
                </div>
                <div className="text-xs text-gray-400 mt-2 text-center">
                    Select a design to preview it live.
                </div>
            </div>

            {/* Render the selected component */}
            {renderDesign()}
        </div>
    );
}
