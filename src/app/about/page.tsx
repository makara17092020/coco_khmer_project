"use client";

import Image from "next/image";

export default function NagaBalmPromo() {
  return (
<main className="font-[Alegreya]">
   <section className="relative w-full sm:h-140 h-100 flex items-center justify-between bg-slate-500 overflow-hidden">
          <div className="absolute inset-0 sm:w-230 w-190 sm:h-140 h-100">
            <Image
              src="/images/hero.jpg"
              alt="Coco Khmer Hero"
              layout="fill"
              objectFit="cover"
              className="object-left "
              priority
            />
          </div>
          <div className="relative z-20 ml-auto w-full max-w-xl p-20">
             <h1 className="text-4xl md:text-4xl font-extrabold sm:text-emerald-900 text-white mb-6">
              CAMBODIA'S TOPICAL PAIN RELIEF.
            </h1>
            <p className="text-sm md:text-base sm:text-emerald-900 text-white font-medium mb-2">
             Lovingly handcrafted at scale in Cambodia, Naga Balm is a line of all natural, effective, and safe pain relievers expertly formulated with International manufacturing standards to deliver a smooth, non-greasy, non-irritating sensation to you and your loved ones.
            </p>
           
            <div className="flex gap-2">
              <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-10 py-4 rounded-xl shadow-md transition duration-300">
                continue our story
              </button>
             
            </div>
          </div>
        </section>
        <div className="flex mx-auto bg-slate-300 p-6">
            <div className="mt-50">
              <h1 className="text-4xl md:text-4xl font-extrabold sm:text-emerald-900 text-white mb-6">OUR STORY</h1>
              <p>Naga Balm began in 2013, born by the observation that while the traditional Preng Kola ointment is widely used, there was no petroleum-free, natural alternative available.</p> <br />
              <p>People deserved a choice—one that combined the wisdom of tradition with modern, cleaner ingredients.</p>
            </div>
            <div className="flex justify-center items-center w-full bg-amber-400">
          <Image
            src="/images/ourstory.png"
            alt="Pouring candle"
            width={500}       // កំណត់ទំហំច្បាស់
            height={500}
            quality={100}      // កំណត់ quality ជាខ្ពស់
            priority           // load image ដំបូង
            className="mx-auto"
          />
          </div>
          </div>
</main>
  );
}
