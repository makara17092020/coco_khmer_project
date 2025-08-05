"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductTable from "../components/ProductTable";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Products List</h1>
      <ProductTable />
    </section>
  );
}
