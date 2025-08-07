"use client";

import Image from "next/image";

export default function CocoKhmerSection() {
  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Image */}
        <div className="flex justify-center">
          <Image
            src="/images/conetact.png"
            alt="conetact"
            width={200}
            height={200}
            className="rounded-lg object-cover w-00 h-100"
          />
        </div>

        {/* Right - Text */}
        <div>
          <h2 className="text-green-900 font-extrabold text-4xl md:text-5xl leading-tight mb-6">
            Love Being in Your Skin <br /> with Coco Khmer
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Coco Khmer, we believe that everyone deserves access to clean,
            effective, and affordable skincare. Our products are carefully
            crafted to help you feel beautiful in your skin. We are committed to
            using only safe and natural ingredients that nourish your skin and
            protect the environment. Let us help you love being in your skin.
          </p>
        </div>
      </div>
    </section>
  );
}
