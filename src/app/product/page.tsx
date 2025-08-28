// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { Suspense } from "react";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import CategoryFilter from "../components/CategoryFilter";

// interface Product {
//   id: number;
//   name: string;
//   desc: string;
//   highLight: string[];
//   ingredient: string[];
//   weight: number | string | string[];
//   category: { id: number; name: string };
//   images: string[];
//   isTopSeller: boolean;
// }

// export default function ProductPage() {
//   const searchParams = useSearchParams();
//   const categoryFromQuery = searchParams?.get("category") ?? "";

//   const [activeCategory, setActiveCategory] = useState("All Products");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [mainImage, setMainImage] = useState<string>("");

//   // Update active category from query
//   useEffect(() => {
//     if (categoryFromQuery) {
//       setActiveCategory(categoryFromQuery);
//     }
//   }, [categoryFromQuery]);

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("/api/product");
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();

//         const productsWithWeight = data.products.map((p: any) => ({
//           ...p,
//           weight: p.size ?? "N/A",
//           images:
//             p.images && p.images.length
//               ? p.images
//               : ["/images/placeholder.jpg"],
//         }));

//         setProducts(productsWithWeight);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Update main image when modal opens
//   useEffect(() => {
//     if (selectedProduct) {
//       setMainImage(selectedProduct.images[0] ?? "/images/placeholder.jpg");
//     }
//   }, [selectedProduct]);

//   const filteredProducts =
//     activeCategory === "All Products"
//       ? products
//       : products.filter((p) => p.category.name === activeCategory);

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       {/* <main className="font-sans"> */}
//       {/* Hero Section */}
//       <section className="relative w-full h-screen flex items-center justify-start overflow-hidden">
//         <div className="absolute inset-0">
//           <Image
//             src="/images/hero-prodact.jpg"
//             alt="Coco Khmer Hero"
//             fill
//             className="object-cover object-center"
//             priority
//           />
//           <div className="absolute inset-0 bg-black/30"></div>
//         </div>

//         <div className="relative z-20 max-w-2xl p-8 md:p-20 text-white">
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
//             DISCOVER <br />
//             THE ESSENCE OF COCONUT WELLNESS
//           </h1>
//           <p className="text-sm md:text-base font-medium mb-2 uppercase tracking-wide">
//             Explore our thoughtfully crafted products, bringing natural care and
//             sustainable living into your everyday life.
//           </p>
//         </div>
//       </section>

//       {/* Products Section */}
//       <section id="products" className="pb-8 px-4 bg-white mt-10">
//         <CategoryFilter
//           activeCategory={activeCategory}
//           setActiveCategory={setActiveCategory}
//         />

//         {loading ? (
//           <p className="text-center text-gray-500">Loading products...</p>
//         ) : filteredProducts.length === 0 ? (
//           <p className="text-center text-gray-500">No products found.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto mt-6">
//             {filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onReadMore={() => setSelectedProduct(product)}
//               />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Modal */}
//       {selectedProduct && mainImage && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative mx-4 sm:mx-6 md:mx-8">
//             <button
//               className="absolute top-4 right-4 text-gray-600 hover:text-black"
//               onClick={() => setSelectedProduct(null)}
//             >
//               ✕
//             </button>

//             <div className="grid md:grid-cols-2 gap-10">
//               {/* Left */}
//               <div>
//                 <div className="w-full h-72 md:h-80 rounded-xl overflow-hidden shadow-lg bg-white relative">
//                   <Image
//                     src={mainImage}
//                     alt={selectedProduct.name}
//                     fill
//                     className="object-contain"
//                   />
//                 </div>

//                 <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
//                   {selectedProduct.images.map((img, idx) => (
//                     <div
//                       key={idx}
//                       className={`relative w-16 h-16 rounded overflow-hidden shadow cursor-pointer flex-shrink-0 border ${
//                         mainImage === img
//                           ? "border-green-600"
//                           : "border-transparent"
//                       }`}
//                       onClick={() => setMainImage(img)}
//                     >
//                       <Image
//                         src={img}
//                         alt={`Thumb ${idx}`}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Right */}
//               <div className="text-gray-800">
//                 <h2 className="text-2xl font-bold text-green-800 mb-4">
//                   {selectedProduct.name}
//                 </h2>
//                 <p className="mb-4">{selectedProduct.desc}</p>

