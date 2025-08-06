"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setName(data.name);
        setPrice(data.price.toString());
        setDesc(data.desc);
        setCategoryId(data.categoryId.toString());
        setImages(data.images || []);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        desc,
        images,
        categoryId: parseInt(categoryId),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Failed to update product");
      return;
    }

    setShowSuccessToast(true);
    setError("");

    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <section className="max-w-3xl mx-auto mt-20 p-10 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900 select-none tracking-tight">
        Edit Product
      </h1>

      {error && (
        <div className="mb-6 p-5 bg-red-50 text-red-700 rounded-xl font-semibold border border-red-200 shadow-sm select-none">
          {error}
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-10">
        {/* Floating label input */}
        <div className="relative">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=" "
            required
            className="peer block w-full rounded-xl border border-gray-300 bg-gray-50 px-5 pt-7 pb-3 text-gray-900 placeholder-transparent shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
          />
          <label
            htmlFor="name"
            className="absolute left-5 top-3 text-gray-500 text-base font-semibold peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-emerald-600 peer-focus:text-base transition-all cursor-text select-none"
          >
            Product Name
          </label>
        </div>

        <div className="relative">
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder=" "
            required
            className="peer block w-full rounded-xl border border-gray-300 bg-gray-50 px-5 pt-7 pb-3 text-gray-900 placeholder-transparent shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            step="0.01"
            min="0"
          />
          <label
            htmlFor="price"
            className="absolute left-5 top-3 text-gray-500 text-base font-semibold peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-emerald-600 peer-focus:text-base transition-all cursor-text select-none"
          >
            Price ($)
          </label>
        </div>

        <div className="relative">
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder=" "
            required
            rows={5}
            className="peer block w-full rounded-xl border border-gray-300 bg-gray-50 px-5 pt-7 pb-3 text-gray-900 placeholder-transparent resize-none shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
          />
          <label
            htmlFor="desc"
            className="absolute left-5 top-3 text-gray-500 text-base font-semibold peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-emerald-600 peer-focus:text-base transition-all cursor-text select-none"
          >
            Description
          </label>
        </div>

        <div className="relative">
          <input
            type="number"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder=" "
            required
            className="peer block w-full rounded-xl border border-gray-300 bg-gray-50 px-5 pt-7 pb-3 text-gray-900 placeholder-transparent shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            min="1"
          />
          <label
            htmlFor="categoryId"
            className="absolute left-5 top-3 text-gray-500 text-base font-semibold peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-emerald-600 peer-focus:text-base transition-all cursor-text select-none"
          >
            Category ID
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="images"
            value={images.join(",")}
            onChange={(e) =>
              setImages(e.target.value.split(",").map((img) => img.trim()))
            }
            placeholder=" "
            className="peer block w-full rounded-xl border border-gray-300 bg-gray-50 px-5 pt-7 pb-3 text-gray-900 placeholder-transparent shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
          />
          <label
            htmlFor="images"
            className="absolute left-5 top-3 text-gray-500 text-base font-semibold peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-emerald-600 peer-focus:text-base transition-all cursor-text select-none"
          >
            Image URLs (comma separated)
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-extrabold py-4 rounded-2xl shadow-lg transition transform hover:scale-[1.04]"
        >
          Update Product
        </button>
      </form>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-700 text-white px-7 py-3 rounded-3xl shadow-2xl flex items-center space-x-4 select-none font-semibold tracking-wide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Product updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
