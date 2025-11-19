import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#0a0a0f] text-white py-8">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
        {/* App Name */}
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          ViseVerse
        </h2>

        {/* Divider */}
        <div className="w-16 h-1 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>

        {/* Text */}
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} ViseVerse — Transforming text with AI.
        </p>

        {/* Developer */}
        <p className="text-gray-500 text-xs">
          Built with ❤️ by{" "}
          <a
            href="https://devsushant03.netlify.app"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Sushant Nachanekar
          </a>
        </p>
      </div>
    </footer>
  );
}
