"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 10;

type Contact = {
  id: number;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
};

export default function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "today" | "unread">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );
  const [showMessageModal, setShowMessageModal] = useState(false);
 const [selectedContact, setSelectedContact] = useState<{
  fullName: string;
  email: string;
  message: string;
} | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // --- Filtering logic ---
  const today = new Date().toDateString();

  const filteredContacts = contacts
    .filter((c) => (c.fullName || "").toLowerCase().includes(search.toLowerCase()))
    .filter((c) => {
      if (filter === "today") {
        return new Date(c.createdAt).toDateString() === today;
      }
      if (filter === "unread") {
        return c.isRead === false;
      }
      return true;
    });

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / ITEMS_PER_PAGE));
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleDeleteContact = (id: number) => {
    setSelectedContactId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete contact");
      await fetchContacts();
      setShowDeleteModal(false);
      setSelectedContactId(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete contact.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: number) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      await fetchContacts();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-72 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === "all" ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("today")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === "today" ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === "unread" ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100 text-green-900 font-semibold">
              <tr>
                <th className="ps-4 py-3 text-left">Full Name</th>
                <th className="ps-4 py-3 text-left">Email</th>
                <th className="ps-4 py-3 text-left">Message</th>
                <th className="ps-4 py-3 text-left">Created</th>
                <th className="ps-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    Loading contacts...
                  </td>
                </tr>
              ) : paginatedContacts.length > 0 ? (
                paginatedContacts.map(
                  ({ id, fullName, email, message, createdAt, isRead }) => (
                    <tr
                      key={id}
                      className={`hover:bg-green-50 transition ${
                        isRead === false ? "bg-yellow-50" : ""
                      }`}
                    >
                      <td className="ps-4 py-4 font-medium">{fullName}</td>
                      <td className="ps-4 py-4">{email}</td>
                      <td className="ps-4 py-4 text-gray-600 max-w-xs truncate">
                        {message.length > 10 ? message.substring(0, 10) + "..." : message}
                      </td>
                      <td className="px-4 py-4">
                        {createdAt
                          ? new Date(createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-4 flex gap-2">
                        {isRead === false && (
                          <button
                            onClick={() => handleMarkRead(id)}
                            disabled={loading}
                            className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold transition cursor-pointer"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedContact({ fullName, email, message });
                            setShowMessageModal(true);
                          }}
                          className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold transition cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteContact(id)}
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
                    colSpan={5}
                    className="text-center py-10 text-gray-400 italic"
                  >
                    No contacts found.
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
              className="w-full max-w-sm p-6 rounded-2xl shadow-2xl bg-white"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this contact?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedContactId(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    selectedContactId && handleDeleteConfirmed(selectedContactId)
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
      <AnimatePresence>
  {showMessageModal && (
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
        className="w-full max-w-lg p-6 rounded-2xl shadow-2xl bg-white"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Contact Message
        </h2>
        <div className="mb-4">
          <p className="text-gray-800 font-medium"> <span className="font-semibold">Full Name: </span>  {selectedContact?.fullName}</p>
          <p className="text-gray-800"> <span className="font-semibold">Email: </span>  {selectedContact?.email ?? ""}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">Message</p>
          <p className="text-gray-700 whitespace-pre-wrap">
            {selectedContact?.message}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              setShowMessageModal(false);
              setSelectedContact(null);
            }}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
