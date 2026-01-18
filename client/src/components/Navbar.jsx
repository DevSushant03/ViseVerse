import { AlignJustify, CircleUserRound, X, Sparkles } from "lucide-react";
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(AppContext); // Replace with your actual auth context

  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-3.5 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-semibold text-slate-900">ViseVerse</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
              Dashboard
            </button>
            <button className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition">
              <CircleUserRound className="w-5 h-5 text-slate-700" />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Home
            </Link>
            <Link
              to="#"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Pricing
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-sm"
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg transition"
      >
        {isOpen ? <X size={20} /> : <AlignJustify size={20} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg md:hidden">
          <div className="flex flex-col p-4 space-y-2">
            {isLoggedIn ? (
              <>
                <button
                  className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </button>
                <button
                  className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <CircleUserRound className="w-4 h-4" />
                  Profile
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </button>
                
                <button
                  className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </button>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full block text-center px-4 py-3 mt-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Demo wrapper to show navbar
function NavbarDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <div className="pt-24 px-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Redesigned Navbar
        </h1>
        <p className="text-slate-600">
          Clean, modern, and professional navigation
        </p>
      </div>
    </div>
  );
}
