"use client"
import React from "react";

export default function RegisterPageUi() {
  return (
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-600 to-purple-600 p-12 items-center justify-center relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg text-white">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-4">
            Start your journey with ViseVerse
          </h2>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          {[
            "🚀 Get started in under 60 seconds",
            "✨ Process unlimited documents",
            "🌍 Support for 100+ languages",
            "🔒 Enterprise-grade security",
            "💾 Export in multiple formats",
            "🎯 AI-powered accuracy",
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-indigo-100">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6">
          {[
            { number: "50K+", label: "Users" },
            { number: "10M+", label: "Documents" },
            { number: "150+", label: "Languages" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-indigo-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
