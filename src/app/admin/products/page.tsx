"use client";

import ProductsTable from "../../components/ProductTable";
import Sidebar from "../../components/AdminSidebar";
import Topbar from "../../components/Topbar";

export default function ProductsDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Products</h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              + Add Product
            </button>
          </div>
          <ProductsTable />
        </main>
      </div>
    </div>
  );
}
