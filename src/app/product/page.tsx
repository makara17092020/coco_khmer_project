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
        setProducts(data.products);
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

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-60 rounded-md overflow-hidden">
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
