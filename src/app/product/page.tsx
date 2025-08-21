"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "../components/CategoryFilter"; // adjust path

interface Product {
  id: number;
  name: string;
  desc: string;
  weight: number | string | string[]; // maps from API `size`
  category: { id: number; name: string };
  images: string[];
  isTopSeller: boolean;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState("All Products");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (categoryFromQuery) {
      setActiveCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/product");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // Map size -> weight
        const productsWithWeight = data.products.map((p: any) => ({
          ...p,
          weight: p.size,
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

  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter((p) => p.category.name === activeCategory);

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="relative w-full sm:h-[560px] h-[400px] flex items-center justify-between bg-slate-300 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/1.jpg"
            alt="Coco Khmer Hero"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 ml-auto w-full max-w-xl p-8 md:p-20 text-white">
          <p className="text-sm md:text-base font-medium mb-2 uppercase tracking-wide">
            Welcome to CoCo Khmer Clean Skincare
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Love Being <br /> in Your Skin
          </h1>
          <div className="flex gap-3">
            <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-3xl font-semibold shadow-md transition duration-300">
              Find Our Products
            </button>
            <button className="bg-orange-200 hover:bg-orange-300 text-orange-600 px-6 py-3 rounded-3xl font-semibold shadow-md transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="pb-8 px-4 bg-white">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
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

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: Main Product Image */}
              <div>
                <div className="w-full max-w-sm mx-auto h-80 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
                  <Image
                    src={selectedProduct.images[0] || "/images/placeholder.jpg"}
                    alt={selectedProduct.name}
                    width={280}
                    height={280}
                    className="object-cover "
                    priority
                  />
                </div>

                <div className="flex gap-4 mt-4 ml-5">
                  {selectedProduct.images.slice(1, 4).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-16 h-16 rounded overflow-hidden shadow"
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

              {/* Right: Product Description */}
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

function ProductCard({
  product,
  onReadMore,
}: {
  product: Product;
  onReadMore: () => void;
}) {
  const imageUrl = product.images[0] || "/images/placeholder.jpg";
  const heightMap: Record<"small" | "medium" | "large", string> = {
    small: "h-40",
    medium: "h-60",
    large: "h-80",
  };

  const sizeClass: "small" | "medium" | "large" = "medium";
  const heightClass = heightMap[sizeClass];

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
      <p className="text-sm text-gray-500 mt-1">
        {product.desc.length > 90
          ? product.desc.substring(0, 90) + "..."
          : product.desc}
      </p>
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
