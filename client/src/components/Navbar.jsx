import { AlignJustify, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth > 500) {
        setIsOpen(false); // close mobile menu on desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-md z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-white drop-shadow-md cursor-pointer">
        ViseVerse
      </div>

      {/* Desktop Links */}
      {width > 500 ? (
        <div className="flex justify-between items-center space-x-6">
          <Link
            to="/"
            className="text-white/80 hover:text-white transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/profilepage"
            className="text-white/80 hover:text-white transition font-medium"
          >
            Profile
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
      ) : (
        // Mobile Hamburger Button
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={28} /> : <AlignJustify size={28} />}
        </button>
      )}

      {/* Mobile Dropdown */}
      {isOpen && width <= 500 && (
        <div className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-xl flex flex-col items-center py-6 space-y-4 border-t border-white/20">
          <Link
            to="/"
            className="text-white/80 hover:text-white transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/profilepage"
            className="text-white/80 hover:text-white transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/login"
            className="text-white/80 hover:text-white transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition shadow-lg"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
