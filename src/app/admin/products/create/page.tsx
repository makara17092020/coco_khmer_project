"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = {
  id: number;
  name: string;
};

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [isTopSeller, setIsTopSeller] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/category");
        const data = await res.json();
        setCategories(data); // assuming API returns array of categories
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData?.url;

        if (!imageUrl) throw new Error("Image upload failed");
      }

      const productData = {
        name,
        desc,
        price: parseFloat(price),
        categoryId: categoryId,
        images: imageUrl ? [imageUrl] : [],
        isTopSeller,
      };

      const token = localStorage.getItem("access_token");

      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Product creation failed");
      }

      // Reset form
      setName("");
      setDesc("");
      setPrice("");
      setCategoryId("");
      setImage(null);
      setPreview("");
      setIsTopSeller(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Create New Product
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 font-semibold rounded-lg shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <label
              htmlFor="desc"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Description
            </label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              disabled={loading}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
              <label
                htmlFor="price"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Price (USD)
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                step="0.01"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
              <label
                htmlFor="category"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Product Image
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:border-green-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="text-gray-500 cursor-pointer select-none"
              >
                Click to select or drag and drop image here
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 max-h-48 rounded-md shadow-md object-contain"
                />
              )}
            </div>
          </div>

          {/* Top Seller */}
          <div className="p-4 bg-white rounded-lg shadow border border-gray-200 flex items-center space-x-3">
            <input
              id="isTopSeller"
              type="checkbox"
              checked={isTopSeller}
              onChange={(e) => setIsTopSeller(e.target.checked)}
              disabled={loading}
              className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isTopSeller"
              className="text-sm font-semibold text-gray-700 select-none cursor-pointer"
            >
              Mark as Top Seller
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300"
            }`}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-green-700 text-white px-7 py-3 rounded-3xl shadow-lg flex items-center space-x-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Product created successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
