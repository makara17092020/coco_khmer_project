"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 10;

type Product = {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  images?: string[];
  desc?: string;
  isTopseller?: boolean;
};

function ProductImageSlideshow({
  images = [],
  alt,
}: {
  images?: string[];
  alt: string;
}) {
  const [hovering, setHovering] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!hovering || images.length <= 1) {
      setIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [hovering, images]);

  return (
    <div className="flex flex-col items-center space-y-1">
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-300 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        role="img"
        aria-label={`${alt} image slideshow`}
        tabIndex={0}
      >
        <img
          src={images[index] || "https://via.placeholder.com/60"}
          alt={alt}
          className="w-full h-full object-cover"
        />
        {hovering && images.length > 0 && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-black bg-opacity-70 text-white text-xs whitespace-nowrap select-none pointer-events-none">
            Image {index + 1} / {images.length}
          </div>
        )}
      </div>
      <span className="text-xs text-gray-500">
        {images.length} image{images.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

export default function ProductsTable() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/product/create");
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
        console.error("Invalid product data format");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    (product.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCreateProduct = () => {
    router.push("/admin/products/create");
  };

  const handleEditProduct = (id: number) => {
    router.push(`/admin/products/edit/${id}`);
  };

  const handleDeleteProduct = (id: number) => {
    setSelectedProductId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      await fetchProducts();
      setShowDeleteModal(false);
      setSelectedProductId(null);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8">
        {/* Search and Create */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-72 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            aria-label="Search products"
          />
          <button
            onClick={handleCreateProduct}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
          >
            Create Product
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100 text-green-900 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left max-w-xs">Description</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map(
                  ({ id, name, price, createdAt, images, desc }) => (
                    <tr key={id} className="hover:bg-green-50 transition">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <ProductImageSlideshow
                          images={Array.isArray(images) ? images : []}
                          alt={name || "No name"}
                        />
                      </td>
                      <td className="px-6 py-4">{id}</td>
                      <td className="px-6 py-4 font-medium">{name || "—"}</td>
                      <td
                        className="px-6 py-4 max-w-xs cursor-help"
                        title={desc || ""}
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "250px",
                        }}
                      >
                        {desc && desc.length > 15
                          ? desc.slice(0, 15) + "..."
                          : desc || "—"}
                      </td>
                      <td className="px-6 py-4">
                        {typeof price === "number"
                          ? `$${price.toFixed(2)}`
                          : "—"}
                      </td>
                      <td className="px-6 py-4">
                        {createdAt
                          ? new Date(createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-6 py-9 flex gap-3">
                        <button
                          onClick={() => handleEditProduct(id)}
                          className="px-3 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 font-semibold transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(id)}
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
                    colSpan={7}
                    className="text-center py-10 text-gray-400 italic"
                  >
                    No products found.
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
            className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-black/30 via-black/25 to-black/30"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm p-6 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md border border-white/20 bg-gradient-to-br from-green-300 via-white to-green-100"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this product?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProductId(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (selectedProductId !== null)
                      handleDeleteConfirmed(selectedProductId);
                  }}
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
