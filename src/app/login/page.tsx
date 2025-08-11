"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedAvatar = localStorage.getItem("admin_avatar");
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      let avatarUrl: string | null = avatar;

      // Upload image if no avatar yet and file selected
      if (!avatar && file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          setError(uploadData.error || "Upload failed");
          return;
        }

        avatarUrl = uploadData.result?.secure_url ?? null;
        if (avatarUrl) {
          localStorage.setItem("admin_avatar", avatarUrl);
          setAvatar(avatarUrl);
        }
      }

      // Call update profile API (assuming it returns a token)
      const updateRes = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, avatar: avatarUrl }),
      });

      const updateData = await updateRes.json();

      if (!updateRes.ok) {
        setError(updateData.error || "Profile update failed");
        return;
      }

      // ✅ Store token in localStorage
      const token = updateData.token; // make sure your backend returns it
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

          <form
            onSubmit={handleLogin}
            className="space-y-5"
            encType="multipart/form-data"
          >
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

            {!avatar && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 rounded-md bg-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

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
