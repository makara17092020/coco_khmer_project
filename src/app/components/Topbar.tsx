"use client";

import { useEffect, useState } from "react";

export default function Topbar() {
  const [avatarUrl, setAvatarUrl] = useState<string>("/avatar.png");

  useEffect(() => {
    const storedUrl = localStorage.getItem("admin_avatar");
    if (storedUrl) {
      setAvatarUrl(storedUrl);
    }
  }, []);

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">John Doe</div>
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500"
        />
      </div>
    </header>
  );
}
