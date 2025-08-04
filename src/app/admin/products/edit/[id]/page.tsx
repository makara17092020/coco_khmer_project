"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditProductPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    status: "active",
    image: "",
  });

  // Simulate fetching product data
  useEffect(() => {
    // Replace with your API fetch
    const fetchProduct = async () => {
      // Simulated fetched data
      const data = {
        name: "Sample Product",
        price: "25.00",
        status: "active",
        image: "https://via.placeholder.com/150",
      };

      setFormData(data);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send updated formData to your API
    console.log("Submit edited product:", { id, ...formData });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Edit Product #{id}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-xl rounded-xl p-6 border"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Image
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image URL here"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-40 rounded shadow mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
