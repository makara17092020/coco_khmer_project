"use client";

import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ fullName: "", email: "", message: "" });
        setSuccess("✅ Message sent successfully!");
      } else {
        setSuccess("❌ Failed to send message.");
      }
    } catch (error) {
      setSuccess("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl overflow-hidden items-stretch">
        {/* Left Column - Contact Form */}
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>

          <form className="space-y-5 flex-1" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={form.fullName}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Write your message..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-500 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {success && (
            <p
              className={`mt-4 text-sm ${
                success.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {success}
            </p>
          )}
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
