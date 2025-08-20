import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-md z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-white drop-shadow-md cursor-pointer">
        ViseVerse
      </div>

      {/* Links */}
      <div className="flex justify-between items-center space-x-6">
        <Link
          to="/"
          className="text-white/80 hover:text-white transition font-medium"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="text-white/80 hover:text-white transition font-medium"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition shadow-lg"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
