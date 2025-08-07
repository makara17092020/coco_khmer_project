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

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<string[]>([]); // existing + preview base64
  const [newFiles, setNewFiles] = useState<File[]>([]); // files to upload

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successToast, setSuccessToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing product data
  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();

        setName(data.name);
        setPrice(data.price.toString());
        setDesc(data.desc);
        setCategoryId(data.categoryId.toString());
        setImages(data.images || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load product");
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

    e.target.value = ""; // reset input
  };

  // Remove image by index
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));

    const existingCount = images.length - newFiles.length;
    if (index >= existingCount) {
      const newFileIndex = index - existingCount;
      setNewFiles((prev) => prev.filter((_, i) => i !== newFileIndex));
    }
  };

  // Upload new files to /api/upload and get URLs
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

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const data = await res.json();
      uploadedUrls.push(data.url);
    }

    return uploadedUrls;
  };

  // Submit updated product
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Upload new images
      const uploadedUrls = await uploadImages();

      // Combine old images (not removed) + newly uploaded URLs
      const existingImagesCount = images.length - newFiles.length;
      const existingImages = images.slice(0, existingImagesCount);
      const finalImages = [...existingImages, ...uploadedUrls];

      if (
        !name.trim() ||
        !desc.trim() ||
        !price ||
        !categoryId ||
        finalImages.length === 0
      ) {
        setError("Please fill all fields and add at least one image.");
        setLoading(false);
        return;
      }

      const payload = {
        name: name.trim(),
        desc: desc.trim(),
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        images: finalImages,
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
        {/* Product Name */}
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

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Price
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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

        {/* Category ID */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Category ID
          </label>
          <input
            type="number"
            min="1"
            placeholder="Category ID"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>

        {/* Images Preview + Upload */}
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
                <img
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

        {/* Submit button */}
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
