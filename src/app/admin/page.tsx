import ProductTable from "../components/ProductTable";

export default function AdminDashboardPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Products List</h1>
      <ProductTable />
    </section>
  );
}
