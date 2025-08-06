"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Step 1: Upload image to Cloudinary
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData?.result?.secure_url;

        if (!imageUrl) throw new Error("Image upload failed");
      }

      // Step 2: Prepare product data
      const productData = {
        name,
        desc,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        images: [imageUrl],
      };

      // Step 3: Send to API with token
      const token = localStorage.getItem("access_token");
      console.log("Token from localStorage:", token);

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

      // Step 4: Reset form and show success message
      setName("");
      setDesc("");
      setPrice("");
      setCategoryId("");
      setImage(null);
      setPreview("");

      alert("✅ Product created successfully!");

      // You stay on the page (no redirect)
      // router.push("/admin/products");
    } catch (err: any) {
      alert(err.message || "❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price (USD)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Category ID</label>
            <input
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-32 object-contain border rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
