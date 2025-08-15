"use client";

import ProductsTable from "../../components/ProductTable";

export default function ProductsDashboard() {
  return (
    <>
      <main className="overflow-auto">
        <h2 className="text-2xl font-semibold p-4">Products List</h2>
        <ProductsTable />
      </main>
    </>
  );
}
