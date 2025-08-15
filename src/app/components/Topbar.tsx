"use client";

import { useEffect, useState, useRef } from "react";

export default function Topbar() {
  const [avatarUrl, setAvatarUrl] = useState<string>("/avatar.png");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUrl = localStorage.getItem("admin_avatar");
    if (storedUrl) {
      setAvatarUrl(storedUrl);
    }
  }, []);

  // Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  function handleLogout() {
    alert("Logged out!");
    setDropdownOpen(false);
  }

  return (
    <header className="w- bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800">Dashboard</div>
      <div
        ref={dropdownRef}
        className="relative flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setDropdownOpen((open) => !open)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <span>Admin</span>
          <svg
            className={`w-4 h-4 text-indigo-600 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
        />

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-32 w-40 bg-white border border-gray-200 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-20 animate-fadeIn">
            <button
              onClick={handleLogout}
              className="cursor-pointer w-full px-5 py-3 text-left text-gray-700 font-semibold hover:bg-indigo-600 hover:text-white rounded-xl transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease forwards;
        }
      `}</style>
    </header>
  );
}
