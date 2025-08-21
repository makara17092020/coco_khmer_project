"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "../components/CategoryFilter";

interface Product {
  id: number;
  name: string;
  desc: string;
  weight: number | string | string[];
  category: { id: number; name: string };
  images: string[];
  isTopSeller: boolean;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams?.get("category") ?? "";

  const [activeCategory, setActiveCategory] = useState("All Products");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  // Update active category from query
  useEffect(() => {
    if (categoryFromQuery) {
      setActiveCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product"); // relative URL works in Next.js
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const productsWithWeight = data.products.map((p: any) => ({
          ...p,
          weight: p.size ?? "N/A",
          images:
            p.images && p.images.length
              ? p.images
              : ["/images/placeholder.jpg"],
        }));

        setProducts(productsWithWeight);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update main image when modal opens
  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.images[0] ?? "/images/placeholder.jpg");
    }
  }, [selectedProduct]);

  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter((p) => p.category.name === activeCategory);

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="relative w-full sm:h-140 h-100 flex items-center justify-between bg-slate-300 overflow-hidden">
        <div className="absolute inset-0 sm:w-230 w-190 sm:h-140 h-100">
          <Image
            src="/images/home1.jpg"
            alt="Hero Image"
            fill
            className="object-cover object-left"
            priority
          />
        </div>
        <div className="relative z-20 ml-auto w-full max-w-xl p-8">
          <p className="text-sm md:text-base text-white font-medium mb-2 uppercase tracking-wide">
            Welcome to CoCo Khmer Clean Skincare
          </p>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6">
            Love Being <br /> in Your Skin
          </h1>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="pb-8 px-4 bg-white mt-10">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto mt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onReadMore={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedProduct && mainImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Left */}
              <div>
                <div className="w-full max-w-sm mx-auto h-80 rounded-xl overflow-hidden shadow-lg bg-white relative">
                  <Image
                    src={mainImage}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex gap-4 mt-4 ml-5 overflow-x-auto">
                  {selectedProduct.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-16 h-16 rounded overflow-hidden shadow cursor-pointer flex-shrink-0"
                      onClick={() => setMainImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`Thumb ${idx}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="text-gray-800">
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  {selectedProduct.name}
                </h2>
                <p className="mb-4">{selectedProduct.desc}</p>

                <h3 className="text-green-800 font-semibold mb-2">Category:</h3>
                <p className="mb-4">{selectedProduct.category.name}</p>

                <h3 className="text-green-800 font-semibold mb-2">Weight:</h3>
                <p className="mb-4">{selectedProduct.weight}</p>

                <h3 className="text-green-800 font-semibold mb-2">
                  Highlights:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Cold-Pressed</li>
                  <li>Multipurpose Use</li>
                  <li>Handcrafted in Cambodia</li>
                  <li>Petroleum-Free / Paraben-Free</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ProductCard Component
function ProductCard({
  product,
  onReadMore,
}: {
  product: Product;
  onReadMore: () => void;
}) {
  const imageUrl = product.images[0] ?? "/images/placeholder.jpg";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div
        className="relative w-full h-60 rounded-md overflow-hidden cursor-pointer"
        onClick={onReadMore}
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.desc}</p>
      <p className="text-xs text-gray-400 mt-1">Weight: {product.weight}</p>
      <p className="text-xs text-gray-400 mt-1">
        Category: {product.category.name}
      </p>
      <button
        onClick={onReadMore}
        className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-4 py-2 rounded-3xl shadow-md transition duration-300 mt-3"
      >
        Read More
      </button>
    </div>
  );
}
