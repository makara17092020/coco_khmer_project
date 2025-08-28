"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

type Partnership = {
  id: number;
  name: string;
  createdAt: string;
  image?: string;
  categoryPartnershipId?: number;
};

const AvailableAtSection = () => {
  const [loading, setLoading] = useState(false);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const translateRef = useRef(0);

  const fetchPartnerships = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/partnership/create");
      if (!res.ok) throw new Error("Failed to fetch partnerships");
      const data = await res.json();
      setPartnerships(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch partnerships:", error);
      setPartnerships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerships();
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;

    let animationFrameId: number;
    const speed = 0.5;

    const animate = () => {
      if (!trackRef.current) return;

      translateRef.current -= speed;

      const halfWidth = trackRef.current.scrollWidth / 2;
      if (Math.abs(translateRef.current) >= halfWidth) {
        translateRef.current = 0;
      }

      trackRef.current.style.transform = `translateX(${translateRef.current}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [partnerships]);
  const Spinner = () => (
    <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
  );

  const duplicated = [...partnerships, ...partnerships];

  return (
    <section className="py-4 sm:py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          {/* Spinner */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-white to-transparent z-10" />

              <div className="overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex gap-4 sm:gap-6 lg:gap-8 will-change-transform"
                >
                  {duplicated.map((partner, index) => (
                    <div
                      key={`${partner.name}-${index}`}
                      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 relative group"
                    >
                      <div className="absolute inset-0 bg-white rounded-lg transform transition-transform group-hover:scale-105">
                        {partner.image ? (
                          <Image
                            src={partner.image}
                            alt={partner.name}
                            fill
                            className="object-contain aspect-square p-2 sm:p-3 lg:p-4"
                            sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 128px"
                          />
                        ) : (
                          <span className="flex items-center justify-center h-full text-gray-400 text-xs">
                            No Image
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AvailableAtSection;
