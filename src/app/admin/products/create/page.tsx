"use client";

import { useState, ChangeEvent } from "react";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("In Stock");
  const [created, setCreated] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !created || !image) {
      alert("Please fill all required fields and select an image.");
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert("Please enter a valid positive price.");
      return;
    }

    // For now, just show alert
    alert(
      `Product created:\nName: ${name}\nPrice: $${priceNumber.toFixed(
        2
      )}\nStatus: ${status}\nCreated: ${created}\nImage: ${image.name}`
    );

    // TODO: Replace with API call

    // Reset form
    setName("");
    setPrice("");
    setStatus("In Stock");
    setCreated("");
    setImage(null);
    setPreview("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold mb-8 text-green-700 text-center">
          Create New Product
        </h1>

        {/* Image preview */}
        <div className="mb-6 flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border border-gray-300 mb-4"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4 text-gray-400">
              No Image Selected
            </div>
          )}
          <label className="cursor-pointer text-green-600 hover:text-green-800 font-semibold underline">
            Select Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <label className="block mb-4">
          <span className="block text-gray-700 font-semibold mb-1">
            Product Name <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block text-gray-700 font-semibold mb-1">
            Price ($) <span className="text-red-500">*</span>
          </span>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block text-gray-700 font-semibold mb-1">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
        </label>

        <label className="block mb-6">
          <span className="block text-gray-700 font-semibold mb-1">
            Created Date <span className="text-red-500">*</span>
          </span>
          <input
            type="date"
            value={created}
            onChange={(e) => setCreated(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
