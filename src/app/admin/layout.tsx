"use client";

import Sidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import AdminProviders from "./providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProviders>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AdminProviders>
  );
}
