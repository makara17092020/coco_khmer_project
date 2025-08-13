"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ScrollSection from "./components/scrollsection";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  desc: string;
  images: string[];
  createdAt: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

        const data = await res.json();

        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products.slice(0, 3)); // Take first 3 products
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

  return (
    <main className="font-[Alegreya]">
      {/* HERO SECTION */}
      <section className="relative w-full sm:h-140 h-100 flex items-center justify-between bg-slate-300 overflow-hidden">
        <div className="absolute inset-0 sm:w-230 w-190 sm:h-140 h-100">
          <Image
            src="/images/home1.jpg"
            alt="Coco Khmer Hero"
            fill
            className="object-cover object-left"
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

      {/* AVAILABLE AT */}
      <section className="py-10 text-center">
        <h2 className="sm:text-4xl text-3xl font-extrabold text-emerald-900">
          Available At
        </h2>
        <p className="mt-2 text-lg">
          Find Coco Khmer at these trusted retailers across Cambodia.
        </p>
        <ScrollSection />
        <Link href="/where-to-find">
          <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300 mt-6 cursor-pointer">
            Find Us At
          </button>
        </Link>
      </section>

      {/* NEW PRODUCTS SECTION */}
      <section className="py-16 px-6 md:px-20 bg-gray-50 text-center">
        <h2 className="sm:text-4xl text-3xl font-extrabold text-emerald-900">
          Get to Know Our Products
        </h2>
        <p className="mt-2 text-lg text-gray-700">Our Best Seller</p>

        {loading && <p className="mt-6 text-gray-500">Loading products...</p>}
        {error && <p className="mt-6 text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "/images/default.jpg"
                    }
                    alt={product.name || "Product"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-bold text-emerald-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {product.desc
                      ? product.desc.slice(0, 100)
                      : "No description available."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link href="/product">
          <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-6 py-3 rounded-3xl shadow-md transition duration-300 mt-8 cursor-pointer">
            Learn More
          </button>
        </Link>
      </section>

      {/* DISCOVER SECTION */}
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
                  <Link href="/">
                    <button className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300">
                      Learn More
                    </button>
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
                  <Link href="/">
                    <button className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300">
                      Learn More
                    </button>
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

      {/* WHY COCO KHMER SECTION */}
      <section className="py-10 bg-emerald-900">
        <div className="w-full text-center mb-10">
          <h2 className="sm:text-4xl text-3xl font-extrabold text-white text-center">
            Why Coco Khmer?
          </h2>
          <p className="text-lg py-5 leading-relaxed px-5 sm:px-70 text-white">
            At Coco Khmer, we do more than create natural products — we create
            impact. Our mission is rooted in sustainability, community
            empowerment, and care for both people and the planet.
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
