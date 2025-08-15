"use client";

import React from "react";
import { motion } from "framer-motion";

const marts = [
  { name: "7-Eleven", logo: "/images/7eleven.png" },
  { name: "Bonjour", logo: "/images/bonjour.png" },
  { name: "SuperDuper", logo: "/images/superduper.png" },
  { name: "Circle K", logo: "/images/circlek.png" },
  { name: "21 Degree", logo: "/images/21degree.png" },
  { name: "Satu", logo: "/images/satu.png" },
  { name: "Phnom Penh Airport", logo: "/images/phnompenhairport.png" },
];

const pharmacies = [
  { name: "Point Santé", logo: "/images/pointsante.png" },
  { name: "Aoso", logo: "/images/aoso.png" },
  { name: "Chhat", logo: "/images/chhat.png" },
  { name: "CP", logo: "/images/cp.png" },
  { name: "Pharma Green", logo: "/images/pharmagreen.png" },
  { name: "Medilane", logo: "/images/medilane.png" },
  { name: "Another", logo: "/images/another.png" },
];

// Framer Motion variants for entrance
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhereToFind() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-24 px-6 text-center"
        style={{ backgroundImage: "url('/images/bgwheretofind.png')" }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>

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

      {/* Logo Grid Section */}
      <section className="py-20 px-6 md:px-40 bg-gray-50">
        {/* Marts */}
        <h2 className="text-2xl font-bold text-orange-600 mb-6">MARTS</h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {marts.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              variants={itemVariants}
            >
              <div
                className="border border-orange-500 rounded-lg p-4 flex items-center justify-center w-full
                transition-transform transform hover:scale-105 hover:-rotate-1 hover:shadow-xl
                hover:ring-2 hover:ring-orange-400 hover:ring-opacity-50 duration-300 ease-in-out bg-white"
              >
                <img
                  src={item.logo}
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

        {/* Pharmacies */}
        <h2 className="text-2xl font-bold text-orange-600 mb-6">PHARMACY</h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pharmacies.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              variants={itemVariants}
            >
              <div
                className="border border-orange-500 rounded-lg p-4 flex items-center justify-center w-full
                transition-transform transform hover:scale-105 hover:-rotate-1 hover:shadow-xl
                hover:ring-2 hover:ring-orange-400 hover:ring-opacity-50 duration-300 ease-in-out bg-white"
              >
                <img
                  src={item.logo}
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
      </section>
    </div>
  );
}
