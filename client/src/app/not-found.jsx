"use client"
import { ArrowLeft, Home, Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl overflow-hidden flex items-center justify-center">
            <img src="favicon.ico" className="w-full"/>
          </div>
          <span className="text-2xl font-semibold text-slate-900">
            ViseVerse
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-12">
            <div className="text-7xl font-bold text-indigo-600 mb-2">404</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Page Not Found
            </h1>
            <p className="text-slate-600 max-w-md mx-auto mb-8">
              The page you’re looking for doesn’t exist or has been moved.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-200"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500 mt-6">
          If you think this is a mistake,{" "}
          <Link
            href="/contact"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
