"use client";

import React from "react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) {
  return (
    <section className="px-4 py-6">
      <div className="mt-6 flex flex-wrap justify-center gap-3 bg-white px-4 py-2 rounded-full shadow-md max-w-fit mx-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition
              ${
                activeCategory === category
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
              }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>
    </section>
  );
}
