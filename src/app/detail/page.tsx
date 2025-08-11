import Image from "next/image";

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-white p-4 md:p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left: Main Product Image */}
        <div>
          <div className="w-full max-w-sm mx-auto h-80 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
            <Image
              src="/images/Coconut.jpg"
              alt="Coconut Lip Balm"
              width={280}
              height={280}
              className="object-contain"
            />
          </div>

          <div className="flex gap-4 mt-4 ml-5">
            <div className="relative w-16 h-16 rounded overflow-hidden shadow">
              <Image
                src="/images/Lychee.jpg"
                alt="Placeholder 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-16 h-16 rounded overflow-hidden shadow">
              <Image
                src="/images/PineApple.jpg"
                alt="Placeholder 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-16 h-16 rounded overflow-hidden shadow">
              <Image
                src="/images/WaterMelon.jpg"
                alt="Placeholder 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Description */}
        <div className="text-gray-800">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Description:
          </h2>
          <p className="mb-4">
            Cold-pressed by hand in small batches from chemical-free coconuts,
            this oil is rich in essential fatty acids and antioxidants. Ideal
            for cooking, skincare, haircare, and massage.
          </p>

          <h3 className="text-green-800 font-semibold mb-2">
            Key Ingredients:
          </h3>
          <ul className="list-disc list-inside mb-4">
            <li>
              <span className="font-semibold">
                100% Virgin Cocos Nucifera (Coconut) Oil
              </span>
            </li>
          </ul>

          <h3 className="text-green-800 font-semibold mb-2">Highlights:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Cold-Pressed</li>
            <li>Multipurpose Use</li>
            <li>Handcrafted in Cambodia</li>
            <li>Petroleum-Free / Paraben-Free</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
