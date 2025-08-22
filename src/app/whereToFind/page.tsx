"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Motion variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// TypeScript interfaces
interface CategoryPartnership {
  id: number;
  name: string;
}

interface Partner {
  id: number;
  name: string;
  image: string;
  categoryPartnershipId: number;
  categoryPartnership: CategoryPartnership;
}

export default function WhereToFind() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/partnership/create"
        );
        const data: Partner[] = await response.json();

        setPartners(data); // ✅ set all directly
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="w-full">
      <section
        className="relative bg-cover bg-center py-24 px-6 text-center"
        style={{ backgroundImage: "url('/images/green.png')" }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            WHERE TO FIND US
          </motion.h1>
          <motion.p
            className="text-md md:text-2xl max-w-2xl mx-auto text-white drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            Discover where you can get our products
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-40 bg-gray-50">
        {loading ? (
          <div className="text-center text-xl font-semibold text-gray-700 py-20">
            Loading...
          </div>
        ) : (
          <>
            {partners.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-emerald-900 mb-6">
                  OUR PARTNERS
                </h2>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {partners.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex flex-col items-center"
                      variants={itemVariants}
                    >
                      <div
                        className="border border-emerald-900 rounded-lg p-4 flex items-center justify-center w-full
                          transition-transform transform hover:scale-105 hover:-rotate-1 hover:shadow-xl
                          hover:ring-2 hover:ring-emerald-800 hover:ring-opacity-50 duration-300 ease-in-out bg-white"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 object-contain"
                        />
                      </div>
                      <span className="mt-2 text-sm font-semibold text-gray-700 text-center">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}
