"use client";
import { useState } from "react";
import Image from "next/image";
import Modal from "src/app/components/Modal";

export default function ProductPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen bg-white-500 p-4 md:p-10">
      <div className="max-w-6xl mx-auto text-center">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          View Product
        </button>
      </div>

      {/* MODAL */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Main Product Image */}
          <div>
            <div className="w-full max-w-sm mx-auto h-80 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
              <Image
                src="/images/Coconut.jpg"
                alt="Coconut Lip Balm"
                width={280}
                height={280}
                className="object-contain"
              />
            </div>

            <div className="flex gap-4 mt-4 ml-5">
              {["Lychee", "PineApple", "WaterMelon"].map((flavor, i) => (
                <div
                  key={i}
                  className="relative w-16 h-16 rounded overflow-hidden shadow"
                >
                  <Image
                    src={`/images/${flavor}.jpg`}
                    alt={`Thumbnail ${i}`}
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
              Description:
            </h2>
            <p className="mb-4">
              Cold-pressed by hand in small batches from chemical-free coconuts,
              this oil is rich in essential fatty acids and antioxidants. Ideal
              for cooking, skincare, haircare, and massage.
            </p>

            <h3 className="text-green-800 font-semibold mb-2">
              Key Ingredients:
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li>
                <span className="font-semibold">
                  100% Virgin Cocos Nucifera (Coconut) Oil
                </span>
              </li>
            </ul>

            <h3 className="text-green-800 font-semibold mb-2">Highlights:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Cold-Pressed</li>
              <li>Multipurpose Use</li>
              <li>Handcrafted in Cambodia</li>
              <li>Petroleum-Free / Paraben-Free</li>
            </ul>
          </div>
        </div>
      </Modal>
    </main>
  );
}
