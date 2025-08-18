"use client";

import Image from "next/image";
import { useState } from "react";

export default function NagaBalmPromo() {
  const ourTeamMembers = [
    { name: "Robert Esposito", role: "Founder and CEO", img: "/images/1.webp" },
    { name: "Sovisal Jerry Meach", role: "Director of Business Development", img: "/images/2.webp" },
    { name: "Moeun Putheamony", role: "HR & Finance Manager", img: "/images/3.webp" },
    { name: "Ses Sarom", role: "Sales Supervisor", img: "/images/4.webp" },
    { name: "Nou Virak", role: "Marketing and Communications Officer", img: "/images/5.webp" },
    { name: "Chhen Vannak", role: "Visual Creative Specialist", img: "/images/Vannak.JPG" },
  ];

  const facilityTeamMembers = [
    { name: "Korng Sreysor", role: "Facility Team", img: "/images/7.webp" },
    { name: "Sem Tola", role: "Facility Team", img: "/images/8.webp" },
    { name: "KimHouy Aok", role: "Facility Team", img: "/images/9.webp" },
    { name: "Vann Sreypich", role: "Facility Team", img: "/images/10.webp" },
    { name: "John Souphea", role: "Facility Team", img: "/images/John Souphea .jpg" },
    { name: "Phorn Sokin", role: "Facility Team", img: "/images/Sokim.png" },
    { name: "Thida Emmav", role: "Facility Team", img: "/images/ThidaEmmav.webp" },
    { name: "Kim Lin", role: "Facility Team", img: "/images/KimLin.webp" },
    { name: "Lun Bopha", role: "Facility Team", img: "/images/LunBopha.webp" },
    { name: "Sim Yem", role: "Facility Maintenance Technician", img: "/images/SimYem.webp" },
  ];

  const events = [
    {
      year: "2013",
      title: "Company founded.",
      text: "People deserved a choice—one that combined the wisdom of tradition with modern, cleaner ingredients.",
      image: "/images/1) The Beginning.jpg",
    },
    {
      year: "2014",
      title: "Birth of Naga Balm",
      text: "Just six months after opening our doors, Naga Balm was born. Inspired by Cambodia's traditional herbal medicine and powered by virgin coconut oil, our first balm was handcrafted to relieve pain naturally—free from petroleum and full of purpose.",
      image: "/images/2) The Birth.jpg",
    },
    {
      year: "2015",
      title: "From Phnom Penh to the World",
      text: "Thanks to word-of-mouth, travelers, and passionate supporters, Coco Khmer journeyed far beyond Cambodia. By 2019, it had reached hands and hearts across Singapore, Canada, the United States, Australia, Europe, and Greater Asia—earning a loyal following through its clean ingredients and powerful results.",
      image: "/images/3) Global Expansion.jpg",
    },
    {
      year: "2020",
      title: "The Pandemic Pause",
      text: "When COVID-19 hit, the global slowdown and Cambodia's lockdowns forced Coco Khmer into survival mode. Production halted. The team dispersed. For a time, it was the founder, a few faithful orders, and the enduring idea that this work still mattered.",
      image: "/images/COVID.JPG",
    },
    {
      year: "2023",
      title: "The Rebirth",
      text: "Out of crisis came clarity. In early 2023, Coco Khmer was reborn—refreshed in brand, reimagined in design, and re-anchored in quality. We relocated to a cosmetics-grade production facility fully aligned with GMP and ISO standards. A new era had begun.",
      image: "/images/4) The Rebirth (2).jpg",
    },
    {
      year: "BEYOND",
      title: "Growing Strong",
      text: "CoCo Khmer now proudly serves customers through 250+ retail locations across Cambodia, offering a diverse range of natural personal care products. What began with a single handmade coconut oil balm has grown into a complete wellness line.",
      image: "/images/5Strong.jpg",
    },
  ];

  const communityImages = [
    "/images/com1.jpg","/images/com2.jpg","/images/com3.jpg","/images/com4.jpg",
    "/images/com5.jpg","/images/com6.jpg","/images/com7.jpg","/images/com8.jpg",
    "/images/com9.jpg","/images/com10.jpg","/images/com11.jpg","/images/com12.jpg",
  ];

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <main className="font-[Alegreya]">

        {/* Hero Section */}
        <section className="relative w-full sm:h-[45rem] h-[20rem] flex items-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image src="/images/image.JPG" alt="Coco Khmer Hero" fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-black/40 -z-0"></div>
          <div className="relative z-10 w-full max-w-2xl p-10 md:p-20 text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">CAMBODIA'S TOPICAL PAIN RELIEF.</h1>
            <p className="text-sm md:text-base text-white font-medium mb-4 leading-relaxed">
              Lovingly handcrafted at scale in Cambodia, Naga Balm is a line of all natural, effective, and safe pain relievers expertly formulated with International manufacturing standards to deliver a smooth, non-greasy, non-irritating sensation to you and your loved ones.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-10 py-4 rounded-xl shadow-md transition duration-300">
              Continue Our Story
            </button>
          </div>
        </section>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-auto">
          <div className="flex items-center p-6 md:p-16 bg-slate-300">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-extrabold text-emerald-900 mb-6">OUR STORY</h1>
              <p className="text-lg mb-4">
                Founded as a social enterprise, CoCo Khmer empowers communities through ethical employment and creates clean, handcrafted coconut-based skincare rooted in tradition and care.
              </p>
            </div>
          </div>
          <div className="relative h-64 md:h-[500px]">
            <Image src="/images/DSCF1026.JPG" alt="Pouring candle" fill className="object-cover" quality={100} priority />
            <div className="absolute inset-0 bg-black/40 md:bg-transparent"></div>
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="bg-yellow-100 p-3 md:p-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-emerald-900 mb-4">OUR JOURNEY</h1>
            <p>
              Coco Khmer was founded in Phnom Penh as Cambodia's first commercial producer of virgin coconut oil. A triple bottom line social enterprise from the start, our mission was clear: create ethical employment, protect the planet, and build a future through natural, coconut-based wellness.
            </p>
          </div>
          <div className="py-8 overflow-x-auto hide-scrollbar">
            <div className="flex gap-6 px-6 md:px-6">
              {events.map((event, index) => (
                <div key={index} className="flex-shrink-0 bg-white rounded-xl shadow-lg w-[210px] p-4">
                  <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">{event.year}</div>
                  {event.image && (
                    <div className="relative w-full h-25 mb-4 rounded-lg overflow-hidden">
                      <Image src={event.image} alt={event.title} fill className="object-cover" />
                    </div>
                  )}
                  <h3 className="text-sm font-bold text-orange-600 mb-2 text-center">{event.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed text-center">{event.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Spirit Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-emerald-100">
          <div className="relative h-52 md:h-auto">
            <Image src="/images/CocoKhmer_Profile__Brandmark_White.png" alt="Pouring candle" fill className="object-cover" quality={100} priority />
          </div>
          <div className="flex items-center p-6 md:p-16 order-2 text-center md:text-left">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-6">THE SPIRIT</h1>
              <p className="text-base md:text-lg mb-4 leading-relaxed">
                Blending ancient wisdom and modern care, CoCo Khmer is about healing — through nature, community, and connection.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-8 bg-white flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4">
            <div className="bg-yellow-400 rounded-lg shadow-md p-4 text-center text-white flex flex-col justify-center items-center min-h-[280px] w-[280px]">
              <div className="mb-3 flex justify-center"><Image src="/images/logo.png" alt="Icon" width={28} height={28} /></div>
              <h2 className="text-lg font-bold mb-3">VISION</h2>
              <p className="text-sm leading-relaxed">Vision: Cambodia’s leading ethical wellness brand.</p>
            </div>
            <div className="bg-red-500 rounded-lg shadow-md p-4 text-center text-white flex flex-col justify-center items-center min-h-[280px] w-[280px]">
              <div className="mb-3 flex justify-center"><Image src="/images/logo.png" alt="Icon" width={28} height={28} /></div>
              <h2 className="text-lg font-bold mb-3">MISSION</h2>
              <p className="text-sm leading-relaxed">Mission: We create clean, effective coconut-based products that empower communities and promote ethical, sustainable beauty.</p>
            </div>
          </div>
        </div>

        {/* Teams Section */}
        <TeamsSection ourTeamMembers={ourTeamMembers} facilityTeamMembers={facilityTeamMembers} />

        {/* Community Section */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">COMMUNITY</h2>
            <p className="text-center text-gray-600 mb-8">
              Capturing moments of impact, connection, and celebration within <br /> the Naga Balm community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {communityImages.map((src, index) => (
                <div key={index} className="relative w-full h-48 rounded overflow-hidden shadow-md">
                  <Image src={src} alt={`Community image ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

type TeamMember = { name: string; role: string; img: string; };

type TeamsSectionProps = { ourTeamMembers: TeamMember[]; facilityTeamMembers: TeamMember[]; };

function TeamsSection({ ourTeamMembers, facilityTeamMembers }: TeamsSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Our Team", members: ourTeamMembers },
    { label: "Facility Team", members: facilityTeamMembers },
  ];

  return (
    <section className="w-full flex flex-col items-center py-16 bg-white">
      <h2 className="text-[#F9461C] text-4xl font-extrabold mb-2 text-center">TEAMS</h2>
      <p className="text-gray-700 text-lg mb-8 text-center max-w-2xl">
        Meet the dedicated hands behind every Naga Balm product - a community of skilled artisans and passionate professionals.
      </p>
      <div className="flex gap-4 mb-8">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-6 py-2 rounded-full font-bold border-2 transition-colors duration-200 ${
              activeTab === idx ? "bg-[#F9461C] text-white border-[#F9461C]" : "bg-white text-[#F9461C] border-[#F9461C]"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl px-4">
        {tabs[activeTab].members.map((member, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="rounded-xl overflow-hidden mb-4 h-[200px] w-[150px] shadow-md relative">
              <Image src={member.img} alt={member.name} width={100} height={100} className="object-cover object-center h-full w-full" />
            </div>
            <div className="text-[#F9461C] font-bold text-base text-center">{member.name}</div>
            <div className="text-gray-700 text-sm text-center">{member.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
