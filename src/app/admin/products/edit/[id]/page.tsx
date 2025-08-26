/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, {
  useEffect,
  useState,
  ChangeEvent,
  useRef,
  FormEvent,
} from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [desc, setDesc] = useState("");
  const [highLight, setHighLight] = useState<string[]>([""]);
  const [ingredient, setIngredient] = useState<string[]>([""]);
  const [isTopSeller, setIsTopSeller] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...highLight];
    newHighlights[index] = value;
    setHighLight(newHighlights);
  };

  const addHighlight = () => setHighLight([...highLight, ""]);
  const removeHighlight = (index: number) =>
    setHighLight(highLight.filter((_, i) => i !== index));

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredient];
    newIngredients[index] = value;
    setIngredient(newIngredients);
  };

  const addIngredient = () => setIngredient([...ingredient, ""]);
  const removeIngredient = (index: number) =>
    setIngredient(ingredient.filter((_, i) => i !== index));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successToast, setSuccessToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/category");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        console.error("Category fetch error:", err);
      }
    }
    fetchCategories();
  }, []);

  // Fetch existing product data
  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();

        setName(data.name || "");
        setSize(
          Array.isArray(data.size) ? data.size.join(", ") : data.size || ""
        );
        setDesc(data.desc || "");
        setHighLight(data.highLight || "");
        setIngredient(data.ingredient || "");
        setIsTopSeller(data.isTopSeller ?? false);
        setCategoryId(data.categoryId?.toString() || "");
        setImages(data.images || []);
      } catch (err: any) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Handle file selection + preview
  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setNewFiles((prev) => [...prev, ...fileArray]);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        if (typeof base64 === "string") {
          setImages((prev) => [...prev, base64]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const existingCount = images.length - newFiles.length;
    if (index >= existingCount) {
      const newFileIndex = index - existingCount;
      setNewFiles((prev) => prev.filter((_, i) => i !== newFileIndex));
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of newFiles) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large (max 5MB)`);
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Image upload failed");

      const data = await res.json();
      uploadedUrls.push(data.url);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const uploadedUrls = await uploadImages();
      const existingImagesCount = images.length - newFiles.length;
      const existingImages = images.slice(0, existingImagesCount);
      const finalImages = [...existingImages, ...uploadedUrls];
      const validHighlights = highLight.filter((h) => h.trim() !== "");
      const validIngredients = ingredient.filter((i) => i.trim() !== "");

      if (
        !name.trim() ||
        !size.trim() ||
        !desc.trim() ||
        validHighlights.length === 0 ||
        validIngredients.length === 0 ||
        !categoryId ||
        finalImages.length === 0
      ) {
        setError("Please fill all fields and add at least one image.");
        setLoading(false);
        return;
      }

      const payload = {
        name: name.trim(),
        size: size
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        desc: desc.trim(),
        highLight: validHighlights,
        ingredient: validIngredients,
        categoryId: parseInt(categoryId),
        images: finalImages,
        isTopSeller,
      };

      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update product");
      }

      setSuccessToast(true);
      setNewFiles([]);
      setLoading(false);
      setTimeout(() => setSuccessToast(false), 3000);
    } catch (err: any) {
      setError(err.message || "Update failed");
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto mt-20 p-10 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-900">
        Edit Product
      </h1>

      {loading && (
        <p className="mb-6 text-gray-600 font-semibold">Loading...</p>
      )}
      {error && (
        <div className="mb-6 p-5 bg-red-50 text-red-700 rounded-xl font-semibold border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Product name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Size */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Size (e.g., 100g, 200g)
          </label>
          <input
            type="text"
            placeholder="Enter sizes separated by commas"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            placeholder="Product description"
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        {/* Highlight */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Highlights
          </label>
          {highLight.map((h, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={h}
                onChange={(e) => handleHighlightChange(idx, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Rich in Vitamin C"
              />
              <button
                type="button"
                onClick={() => removeHighlight(idx)}
                className="text-red-600 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="mt-2 text-green-600 font-semibold"
          >
            + Add Highlight
          </button>
        </div>

        {/* Ingredient */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Ingredients
          </label>
          {ingredient.map((ing, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={ing}
                onChange={(e) => handleIngredientChange(idx, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., 100% Coconut Water"
              />
              <button
                type="button"
                onClick={() => removeIngredient(idx)}
                className="text-red-600 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 text-green-600 font-semibold"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block mb-3 text-gray-700 font-semibold">
            Product Images
          </label>
          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 rounded-xl overflow-hidden border shadow"
              >
                <Image
                  src={img}
                  alt={`Preview ${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFilesChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-2xl"
          >
            + Add Images
          </button>
        </div>

        {/* Top seller */}
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
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-extrabold py-4 rounded-2xl shadow-lg transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>

      {/* Success toast */}
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
            <span>Product updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
