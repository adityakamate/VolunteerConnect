"use client";

import { usePathname } from "next/navigation";
import AdminSideBar from "@/components/AdminSidebar";
import { motion } from "framer-motion";

export default function AdminLayout({ children }) {
  const pathname = usePathname();


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminSideBar />
      <main className="pt-20 lg:pt-20 lg:ml-64 p-4 lg:p-8">

        {children}
      </main>
    </div>
  );
}


