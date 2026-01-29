"use client";

import { ArrowLeft, Home, RefreshCw, AlertTriangle, Sparkles } from "lucide-react";

export default function Error({ error, reset }) {
  const errorCode = "500";
  const errorType = "Server Error";
  const message = error?.message || "Something went wrong. Please try again.";

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleRefresh = () => {
    reset(); // ✅ This is IMPORTANT (Next.js retry)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-semibold text-slate-900">ViseVerse</span>
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Error Icon & Code */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-12 text-center border-b border-slate-200">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
            </div>

            <div className="text-7xl font-bold text-red-600 mb-2">{errorCode}</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{errorType}</h1>
            <p className="text-slate-600 max-w-md mx-auto">
              {message}
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Suggestions */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">What you can try:</h2>
              <ul className="space-y-3">
                {[
                  "Check your internet connection",
                  "Refresh the page to try again",
                  "Go back to the previous page",
                  "Return to the homepage"
                ].map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    </div>
                    <span className="text-slate-600 text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoBack}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>

              <button
                onClick={handleRefresh}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>

              <button
                onClick={handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-200"
              >
                <Home className="w-5 h-5" />
                Home
              </button>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Still having trouble?{" "}
            <a href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
