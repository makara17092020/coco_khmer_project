"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import AdminProviders from "./providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!token && !refreshToken) {
        router.push("/login");
        return;
      }

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const exp = payload.exp * 1000;

          if (Date.now() > exp && refreshToken) {
            // Try refresh token
            const res = await fetch("/api/auth/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });

            if (!res.ok) throw new Error("Failed to refresh token");

            const data = await res.json();
            localStorage.setItem("access_token", data.access_token);
          } else if (Date.now() > exp) {
            // Token expired, no refresh token
            router.push("/login");
            return;
          }
        } catch {
          if (refreshToken) {
            const res = await fetch("/api/auth/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });

            if (!res.ok) {
              router.push("/login");
              return;
            }

            const data = await res.json();
            localStorage.setItem("access_token", data.access_token);
          } else {
            router.push("/login");
            return;
          }
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

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
