"use client";
import Navbar from "@/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard_layout flex">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
