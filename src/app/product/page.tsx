"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter"; // adjust path

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  category: { id: number; name: string };
  images: string[];
  isTopSeller: boolean;
}

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/product");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products); // matches your API response { products: [...] }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter((p) => p.category.name === activeCategory);

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="relative w-full sm:h-140 h-100 flex items-center justify-between bg-slate-300 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 sm:w-230 w-190 sm:h-140 h-100">
          <Image
            src="/images/home1.jpg"
            alt="Coco Khmer Hero"
            fill
            className="object-cover object-left"
            priority
          />
        </div>

        {/* Hero Content */}
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
      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Product Grid */}
      <section className="py-8 px-4 bg-white">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images[0] || "/images/placeholder.jpg";
  const sizeClass = "medium"; // you can adapt if size is available

  const heightClass =
    sizeClass === "small"
      ? "h-40"
      : sizeClass === "medium"
      ? "h-60"
      : sizeClass === "large"
      ? "h-80"
      : "h-60";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div
        className={`relative w-full ${heightClass} rounded-md overflow-hidden`}
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 mt-1">{product.desc}</p>
      <p className="text-xs text-gray-400 mt-1">Price: ${product.price}</p>
      <p className="text-xs text-gray-400 mt-1">
        Category: {product.category.name}
      </p>
      <button className="mt-3 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-800">
        Read More
      </button>
    </div>
  );
}
