"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      // Call login API (make sure your backend validates password and returns token)
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        setError(loginData.error || "Login failed");
        return;
      }

      // ✅ Store token in localStorage
      const token = loginData.token;
      if (token) {
        localStorage.setItem("access_token", token);
      }

      // Optional: store user email too
      localStorage.setItem("user_email", email);

      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 px-4">
      <div className="flex w-full max-w-5xl rounded-xl overflow-hidden shadow-xl bg-white/30 backdrop-blur-md ring-1 ring-white/40">
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-700">
          <img
            src="/images/loginn.jpg"
            alt="Login Illustration"
            className="w-full h-full drop-shadow-xl object-cover"
          />
        </div>

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
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white/70 backdrop-blur-md"
                placeholder="you@example.com"
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
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white/70 backdrop-blur-md"
                placeholder="••••••••"
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
