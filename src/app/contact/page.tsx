"use client";

import Image from "next/image";

export default function CocoKhmerSection() {
  return (
    <section className="w-full font-[Alegreya] bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center">
        {/* Left - Image */}
        <div className="flex justify-center">
          <Image
            src="/images/conetact.png"
            alt="conetact"
            width={1000}
            height={200}
            className="rounded-lg object-cover w-85 h-150"
          />
        </div>

        {/* Right - Text */}
        <div className="-ms-20">
          <h1 className="text-green-900 font-extrabold text-4xl md:text-5xl leading-tight mb-6 ">
           OUR STORE
          </h1>
          <div className="flex gap-25">
          <div>
          <h2 className="text-green-900 font-extrabold text-2xl md:text-3xl leading-tight mb-4">Working Hours</h2>
          </div>
          <div>
          <h2 className="text-green-900 font-extrabold text-2xl md:text-3xl leading-tight mb-4">Location</h2>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
