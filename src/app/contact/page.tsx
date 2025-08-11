"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className=" bg-[url('/images/cocolo.png')] h-52 w-full opacity-20"></div>
      <div className="w-full  py-15 text-center -mt-52">
        <h1 className="text-4xl font-bold text-green-900">Contact Us</h1>
        <p className="text-gray-600 mt-2">
          Fill in the form and we’ll get back to you soon.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl -mt-2 opacity-100">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block mb-1 font-medium">Full Name :</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-green-900 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email :</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-green-900 rounded-lg px-3 py-2"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block mb-1 font-medium">Message :</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full border border-green-900 rounded-lg px-3 py-2 h-28"
            ></textarea>
          </div>
          <div>
            <div>
              <label className="block mb-1 font-medium">Phone :</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-green-900 rounded-lg px-3 py-2"
              />
            </div>

            <div className="md:col-span-2 mt-7.5">
              <button
                type="submit"
                className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-800"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="text-center mt-8 pb-10">
        <h2 className="text-xl font-semibold text-green-900">Contact Number</h2>
        <p className="text-gray-600">For quick response, call or message.</p>
        <p className="text-orange-600 font-bold text-lg">Phone: 012 249 539</p>
      </div>
    </div>
  );
}
