"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductTable from "../components/ProductTable";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!token && !refreshToken) {
        // No tokens, redirect to login
        return router.push("/login");
      }

      if (token) {
        try {
          // Decode token to check expiry
          const payload = JSON.parse(atob(token.split(".")[1]));
          const exp = payload.exp * 1000;

          if (Date.now() > exp && refreshToken) {
            // Token expired, refresh it
            const res = await fetch("/api/auth/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });

            if (!res.ok) throw new Error("Failed to refresh token");
            const data = await res.json();
            localStorage.setItem("access_token", data.access_token);
          }
        } catch {
          // Token invalid, try refresh
          if (refreshToken) {
            const res = await fetch("/api/auth/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });

            if (!res.ok) return router.push("/login");
            const data = await res.json();
            localStorage.setItem("access_token", data.access_token);
          } else {
            return router.push("/login");
          }
        }
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) return <p className="p-8">Checking authentication...</p>;

  return (
    <section className="">
      <h1 className="text-2xl font-bold mb-4">Products List</h1>
      <ProductTable />
    </section>
  );
}
