"use client";

import Image from "next/image";
import { useState } from "react";
import ButtonAllProducts from "../components/button-allproducts"; // Adjust path accordingly

// Product categories
const categories = ["All Products", "Skin Care", "Fragrances"];

// Product list
const products = [
  {
    category: "All Products",
    image: "/images/oil.jpg",
    title: "Virgin Coconut Oil",
    desc: "Virgin Coconut Oil... ",
    size: "(90mL, 250mL)",
  },
  {
    category: "Active Lifestyle",
    image: "/images/Coconut.jpg",
    title: "Body Scrub",
    desc: "Exfoliating Coconut & Coffee Scrub (200g)...",
    size: "(90mL, 250mL)",
  },
  {
    category: "Everyday",
    image: "/images/Lipbalm.jpg",
    title: "Balms",
    desc: "Moisturizing Body Balm (15g / 60g)...",
    size: "(90mL, 250mL)",
  },
  {
    category: "Essentials",
    image: "/images/BodyBalm.jpg",
    title: "Nurturing Baby Balm",
    desc: "A gentle balm for babies...",
    size: "(90mL, 250mL)",
  },
  {
    category: "Everyday",
    image: "/images/Lip-Pac.jpg",
    title: "Fruit Fusion Lip Balms",
    desc: "100% natural lip balms inspired ...",
    size: "(90mL, 250mL)",
  },
  {
    category: "Active Lifestyle",
    image: "/images/PineApple.jpg",
    title: "Vitalizing Hair & Face Balm",
    desc: "A versatile balm to style, nourish, ...",
    size: "(90mL, 250mL)",
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
      <section className="relative w-full sm:h-140 h-100 flex items-center justify-between bg-slate-300 overflow-hidden">
        <div className="absolute inset-0 sm:w-230 w-190 sm:h-140 h-100">
          <Image
            src="/images/1.jpg"
            alt="Coco Khmer Hero"
            layout="fill"
            objectFit="cover"
            className="object-left"
            priority
          />
        </div>
        <div className="relative z-20 ml-auto w-full max-w-xl p-20">
          <p className="text-sm md:text-base sm:text-emerald-900 text-white font-medium mb-2 uppercase tracking-wide">
            Welcome to CoCo Khmer Clean Skincare
          </p>
          <h1 className="text-4xl md:text-7xl font-extrabold sm:text-emerald-900 text-white mb-6">
            Love Being <br /> in Your Skin
          </h1>
          <div className="flex gap-2">
            <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300">
              Find Our Products
            </button>
            <button className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 py-6">
        <ButtonAllProducts
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
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
      <button className="mt-3 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-800">
        Read More
      </button>
    </div>
  );
}
