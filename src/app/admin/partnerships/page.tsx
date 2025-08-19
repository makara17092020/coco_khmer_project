"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PartnersTable from "../../components/partnertable";

export default function PartnersDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!token && !refreshToken) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;

  return (
    <>
      <h2 className="text-2xl font-semibold p-4">Partnerships List</h2>
      <PartnersTable />
    </>
  );
}
