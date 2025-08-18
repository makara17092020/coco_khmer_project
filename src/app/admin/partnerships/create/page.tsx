"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CategoryPartnership = { id: number; name: string };

export default function CreatePartnership() {
  const [name, setName] = useState("");
  const [categoryPartnershipId, setCategoryPartnershipId] = useState<
    number | ""
  >("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const [categoryPartnerships, setCategoryPartnerships] = useState<
    CategoryPartnership[]
  >([]);

  const fetchCategoriesPartnership = async () => {
    try {
      const res = await fetch("/api/categorypartnership");
      if (!res.ok) throw new Error("Failed to fetch category partnerships");
      const data = await res.json();
      setCategoryPartnerships(data);
    } catch (err) {
      console.error(err);
      setCategoryPartnerships([]);
    }
  };
  useEffect(() => {
    fetchCategoriesPartnership();
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
    if (categoryPartnershipId === "") {
      setError("Please select a category partnership");
      return;
    }
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

      const partnershipData = {
        name,
        categoryPartnershipId,
        image: imageUrl,
      };

      const token = localStorage.getItem("access_token");

      const res = await fetch("/api/partnership/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(partnershipData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "partnership creation failed");
      }

      setName("");
      setCategoryPartnershipId("");
      setImage(null);
      setPreview("");
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
          Add Partnership
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 font-semibold rounded-lg shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Partnership Name
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
          <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <label
              htmlFor="categoryPartnership"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Category Partnership
            </label>
            <select
              id="categoryPartnership"
              value={categoryPartnershipId}
              onChange={(e) =>
                setCategoryPartnershipId(
                  e.target.value === "" ? "" : parseInt(e.target.value)
                )
              }
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a category partnership</option>
              {categoryPartnerships.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image */}
          <div
            className="p-4 bg-white rounded-lg shadow  border-gray-200 flex flex-col items-center justify-center border-2 border-dashed cursor-pointer hover:border-green-500 transition"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
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

      {/* Success Toast */}
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
            <span>Partnership created successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
