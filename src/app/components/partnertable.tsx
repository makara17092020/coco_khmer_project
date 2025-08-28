"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ITEMS_PER_PAGE = 10;

type Partnership = {
  id: number;
  name: string;
  createdAt: string;
  image?: string;
  categoryPartnershipId?: number;
};

type CategoryPartnership = {
  id: number;
  name: string;
};

export default function PartnershipsTable() {
  const router = useRouter();
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [categoriesPartnership, setCategoriesPartnership] = useState<
    CategoryPartnership[]
  >([]);
  const [search, setSearch] = useState("");
  const [selectedCategoryPartnership, setSelectedCategoryPartnership] =
    useState<number | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPartnershipId, setSelectedPartnershipId] = useState<
    number | null
  >(null);

  const fetchPartnerships = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/partnership/create");
      if (!res.ok) throw new Error("Failed to fetch partnerships");
      const data = await res.json();
      setPartnerships(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch partnerships:", error);
      setPartnerships([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesPartnership = async () => {
    try {
      const res = await fetch("/api/categorypartnership");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategoriesPartnership(data);
    } catch (err) {
      console.error(err);
      setCategoriesPartnership([]);
    }
  };

  useEffect(() => {
    fetchPartnerships();
    fetchCategoriesPartnership();
  }, []);

  const filteredPartnerships = partnerships.filter((p) => {
    const matchesName = (p.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategoryPartnership === "" ||
      p.categoryPartnershipId === selectedCategoryPartnership;
    return matchesName && matchesCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPartnerships.length / ITEMS_PER_PAGE)
  );

  const paginatedPartnerships = filteredPartnerships.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCreatePartnership = () =>
    router.push("/admin/partnerships/create");

  const handleDeletePartnership = (id: number) => {
    setSelectedPartnershipId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/partnership/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to delete partnership");
      await fetchPartnerships();
      setShowDeleteModal(false);
      setSelectedPartnershipId(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete partnership.");
    } finally {
      setLoading(false);
    }
  };
  const Spinner = () => (
    <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search partnerships..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-72 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <select
            value={selectedCategoryPartnership}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedCategoryPartnership(val === "" ? "" : parseInt(val));
              setCurrentPage(1);
            }}
            className="w-full md:w-48 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">All Category Partnerships</option>
            {categoriesPartnership.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleCreatePartnership}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
          >
            Add Partnership
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100 text-green-900 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category Partnership</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    <div className="flex items-center justify-center py-12 w-full">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              ) : paginatedPartnerships.length > 0 ? (
                paginatedPartnerships.map(
                  ({ id, name, createdAt, categoryPartnershipId, image }) => (
                    <tr key={id} className="hover:bg-green-50 transition">
                      <td className="px-4 py-4">
                        {image ? (
                          <Image
                            width={100}
                            height={100}
                            src={image}
                            alt={name || "No name"}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium">{name || "—"}</td>
                      <td className="px-6 py-4">
                        {categoriesPartnership.find(
                          (c) => c.id === categoryPartnershipId
                        )?.name || "—"}
                      </td>
                      <td className="px-6 py-4">
                        {createdAt
                          ? new Date(createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeletePartnership(id)}
                          disabled={loading}
                          className="px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 font-semibold transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400 italic"
                  >
                    No partnerships found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center text-gray-700 text-sm">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                : "bg-green-200 hover:bg-green-300 text-green-800"
            }`}
          >
            Previous
          </button>
          <div className="font-semibold">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                : "bg-green-200 hover:bg-green-300 text-green-800"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm p-6 rounded-2xl shadow-2xl bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this partnership?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedPartnershipId(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    selectedPartnershipId &&
                    handleDeleteConfirmed(selectedPartnershipId)
                  }
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg font-semibold text-white transition cursor-pointer ${
                    loading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
