"use client"
import {
  AlignJustify,
  X,
  PlusCircle,
} from "lucide-react";
import React, { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";


import Image from "next/image";


export default function Navbar() {
  const { user } = useContext(AppContext);

  return (
    <nav className="fixed top-0 left-0 w-full px-6 py-3.5 flex justify-between items-center bg-white border-b border-slate-200 shadow-sm z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer group">
        <div className="w-9 h-9 bg-gradient-to-br overflow-hidden from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
          <Image src="/icon128.png" alt="logo" width={100} height={100}/>
        </div>
        <span className="text-[max(5px,20px)] font-semibold text-slate-900">
          ViseVerse
        </span>
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
          href="/"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Home
        </Link>
        <Link
          href="/pricing"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Pricing
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Login
        </Link>
        <Link
          href="/register"
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
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/pricing" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)}>
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
  const router = useRouter();

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleLogout = async () => {
    await fetch(SERVER_URL + "/logout", {
      credentials: "include",
      method: "POST",
    });
    setUser(null);
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will delete your account permanently.",
    );
    if (!confirmDelete) return;

    await fetch(SERVER_URL + "/deleteAccount", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    router.push("/register");
  };

  return (
    <div className="relative flex items-center">
      <div className="flex items-center mx-5 gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 shadow-sm">
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-sm font-bold">
          ⚡
        </div>
        <div className="flex leading-tight">
          <span className="text-sm font-semibold text-slate-900 flex gap-2">
            <a
              href="/pricing"
              title="4 words = 1 credit. Credits are used for AI features."
            >
              {user?.tokens ?? 0}
            </a>
            <a href="/pricing">
              <PlusCircle spacing={20} size={20} />
            </a>
          </span>
        </div>
      </div>

      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 bg-slate-200 hover:bg-slate-300 rounded-full flex text-bold items-center justify-center"
      >
        {user.name[0].toUpperCase() + user.surname[0].toUpperCase()}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 mt-2 w-64 bg-white rounded-xl shadow-lg border overflow-hidden">
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
