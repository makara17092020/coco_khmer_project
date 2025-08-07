import Image from "next/image";

export default function ProductPage() {
  return (
    <main className="font-sans">
      {/* Category Filter and Title */}
      <section className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-green-900 text-center mb-4">
            Products
          </h1>
          <p className="  text-green-700 text-center ">
            Clean skincare made easy for your day-to-day.
          </p>
        </div>
      </section>

      {/* Product List */}
      <section className="py-8 px-4 bg-white">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Product Card 1 */}
          <ProductCard
            image="/images/oil.jpg"
            title="Virgin Coconut Oil"
            desc="Virgin Coconut Oil (90mL, 250mL)..."
          />

          {/* Product Card 2 */}
          <ProductCard
            image="/images/Coconut.jpg"
            title="Body Scrub"
            desc="Exfoliating Coconut & Coffee Scrub (200g)..."
          />

          {/* Product Card 3 */}
          <ProductCard
            image="/images/Lipbalm.jpg"
            title="Balms"
            desc="Moisturizing Body Balm (15g / 60g)..."
          />

          <ProductCard
            image="/images/BodyBalm.jpg"
            title="Nurturing Baby Balm"
            desc="A gentle balm for babies..."
          />

          <ProductCard
            image="/images/Lip-Pac.jpg"
            title="Fruit Fusion Lip Balms"
            desc="100% natural lip balms inspired ..."
          />

          <ProductCard
            image="/images/PineApple.jpg"
            title="Vitalizing Hair & Face Balm"
            desc="A versatile balm to style, nourish, ..."
          />
        </div>
      </section>
    </main>
  );
}

function ProductCard({
  image,
  title,
  desc,
}: {
  image: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="relative w-full h-60">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-md absolute object-cover"
        />
      </div>
      <h3 className="mt-4 font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
      <button className="mt-3 px-4 py-2 bg-green-700 text-white text-sm rounded hover:bg-green-800">
        Read More
      </button>
    </div>
  );
}
