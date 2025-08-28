"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ITEMS_PER_PAGE = 10;

type Community = {
  id: number;
  image: string;
  createdAt: string;
};

export default function CommunityTable() {
  const router = useRouter();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState<number | null>(
    null
  );

  // Fetch communities from API
  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/community");
      const data = await res.json();

      // Use correct array from API
      setCommunities(data.community || []);
    } catch (err) {
      console.error("Failed to fetch communities:", err);
      setCommunities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  // Pagination only
  const totalPages = Math.max(
    1,
    Math.ceil(communities.length / ITEMS_PER_PAGE)
  );
  const paginated = communities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/community/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    setSelectedCommunityId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/community/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete community");
      await fetchCommunities();
      setShowDeleteModal(false);
      setSelectedCommunityId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete community.");
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
        {/* Create button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => router.push("/admin/community/create")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Create Community
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100 text-green-900 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={3}>
                    <div className="flex items-center justify-center py-12 w-full">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              ) : paginated.length > 0 ? (
                paginated.map(({ id, image, createdAt }) => (
                  <tr key={id} className="hover:bg-green-50 transition">
                    <td className="px-4 py-4">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-300 shadow-md">
                        <Image
                          width={100}
                          height={100}
                          src={image || "https://via.placeholder.com/60"}
                          alt="Community Image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {createdAt
                        ? new Date(createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-8 flex gap-3">
                      <button
                        onClick={() => handleEdit(id)}
                        className="px-3 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 font-semibold transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        disabled={loading}
                        className="px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 font-semibold transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-10 text-gray-400 italic"
                  >
                    No communities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
              className="w-full max-w-sm p-6 rounded-2xl shadow-2xl bg-white backdrop-blur-md border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this community?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCommunityId(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    selectedCommunityId &&
                    handleDeleteConfirmed(selectedCommunityId)
                  }
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
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
