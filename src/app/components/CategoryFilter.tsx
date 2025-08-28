/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>(["All Products"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();

        // Extract names (in case API returns objects)
        const categoryNames = data.map((c: any) =>
          typeof c === "string" ? c : c.name || "Unknown"
        );

        // Add "All Products" at the beginning
        setCategories(["All Products", ...categoryNames]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  if (loading)
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    );

  return (
    <section className="px-4">
      <div className=" flex flex-wrap justify-center gap-3 bg-white px-4 py-2 rounded-full shadow-md max-w-fit mx-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition
              ${
                activeCategory === category
                  ? "bg-[#0C5C4C] text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-200"
              }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>
    </section>
  );
}

const Spinner = () => (
  <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
);
