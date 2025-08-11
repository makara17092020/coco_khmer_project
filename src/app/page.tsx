import Image from "next/image";
import ScrollSection from "./components/scrollsection";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="font-[Alegreya]">
      <section className="relative w-full sm:h-140 h-100 flex items-center justify-between bg-slate-300 overflow-hidden">
        <div className="absolute inset-0 sm:w-230 w-190 sm:h-140 h-100">
          <Image
            src="/images/home1.jpg"
            alt="Coco Khmer Hero"
            layout="fill"
            objectFit="cover"
            className="object-left"
            priority
          />
        </div>
        <div className="relative z-20 ml-auto w-full max-w-xl p-20">
          <p className="text-sm md:text-base sm:text-emerald-900 text-white font-medium mb-2 uppercase tracking-wide">
            Welcome to CoCo Khmer Clean Skincare
          </p>
          <h1 className="text-4xl md:text-7xl font-extrabold sm:text-emerald-900 text-white mb-6">
            Love Being <br /> in Your Skin
          </h1>
          <div className="flex gap-2">
            <Link href="/product">
              <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300">
                Find Our Products
              </button>
            </Link>
            <Link href="/">
              <button className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 text-center">
        <h2 className="sm:text-4xl text-3xl font-extrabold text-emerald-900">
          Available At
        </h2>
        <p className="mt-2 text-lg">
          Find Coco Khmer at these trusted retailers across Cambodia.
        </p>
        <ScrollSection />
        <Link
          href="/where-to-find"
          className="text-2xl font-extrabold text-orange-600 hover:text-orange-700 hover:underline"
        >
          <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300 mt-4">
            Find Us At
          </button>
        </Link>
      </section>

      <section className="px-6 md:px-40 bg-slate-300 py-10">
        <h2 className="sm:text-4xl text-3xl font-extrabold text-emerald-900 text-center">
          Discover the Perfect Touch — for You and Your Space
        </h2>

        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            <div className="relative w-full min-h-[500px]">
              <Image
                src="/images/bodycare.avif"
                alt="Face care"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex items-center">
              <div className="bg-[url('/images/green.png')] bg-left-top bg-[length:600px_600px] p-6 md:p-11">
                <div className="bg-white p-6 md:p-10 text-emerald-900 shadow-md">
                  <h3 className="text-2xl sm:text-3xl font-extrabold">
                    Skincare
                  </h3>
                  <p className="text-lg py-3 leading-relaxed">
                    At Coco Khmer, we believe that healthy, radiant skin begins
                    with nature. Our skincare line is thoughtfully crafted using
                    safe, effective, and natural ingredients that nourish,
                    protect, and restore your skin — without the worry of harsh
                    chemicals or toxins. Whether you’re caring for your face or
                    body, our products are designed to support your skin’s
                    natural beauty and leave you feeling confident in your own
                    glow.
                  </p>
                  <Link href="/">
                    <button className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            <div className="flex items-center">
              <div className="w-full h-full bg-[url('/images/orange.png')] bg-[length:600px_600px] bg-left-top p-6 md:p-11">
                <div className="bg-orange-600 p-6 md:p-10 text-white shadow-md">
                  <h3 className="sm:text-3xl font-extrabold text-2xl">
                    Fragrance & Room Care
                  </h3>
                  <p className="text-lg py-3 leading-relaxed">
                    Bring harmony to your home and senses with our fragrance and
                    room care collection. Infused with pure essential oils and
                    plant-based ingredients, our sprays are designed to refresh
                    the air, uplift your mood, and create a calm, welcoming
                    atmosphere. Whether you need a relaxing moment or a burst of
                    freshness, our products offer a safe, natural way to enhance
                    any space.
                  </p>
                  <Link href="/">
                    <button className="bg-orange-200 hover:bg-orange-300 text-orange-600 text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative w-full min-h-[500px]">
              <Image
                src="/images/facecare.avif"
                alt="Face care"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 bg-emerald-900">
        <div className="w-full text-center mb-10">
          <h2 className="sm:text-4xl text-3xl font-extrabold text-white text-center">
            Why Coco Khmer?
          </h2>
          <p className="text-lg py-5 leading-relaxed px-5 sm:px-70 text-white">
            At Coco Khmer, we do more than create natural products . we create
            impact. Our mission is rooted in sustainability, community
            empowerment, and care for both people and the planet. Every product
            is thoughtfully made with natural ingredients, ethical practices,
            and a commitment to supporting local livelihoods in Cambodia. When
            you choose Coco Khmer, you’re choosing more than skincare or room
            care — you’re choosing a brand that cares
          </p>
          <Link href="/">
            <button className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-3 rounded-3xl shadow-md transition duration-300">
              Learn more about our story
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center relative py-20">
          <div className="relative w-200 min-h-[400px]">
            <Image
              src="/images/end2.avif"
              alt="Side Left"
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute">
            <div className="relative w-100 min-h-[500px]">
              <Image
                src="/images/end.avif"
                alt="Side Left"
                fill
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
