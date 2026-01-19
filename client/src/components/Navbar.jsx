import { AlignJustify, CircleUserRound, X, Sparkles } from "lucide-react";
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AppContext);

  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-3.5 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer group">
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-semibold text-slate-900">ViseVerse</span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user ? <ProfileMenu /> : <PublicMenu />}
      </div>
    </nav>
  );
}

/* ---------------- PUBLIC MENU ---------------- */

function PublicMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Home
        </Link>
        <Link
          to="/pricing"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Pricing
        </Link>
        <Link
          to="/login"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-9 h-9 flex items-center justify-center"
      >
        {isOpen ? <X /> : <AlignJustify />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border shadow-lg md:hidden">
          <div className="flex flex-col p-4 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- PROFILE MENU ---------------- */

function ProfileMenu() {
  const { user, setUser } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleLogout = async () => {
    await fetch(SERVER_URL + "/logout", { credentials: "include" });
    setUser(null);
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will delete your account permanently.",
    );
    if (!confirmDelete) return;

    await fetch(SERVER_URL + "/delete-account", {
      method: "DELETE",
      credentials: "include",
    });

    setUser(null);
    navigate("/register");
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center"
      >
        <CircleUserRound className="w-5 h-5 text-slate-700" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border overflow-hidden">
          {/* Profile Info */}
          <div className="p-4 border-b">
            <p className="font-semibold text-slate-800">
              {user.name} {user.surname}
            </p>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>

          {/* Actions */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm"
          >
            🚪 Logout
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600"
          >
            🗑️ Delete Account
          </button>
        </div>
      )}
    </div>
  );
}
