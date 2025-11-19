import { AlignJustify, CircleUserRound, X } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center bg-black/10 backdrop-blur-xl border-b border-white/20 shadow-md z-50">
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-white drop-shadow-md cursor-pointer"
      >
        ViseVerse
      </div>
      <div className="hidden sm:flex items-center space-x-6">
        {isLoggedIn ? (
          <Link
            to="/profilepage"
            className="text-white/80 hover:text-white transition font-medium"
          >
            <CircleUserRound />
          </Link>
        ) : (
          <>
            {" "}
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
          </>
        )}
      </div>
      {/* Mobile Hamburger Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden text-white"
      >
        {isOpen ? <X size={28} /> : <AlignJustify size={28} />}
      </button>
      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#000b22f2] flex flex-col items-center py-6 space-y-4 border-t border-white/20 sm:hidden">
          {isLoggedIn ? (
            <>
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
            </>
          ) : (
            <>
              {" "}
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
            </>
          )}
        </div>
      )}
    </nav>
  );
}
