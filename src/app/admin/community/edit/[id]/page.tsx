"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type CommunityResponse = {
  image: string;
};

type UploadResponse = {
  data: {
    urls?: string[];
  };
};

export default function EditCommunity() {
  const { id } = useParams();
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [successToast, setSuccessToast] = useState(false);

  // Fetch current community
  useEffect(() => {
    if (!id) return;
    const fetchCommunity = async () => {
      try {
        const res = await fetch(`/api/community/${id}`);
        if (!res.ok) throw new Error("Failed to fetch community");
        const data: CommunityResponse = await res.json();
        setCurrentImage(data.image);
        setPreview(data.image);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Error loading community");
      }
    };
    fetchCommunity();
  }, [id]);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    setError("");

    try {
      let imageUrl = currentImage;

      // Upload new image if selected
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");

        const uploadData: UploadResponse = await uploadRes.json();
        imageUrl = uploadData.data.urls?.[0] || "";
        if (!imageUrl) throw new Error("Image upload failed");
      }

      // Update community
      const token = localStorage.getItem("access_token") || "";
      const res = await fetch(`/api/community/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: imageUrl }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          (errData as { message?: string })?.message ||
            "Community update failed"
        );
      }

      setSuccessToast(true);
      setTimeout(() => {
        setSuccessToast(false);
        router.push("/admin/community"); // redirect to table
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Edit Community Image
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 font-semibold rounded-lg shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="p-4 bg-white rounded-lg shadow border-gray-200 flex flex-col items-center justify-center border-2 border-dashed cursor-pointer hover:border-green-500 transition"
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
              Click to change image
            </label>

            {preview && (
              <Image
                width={200}
                height={200}
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
            {loading ? "Updating..." : "Update Image"}
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
            <span>Community updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
