"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect to /admin/products if already logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.push("/admin/products");
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Store tokens and email
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("user_email", email);

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 px-4">
      <div className="flex w-full max-w-5xl rounded-xl overflow-hidden shadow-xl bg-white/30 backdrop-blur-md ring-1 ring-white/40">
        {/* Left side image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-700">
          <Image
            src="/images/loginn.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover drop-shadow-xl"
          />
        </div>

        {/* Login form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Sign in to your account
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
