/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Category = {
  id: number;
  name: string;
};

const AVAILABLE_SIZES = ["100g", "200g", "300g", "400g"];

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [size, setSize] = useState<string[]>([]);
  const [desc, setDesc] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [isTopSeller, setIsTopSeller] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [highlight, setHighlight] = useState<string[]>([""]);
  const [ingredient, setIngredient] = useState<string[]>([""]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...highlight];
    newHighlights[index] = value;
    setHighlight(newHighlights);
  };

  const addHighlight = () => setHighlight([...highlight, ""]);
  const removeHighlight = (index: number) =>
    setHighlight(highlight.filter((_, i) => i !== index));

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredient];
    newIngredients[index] = value;
    setIngredient(newIngredients);
  };

  const addIngredient = () => setIngredient([...ingredient, ""]);
  const removeIngredient = (index: number) =>
    setIngredient(ingredient.filter((_, i) => i !== index));

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/category");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    setNewFiles((prev) => [...prev, ...fileArray]);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    const existingCount = images.length - newFiles.length;
    if (index >= existingCount) {
      const newFileIndex = index - existingCount;
      setNewFiles((prev) => prev.filter((_, i) => i !== newFileIndex));
    }
  };

  const toggleSize = (selectedSize: string) => {
    setSize((prev) =>
      prev.includes(selectedSize)
        ? prev.filter((s) => s !== selectedSize)
        : [...prev, selectedSize]
    );
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of newFiles) {
      if (file.size > 20 * 1024 * 1024) {
        alert(`${file.name} is too large (max 20MB)`);
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
      const finalImages = [
        ...images.slice(0, images.length - newFiles.length),
        ...uploadedUrls,
      ];

      const validHighlights = highlight
        .map((h) => h.trim())
        .filter((h) => h.length > 0);
      const validIngredients = ingredient
        .map((i) => i.trim())
        .filter((i) => i.length > 0);

      if (
        !name.trim() ||
        !desc.trim() ||
        validHighlights.length === 0 ||
        validIngredients.length === 0 ||
        size.length === 0 ||
        !categoryId ||
        finalImages.length === 0
      ) {
        setError(
          "Please fill all fields, select sizes, and add at least one image."
        );
        setLoading(false);
        return;
      }

      const payload = {
        name: name.trim(),
        desc: desc.trim(),
        size,
        highLight: validHighlights,
        ingredient: validIngredients,
        categoryId: Number(categoryId),
        images: finalImages,
        isTopSeller,
      };

      const token = localStorage.getItem("access_token");
      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create product");
      }

      setName("");
      setSize([]);
      setDesc("");
      setHighlight([""]);
      setIngredient([""]);
      setCategoryId("");
      setImages([]);
      setNewFiles([]);
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
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
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
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Available Sizes */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Available Sizes (comma separated)
            </label>
            <input
              type="text"
              value={size.join(", ")}
              onChange={(e) =>
                setSize(
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s)
                )
              }
              disabled={loading}
              placeholder="e.g., 100g, 200g, 500g"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={loading}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Highlights
            </label>
            {highlight.map((h, idx) => (
              <div key={idx} className="flex items-center mb-2 space-x-2">
                <input
                  type="text"
                  value={h}
                  onChange={(e) => handleHighlightChange(idx, e.target.value)}
                  disabled={loading}
                  placeholder="e.g., Rich in Vitamin C"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {highlight.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHighlight(idx)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              disabled={loading}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              + Add Highlight
            </button>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Ingredients
            </label>
            {ingredient.map((ing, idx) => (
              <div key={idx} className="flex items-center mb-2 space-x-2">
                <input
                  type="text"
                  value={ing}
                  onChange={(e) => handleIngredientChange(idx, e.target.value)}
                  disabled={loading}
                  placeholder="e.g., 100% Coconut Water"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {ingredient.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(idx)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              disabled={loading}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
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
              onChange={(e) => setCategoryId(Number(e.target.value))}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

          {/* Images */}
          <div>
            <label className="block mb-3 text-gray-700 font-semibold">
              Product Images
            </label>
            <div className="flex flex-wrap gap-4 mb-4">
              {images.map((img, idx) => {
                const isBase64 = img.startsWith("data:");
                return (
                  <div
                    key={idx}
                    className="relative w-24 h-24 rounded-xl overflow-hidden border shadow"
                  >
                    {isBase64 ? (
                      <img
                        src={img}
                        alt={`Preview ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={img}
                        alt={`Preview ${idx}`}
                        fill
                        className="object-cover"
                        unoptimized={false} // let Next optimize Cloudinary URLs
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow"
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFilesChange}
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
            className={`w-full py-4 rounded-2xl font-extrabold text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
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
            <span>Product created successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
