"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

const partners = [
  { name: "Shop Satu", logo: "/images/ShopSatu.webp" },
  { name: "Bonjour Mart", logo: "/images/Total-Bonjour.webp" },
  { name: "KabasConceptstore", logo: "/images/KabasConceptstore.webp" },
  { name: "Aosot Plus", logo: "/images/Aosot Plus.webp" },
  { name: "Super Duper", logo: "/images/SuperDuper.webp" },
  { name: "ForSomeoneILike", logo: "/images/ForSomeoneILike.webp" },
  { name: "21 Degree", logo: "/images/VillaMartialArt.webp" },
];

const AvailableAtSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }
      container.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="py-4 sm:py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Logo Container */}
          <div
            ref={containerRef}
            className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-hidden"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 relative group"
              >
                <div className="absolute inset-0 bg-white rounded-lg transform transition-transform group-hover:scale-105">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain aspect-square p-2 sm:p-3 lg:p-4"
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 128px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableAtSection;
