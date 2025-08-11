"use client";

import Image from "next/image";

export default function NagaBalmPromo() {
  const events = [
    {
      year: "2020",
      title: "The Pandemic Pause",
      text: "When COVID-19 hit, Cambodia's lockdowns forced Coco Khmer into survival mode. Production halted, the team dispersed, but a few faithful remained, keeping the idea alive.",
      image: "/images/2020.jpg",
    },
    {
      year: "2023",
      title: "The Rebirth",
      text: "In early 2023, Naga Balm was reborn—refreshed in brand, design, and quality. We relocated to a GMP and ISO certified cosmetics-grade facility.",
      image: "/images/2023.jpg",
    },
    {
      year: "2024",
      title: "Growing Strong",
      text: "Naga Balm now thrives across 250+ retail locations in Cambodia and offers 19 SKUs. From mosquito repellent and inhaler sticks to muscle rubs and modern liniments.",
      image: "/images/2024.jpg",
    },
    {
      year: "2020",
      title: "The Pandemic Pause",
      text: "When COVID-19 hit, Cambodia's lockdowns forced Coco Khmer into survival mode. Production halted, the team dispersed, but a few faithful remained, keeping the idea alive.",
      image: "/images/2020.jpg",
    },
    {
      year: "2020",
      title: "The Pandemic Pause",
      text: "When COVID-19 hit, Cambodia's lockdowns forced Coco Khmer into survival mode. Production halted, the team dispersed, but a few faithful remained, keeping the idea alive.",
      image: "/images/2020.jpg",
    },
    {
      year: "2020",
      title: "The Pandemic Pause",
      text: "When COVID-19 hit, Cambodia's lockdowns forced Coco Khmer into survival mode. Production halted, the team dispersed, but a few faithful remained, keeping the idea alive.",
      image: "/images/2020.jpg",
    },
  ];

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>

      <main className="font-[Alegreya]">
        {/* Hero Section */}
        <section className="relative w-full sm:h-[45rem] h-[20rem] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/image.JPG"
              alt="Coco Khmer Hero"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 -z-0"></div>

          {/* Text Content */}
          <div className="relative z-10 w-full max-w-2xl p-10 md:p-20 text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              CAMBODIA'S TOPICAL PAIN RELIEF.
            </h1>
            <p className="text-sm md:text-base text-white font-medium mb-4 leading-relaxed">
              Lovingly handcrafted at scale in Cambodia, Naga Balm is a line of
              all natural, effective, and safe pain relievers expertly formulated
              with International manufacturing standards to deliver a smooth,
              non-greasy, non-irritating sensation to you and your loved ones.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-10 py-4 rounded-xl shadow-md transition duration-300">
              Continue Our Story
            </button>
          </div>
        </section>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          {/* Left: Text Content */}
          <div className="flex items-center p-6 md:p-16 bg-slate-300 order-2 md:order-1">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-extrabold text-emerald-900 mb-6">
                OUR STORY
              </h1>
              <p className="text-lg mb-4">
                Naga Balm began in 2013, born by the observation that while the
                traditional Preng Kola ointment is widely used, there was no
                petroleum-free, natural alternative available.
              </p>
              <p className="text-lg">
                People deserved a choice—one that combined the wisdom of tradition with
                modern, cleaner ingredients.
              </p>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-64 md:h-auto order-1 md:order-2">
            <Image
              src="/images/DSCF1026.JPG"
              alt="Pouring candle"
              fill
              className="object-cover"
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-black/40 md:bg-transparent"></div>
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="bg-yellow-100 p-3 md:p-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-emerald-900 mb-4">
              OUR JOURNEY
            </h1>
            <p>
              Coco Khmer was founded in Phnom Penh as Cambodia's first commercial
              producer of virgin coconut oil. A triple bottom line social
              enterprise from the start, our mission was clear: create ethical
              employment, protect the planet, and build a future through natural,
              coconut-based wellness.
            </p>
          </div>

          {/* Events Timeline */}
          <div className="py-8">
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex gap-6 px-6 md:px-6 ">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 bg-white rounded-xl shadow-lg w-[250px] p-6"
                  >
                    <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                      {event.year}
                    </div>

                    {event.image && (
                      <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-orange-600 mb-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-700 text-sm leading-relaxed">{event.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
