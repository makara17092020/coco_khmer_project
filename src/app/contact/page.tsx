export default function ContactUs() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl overflow-hidden items-stretch">
        {/* Left Column - Contact Form */}
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <form className="space-y-5 flex-1">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                placeholder="Write your message..."
                rows={5}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="button"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Column - Contact Info */}
        <div className="bg-green-50 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <div className="space-y-4 flex-1">
            <div>
              <p className="font-semibold text-gray-700">📍 Location</p>
              <p className="text-gray-600">
                123 Main Street, Phnom Penh, Cambodia
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">📞 Phone</p>
              <p className="text-gray-600">+855 12 345 678</p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">🕒 Business Hours</p>
              <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
              <p className="text-gray-600">Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
