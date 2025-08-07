"use client";

import Image from "next/image";
import { useState } from "react";

// Product categories
const categories = ["All Products", "Skin Care", "Fragrances"];

// Product list with SIZE added
const products = [
  {
    category: "All Products",
    image: "/images/oil.jpg",
    title: "Virgin Coconut Oil",
    desc: "Virgin Coconut Oil ",
    size: "(90mL, 250mL)...",
  },
  {
    category: "Active Lifestyle",
    image: "/images/Coconut.jpg",
    title: "Body Scrub",
    desc: "Exfoliating Coconut & Coffee Scrub (200g)...",
    size: "medium",
  },
  {
    category: "Everyday",
    image: "/images/Lipbalm.jpg",
    title: "Balms",
    desc: "Moisturizing Body Balm (15g / 60g)...",
    size: "medium",
  },
  {
    category: "Essentials",
    image: "/images/BodyBalm.jpg",
    title: "Nurturing Baby Balm",
    desc: "A gentle balm for babies...",
    size: "medium",
  },
  {
    category: "Everyday",
    image: "/images/Lip-Pac.jpg",
    title: "Fruit Fusion Lip Balms",
    desc: "100% natural lip balms inspired ...",
    size: "medium",
  },
  {
    category: "Active Lifestyle",
    image: "/images/PineApple.jpg",
    title: "Vitalizing Hair & Face Balm",
    desc: "A versatile balm to style, nourish, ...",
    size: "medium",
  },
];

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="bg-green-50 px-4 py-12">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-green-900 mb-4">
              Natural Care for Everyday Wellness
            </h2>
            <p className="text-green-800 mb-6">
              Explore our handcrafted skincare essentials made with love and
              coconut oil.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition">
              Shop Now
            </button>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2 relative h-72 md:h-96">
            <Image
              src="/images/1.jpg"
              alt="Skincare Products"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
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

      {/* Product Grid */}
      <section className="py-8 px-4 bg-white">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
              desc={product.desc}
              size={product.size}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

// Product Card Component
function ProductCard({
  image,
  title,
  desc,
  size,
}: {
  image: string;
  title: string;
  desc: string;
  size: "small" | "medium" | "large" | string;
}) {
  // Apply dynamic height
  const heightClass =
    size === "small" ? "h-40" : size === "medium" ? "h-60" : "h-80";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div
        className={`relative w-full ${heightClass} rounded-md overflow-hidden`}
      >
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <h3 className="mt-4 font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
      <p className="text-xs text-gray-400 mt-1 capitalize">Size: {size}</p>
      <button className="mt-3 px-4 py-2 bg-green-700 text-white text-sm rounded hover:bg-green-800">
        Read More
      </button>
    </div>
  );
}