//                 <h3 className="text-green-800 font-semibold mb-2">Weight:</h3>
//                 <p className="mb-4">{selectedProduct.weight}</p>

//                 <h3 className="text-green-800 font-semibold mb-2">
//                   Highlights:
//                 </h3>
//                 <ul className="list-disc list-inside space-y-1 mb-4">
//                   <li>Cold-Pressed</li>
//                   <li>Multipurpose Use</li>
//                   <li>Handcrafted in Cambodia</li>
//                   <li>Petroleum-Free / Paraben-Free</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* </main> */}
//     </Suspense>
//   );
// }

// // ProductCard Component
// function ProductCard({
//   product,
//   onReadMore,
// }: {
//   product: Product;
//   onReadMore: () => void;
// }) {
//   const imageUrl = product.images[0] ?? "/images/placeholder.jpg";

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
//       <div
//         className="relative w-full h-60 rounded-md overflow-hidden cursor-pointer"
//         onClick={onReadMore}
//       >
//         <Image
//           src={imageUrl}
//           alt={product.name}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <h3 className="mt-4 font-semibold text-gray-800">{product.name}</h3>
//       <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.desc}</p>
//       <p className="text-xs text-gray-400 mt-1">Weight: {product.weight}</p>
//       <p className="text-xs text-gray-400 mt-1">
//         Category: {product.category.name}
//       </p>
//       <button
//         onClick={onReadMore}
//         className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-4 py-2 rounded-3xl shadow-md transition duration-300 mt-3"
//       >
//         Read More
//       </button>
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "../components/CategoryFilter";
import { X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  desc: string;
  highLight: string[];
  ingredient: string[];
  weight: number | string | string[];
  category: { id: number; name: string };
  images: string[];
  isTopSeller: boolean;
}

function ProductContent() {
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams?.get("category") ?? "";
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    if (categoryFromQuery) {
      setActiveCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
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
      <section className="relative w-full sm:h-[35rem] h-[20rem] flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/heropro.jpg"
            alt="Coco Khmer Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-20 max-w-2xl p-8 md:p-20 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            DISCOVER <br />
            THE ESSENCE OF COCONUT WELLNESS
          </h1>
          <p className="text-sm md:text-base font-medium mb-2 uppercase tracking-wide">
            Explore our thoughtfully crafted products, bringing natural care and
            sustainable living into your everyday life.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="pb-8 px-4 bg-white mt-5">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
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
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative mx-4 sm:mx-6 md:mx-8">
            <button
              className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={14} />
            </button>

            <div className="grid md:grid-cols-2 gap-10 sm:mt-0 mt-5">
              {/* Left */}
              <div>
                <div className="w-80 sm:w-full h-72 md:h-80 rounded-xl overflow-hidden shadow-lg bg-white relative">
                  <Image
                    src={mainImage}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="grid grid-cols-5 gap-3 mt-4 overflow-x-auto pb-2">
                  {selectedProduct.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative w-16 h-16 rounded overflow-hidden shadow cursor-pointer flex-shrink-0 border ${
                        mainImage === img
                          ? "border-green-600"
                          : "border-transparent"
                      }`}
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

                <h3 className="text-green-800 font-semibold mb-2">Weight:</h3>
                <p className="mb-4">{selectedProduct.weight}</p>
                <h3 className="text-green-800 font-semibold mb-2">
                  Ingredients:
                </h3>
                <ul className="list-disc pl-5 mb-4">
                  {selectedProduct.ingredient?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-green-800 font-semibold mb-2">
                  Highlights:
                </h3>
                <ul className="list-disc pl-5">
                  {selectedProduct.highLight?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
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

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <ProductContent />
    </Suspense>
  );
}
const Spinner = () => (
  <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
);
