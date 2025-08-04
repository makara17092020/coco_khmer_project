"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Face Cream",
    price: 19.99,
    status: "In Stock",
    created: "2025-08-01",
    image: "https://via.placeholder.com/60?text=Face+Cream",
  },
];

const ITEMS_PER_PAGE = 10;

export default function ProductsTable() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8">
        {/* Top Controls: Search, Filter, Create Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
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
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-48 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="All">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

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
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map(
                  ({ id, name, price, status, created, image }) => (
                    <tr key={id} className="hover:bg-green-50 transition">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <img
                          src={image}
                          alt={name}
                          className="w-14 h-14 rounded-lg object-cover border border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{id}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            status === "In Stock"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{created}</td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                        <button
                          onClick={() => handleEditProduct(id)}
                          className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 hover:text-green-900 transition transform hover:scale-105 shadow-sm cursor-pointer"
                        >
                          Edit
                        </button>
                        <button className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 hover:text-red-900 transition transform hover:scale-105 shadow-sm cursor-pointer">
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
                : "bg-green-200 hover:bg-green-300 text-green-800 cursor-pointer"
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
                : "bg-green-200 hover:bg-green-300 text-green-800 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
