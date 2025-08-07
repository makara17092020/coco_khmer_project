"use client";

import Image from "next/image";

export default function CocoKhmerSection() {
  return (
    <section className="w-full bg-white py-16 font-[Alegreya] space-y-16">
      {/* Section 1: Love Being in Your Skin */}
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 bg-amber-50 p-6 rounded-lg shadow-sm">
        {/* Left - Image */}
        <div className="flex justify-center">
          <Image
            src="/images/ourstory.png"
            alt="Our Story"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full max-w-md"
          />
        </div>

        {/* Right - Text */}
        <div>
          <h2 className="text-green-900 font-extrabold text-4xl md:text-5xl leading-tight mb-4">
            Love Being in Your Skin with Coco Khmer
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

      {/* Section 2: Meet Coco Khmer */}
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 bg-orange-200 p-6 rounded-lg shadow-sm">
        {/* Left - Text */}
        <div>
          <h2 className="text-green-900 font-extrabold text-4xl md:text-5xl leading-tight mb-4">
            Meet Coco Khmer
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Coco Khmer, we are passionate about clean and effective skincare.
            Our mission is to provide access to safe, natural, and affordable
            skincare to everyone who loves being in their skin. Our team is
            dedicated to crafting high-quality products that are gentle on your
            skin and the environment. We believe in transparency and honesty, and we are committed to using only the best ingredients in our products.
          </p>
        </div>

        {/* Right - Image */}
        <div className="flex justify-center">
          <Image
            src="/images/image.png"
            alt="Coco Khmer Team"
            width={600}
            height={400}
            priority
            className="rounded-lg object-cover w-full max-w-md"
          />
        </div>
      </div>

      {/* Section 3: Full-width image */}
      <div className="max-w-6xl mx-auto px-4">
        <Image
          src="/images/kkakakakak.avif"
          alt="Pouring candle"
          width={1200}
          height={800}
          quality={100}
          priority
          className="rounded-lg shadow-md object-cover w-full"
        />
      </div>
    </section>
  );
}
