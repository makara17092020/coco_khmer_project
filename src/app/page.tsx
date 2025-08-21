"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ScrollSection from "./components/scrollsection";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  desc: string;
  images: string[];
  isTopSeller: boolean;
  weight: string | string[] | number; // maps to your API size
  category: {
    id: number;
    name: string;
  };
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data = await res.json();

        if (data.products && Array.isArray(data.products)) {
          // Map API size -> weight on each product
          const productsWithWeight = data.products.map((p: any) => ({
            ...p,
            weight: p.size, // just add weight
          }));

          // Keep your top seller logic unchanged
          const topSellers = productsWithWeight.filter(
            (p: Product) => (p as any).isTopSeller === true
          );

          setProducts(topSellers); // your original code only shows top sellers
          setError("");
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <main className="font-[Alegreya]">
      <section className="relative w-full sm:h-140 h-100 flex items-center justify-between bg-slate-300 overflow-hidden">
        <div className="absolute sm:w-180 w-190 sm:h-170 h-150">
        <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/images/videoh herosetion.mp4"
        autoPlay
        loop
        muted
        playsInline
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
            <Link href="/product">
              <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300 cursor-pointer">
                Find Our Products
              </button>
            </Link>
            <Link href="/">
              <button className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300 cursor-pointer">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 text-center">
        <h2 className="sm:text-4xl text-3xl font-extrabold text-emerald-900">
          Available At
        </h2>
        <p className="mt-2 text-lg">
          Find Coco Khmer at these trusted retailers across Cambodia.
        </p>
        <ScrollSection />
        <Link href="/whereToFind">
          <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300 mt-6 cursor-pointer">
            Find Us At
          </button>
        </Link>
      </section>

      <section className="py-16 px-6 md:px-20 bg-gray-50 text-center relative">
        <h2 className="sm:text-4xl text-3xl font-extrabold text-emerald-900">
          Get to Know Our Products
        </h2>
        <p className="mt-2 text-lg text-gray-700">Our Best Seller</p>

        {loading && <p className="mt-6 text-gray-500">Loading products...</p>}
        {error && <p className="mt-6 text-red-500">{error}</p>}

        {!loading && !error && (
          <div
            className="p-10 overflow-x-auto overflow-y-hidden flex gap-6 snap-x snap-mandatory scrollbar-hide scroll-smooth px-10 cursor-grab active:cursor-grabbing"
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {products.map((product) => (
              <div key={product.id} className="snap-center shrink-0 text-start">
                <ProductCard
                  product={product}
                  onReadMore={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </div>
        )}

        <Link href="/product">
          <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-6 py-3 rounded-3xl shadow-md transition duration-300 mt-8 cursor-pointer">
            Learn More
          </button>
        </Link>

        {/* Modal for Product Details */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 relative">
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
                      src={
                        selectedProduct.images[0] || "/images/placeholder.jpg"
                      }
                      alt={selectedProduct.name}
                      width={280}
                      height={280}
                      className="object-contain"
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
                <div className=" text-start text-gray-800">
                  <h2 className="text-2xl font-bold text-green-800 mb-4">
                    {selectedProduct.name}
                  </h2>
                  <p className="mb-4">{selectedProduct.desc}</p>

                  <h3 className="text-green-800 font-semibold mb-2">
                    Category:
                  </h3>
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
      </section>

      <section className="px-6 md:px-40 bg-slate-300 py-10">
        <h2 className="sm:text-4xl text-3xl font-extrabold text-emerald-900 text-center">
          Discover the Perfect Touch — for You and Your Space
        </h2>

        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            <div className="relative w-full min-h-[500px]">
              <Image
                src="/images/bodycare.avif"
                alt="Face care"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex items-center">
              <div className="bg-[url('/images/green.png')] bg-left-top bg-[length:600px_600px] p-6 md:p-11">
                <div className="bg-white p-6 md:p-10 text-emerald-900 shadow-md">
                  <h3 className="text-2xl sm:text-3xl font-extrabold">
                    Skincare
                  </h3>
                  <p className="text-lg py-3 leading-relaxed">
                    At Coco Khmer, we believe that healthy, radiant skin begins
                    with nature. Our skincare line is thoughtfully crafted using
                    safe, effective, and natural ingredients that nourish,
                    protect, and restore your skin — without the worry of harsh
                    chemicals or toxins. Whether you’re caring for your face or
                    body, our products are designed to support your skin’s
                    natural beauty and leave you feeling confident in your own
                    glow.
                  </p>
                  <Link
                    href={{
                      pathname: "/product",
                      query: { category: "Skin Care" },
                      hash: "products",
                    }}
                    className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            <div className="flex items-center">
              <div className="w-full h-full bg-[url('/images/orange.png')] bg-[length:600px_600px] bg-left-top p-6 md:p-11">
                <div className="bg-orange-600 p-6 md:p-10 text-white shadow-md">
                  <h3 className="sm:text-3xl font-extrabold text-2xl">
                    Fragrance & Room Care
                  </h3>
                  <p className="text-lg py-3 leading-relaxed">
                    Bring harmony to your home and senses with our fragrance and
                    room care collection. Infused with pure essential oils and
                    plant-based ingredients, our sprays are designed to refresh
                    the air, uplift your mood, and create a calm, welcoming
                    atmosphere. Whether you need a relaxing moment or a burst of
                    freshness, our products offer a safe, natural way to enhance
                    any space.
                  </p>
                  <Link
                    href={{
                      pathname: "/product",
                      query: { category: "Fragrances" },
                      hash: "products",
                    }}
                    className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative w-full min-h-[500px]">
              <Image
                src="/images/facecare.avif"
                alt="Face care"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-emerald-900">
        <div className="w-full text-center mb-10">
          <h2 className="sm:text-4xl text-3xl font-extrabold text-white">
            Why Coco Khmer?
          </h2>
          <p className="text-lg py-5 leading-relaxed px-5 sm:px-70 text-white">
            At Coco Khmer, we do more than create natural products — we create
            impact. Sustainability, community empowerment, and care for people
            and planet are our core mission.
          </p>
          <Link href="/product">
            <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300 cursor-pointer">
              Learn more about our story
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center relative py-20">
          <div className="relative w-200 min-h-[400px]">
            <Image
              src="/images/end2.avif"
              alt="Side Left"
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute">
            <div className="relative w-100 min-h-[500px]">
              <Image
                src="/images/end.avif"
                alt="Side Left"
                fill
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-85">
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
      <p className="text-xs text-gray-400 mt-1">Weight: {product.weight}</p>
      <p className="text-xs text-gray-400 mt-1">
        Category: {product.category.name}
      </p>
      <button
        onClick={onReadMore}
        className="mt-3 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-800 transition"
      >
        Read More
      </button>
    </div>
  );
}
