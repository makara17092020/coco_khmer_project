"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 10;

type Product = {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  images: string[];
};

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
      const res = await fetch("http://localhost:3000/api/product/create");
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error("Invalid product data format");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
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
      const res = await fetch(`http://localhost:3000/api/product/${id}`, {
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
          />
          <button
            onClick={handleCreateProduct}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105 cursor-pointer"
          >
            Create Product
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100 text-green-900 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map(
                  ({ id, name, price, createdAt, images }) => (
                    <tr key={id} className="hover:bg-green-50 transition">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <img
                          src={images?.[0] || "https://via.placeholder.com/60"}
                          alt={name}
                          className="w-14 h-14 rounded-lg object-cover border border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">{id}</td>
                      <td className="px-6 py-4 font-medium">{name}</td>
                      <td className="px-6 py-4">${price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        {new Date(createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-7 flex gap-3">
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
                    colSpan={6}
                    className="text-center py-10 text-gray-400 italic"
                  >
                    No products found.
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
            className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-black/30 via-black/25 to-black/30
"
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
